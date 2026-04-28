"""
Service for fetching paid bill history from Xero's Invoice API.

In production, this would call:
    GET /Invoices?where=Type=="ACCPAY"&Statuses=PAID

For the PoC, this returns mock data from mocks/paid_invoices.json.
The service transforms the raw Xero API response into an LLM-friendly
supplier history summary.
"""

from __future__ import annotations

import json
import logging
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)


def _load_mock_paid_invoices() -> dict[str, Any]:
    """Load mock paid invoices from the mocks directory.
    
    In production this would be:
        GET /Invoices?where=Type=="ACCPAY"&Statuses=PAID
    """
    mock_path = Path(__file__).parent / "mocks" / "paid_invoices.json"
    with open(mock_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _parse_date(date_str: str | None) -> datetime | None:
    """Parse an ISO date string, handling optional timezone."""
    if not date_str:
        return None
    return datetime.fromisoformat(date_str.replace("Z", "+00:00"))


def _build_supplier_history(invoices: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Aggregate paid invoices into per-supplier history profiles.
    
    Groups invoices by Contact.Name, then computes deterministic facts:
    - total bills paid, total/average amount
    - date range and payment timing
    - individual payment records (chronological)
    
    Pattern interpretation (frequency, anomalies, trends) is left to the LLM.
    """
    by_supplier: dict[str, list[dict[str, Any]]] = defaultdict(list)
    
    for inv in invoices:
        supplier_name = inv.get("Contact", {}).get("Name", "Unknown")
        by_supplier[supplier_name].append(inv)
    
    summaries: list[dict[str, Any]] = []
    
    for supplier_name, bills in by_supplier.items():
        amounts = [b["Total"] for b in bills]
        
        # Parse dates for timeline and payment timing
        paid_dates = []
        days_before_due = []
        for b in bills:
            paid_on = _parse_date(b.get("FullyPaidOnDate"))
            due = _parse_date(b.get("DueDate"))
            
            if paid_on:
                paid_dates.append(paid_on)
            if paid_on and due:
                days_before_due.append((due - paid_on).days)
        
        paid_dates.sort()
        
        summary = {
            "supplier_name": supplier_name,
            "contact_id": bills[0].get("Contact", {}).get("ContactID"),
            "total_bills_paid": len(bills),
            "total_amount_paid": round(sum(amounts), 2),
            "average_amount": round(sum(amounts) / len(amounts), 2),
            "currency": bills[0].get("CurrencyCode", "USD"),
            "first_bill_date": paid_dates[0].strftime("%Y-%m-%d") if paid_dates else None,
            "last_bill_date": paid_dates[-1].strftime("%Y-%m-%d") if paid_dates else None,
            "avg_days_paid_before_due": round(sum(days_before_due) / len(days_before_due), 1) if days_before_due else None,
            "payment_history": [
                {
                    "invoice_number": b.get("InvoiceNumber"),
                    "reference": b.get("Reference"),
                    "amount": b["Total"],
                    "due_date": b.get("DueDate", "")[:10],
                    "paid_date": b.get("FullyPaidOnDate", "")[:10],
                }
                for b in sorted(bills, key=lambda x: x.get("Date", ""))
            ],
        }
        summaries.append(summary)
    
    # Sort by total bills paid (most frequent suppliers first)
    summaries.sort(key=lambda s: s["total_bills_paid"], reverse=True)
    return summaries


def fetch_paid_bill_history() -> list[dict[str, Any]]:
    """Fetch and transform paid bill history into LLM-friendly supplier summaries.
    
    Returns a list of supplier history profiles, each containing:
    - supplier_name, contact_id
    - total_bills_paid, total_amount_paid, average_amount
    - frequency (monthly/quarterly/irregular)
    - date range and payment timing patterns
    - individual payment records
    
    In production, this would call:
        GET /Invoices?where=Type=="ACCPAY"&Statuses=PAID
    """
    logger.info("Fetching paid bill history...")
    data = _load_mock_paid_invoices()
    invoices = data.get("Invoices", [])
    logger.info("Loaded %d paid invoices from mock data", len(invoices))
    
    summaries = _build_supplier_history(invoices)
    logger.info("Built history for %d suppliers", len(summaries))
    
    return summaries


def build_history_context(supplier_summaries: list[dict[str, Any]]) -> str:
    """Format supplier history summaries into a readable context block for the LLM.
    
    This produces a concise, structured text block the agent injects into the
    system context alongside bills and cash position.
    """
    if not supplier_summaries:
        return "\nPaid Bill History: No historical payment data available."
    
    lines = [
        "\nPaid Bill History (from Xero invoices where Status=PAID):",
        "Use this history to identify recurring suppliers, typical amounts,",
        "payment patterns, and anomalies in the current bills.\n",
    ]
    
    for s in supplier_summaries:
        lines.append(f"Supplier: {s['supplier_name']}")
        lines.append(f"  Bills paid: {s['total_bills_paid']}")
        lines.append(f"  Total paid: {s['currency']} {s['total_amount_paid']:,.2f}")
        lines.append(f"  Avg per bill: {s['currency']} {s['average_amount']:,.2f}")
        if s.get("first_bill_date") and s.get("last_bill_date"):
            lines.append(f"  History: {s['first_bill_date']} → {s['last_bill_date']}")
        if s.get("avg_days_paid_before_due") is not None:
            lines.append(f"  Avg paid: {s['avg_days_paid_before_due']} days before due date")
        # Include payment dates so the LLM can determine frequency/patterns
        history = s.get("payment_history", [])
        if history:
            dates_str = ", ".join(f"{h['paid_date']} (${h['amount']:,.0f})" for h in history)
            lines.append(f"  Payments: {dates_str}")
        lines.append("")
    
    return "\n".join(lines)

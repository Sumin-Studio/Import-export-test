/**
 * Sidebar copy for the Actions (AI) tile — keyed by {@link TaxAiActionRow} id.
 */

export type TaxActionDueVariant = "soon" | "week";

export type TaxActionPanelClient = {
  name: string;
  dueTag: string;
  dueVariant: TaxActionDueVariant;
  category: string;
  insights: string[];
};

/** One line in a duplicate / mismatch pair (Books-style decision UI). */
export type TaxActionDecisionCompetingRow = {
  id: string;
  title: string;
  subtitle: string;
};

/** A single “approve or dismiss” work unit with two competing rows. */
export type TaxActionDecisionUnit = {
  id: string;
  rows: [TaxActionDecisionCompetingRow, TaxActionDecisionCompetingRow];
};

/** Collapsible section of decision units (mirrors Books / JAX pattern). */
export type TaxActionDecisionGroup = {
  id: string;
  title: string;
  count: number;
  intro: string;
  units: TaxActionDecisionUnit[];
};

export type TaxActionQueueRow = {
  id: string;
  date: string;
  contact: string;
  description: string;
  amount: string;
  contactHref?: string;
  /** Grey placeholder row (skeleton). */
  placeholder?: boolean;
};

export type TaxActionQueueActionVariant =
  | "dismiss"
  | "secondary"
  | "jax_primary";

export type TaxActionQueueAction = {
  id: string;
  label: string;
  variant: TaxActionQueueActionVariant;
};

export type TaxActionQueueCard = {
  id: string;
  title: string;
  count: number;
  rows: TaxActionQueueRow[];
  actions: TaxActionQueueAction[];
};

export type TaxActionQueueBundle = {
  bundleTitle: string;
  bundleTotalCount: number;
  cards: TaxActionQueueCard[];
};

export type TaxActionPanelDetail = {
  groupTitle: string;
  clients: TaxActionPanelClient[];
  /**
   * When present, the Actions sidebar renders decision-point UI for this alert.
   * Omitted from {@link mergeTaxActionPanels} aggregate merges.
   */
  decisionGroups?: TaxActionDecisionGroup[];
  /**
   * Agentic GST-style queue: stacked cards with tables + Dismiss / secondary / JAX actions.
   * Omitted from {@link mergeTaxActionPanels} aggregate merges.
   */
  actionQueueBundle?: TaxActionQueueBundle;
};

function c(
  name: string,
  dueTag: string,
  dueVariant: TaxActionDueVariant,
  category: string,
  insights: string[]
): TaxActionPanelClient {
  return { name, dueTag, dueVariant, category, insights };
}

function decisionPair(
  unitId: string,
  a: { title: string; subtitle: string },
  b: { title: string; subtitle: string }
): TaxActionDecisionUnit {
  return {
    id: unitId,
    rows: [
      { id: `${unitId}-a`, title: a.title, subtitle: a.subtitle },
      { id: `${unitId}-b`, title: b.title, subtitle: b.subtitle },
    ],
  };
}

export const DEFAULT_TAX_ACTION_PANEL: TaxActionPanelDetail = {
  groupTitle: "Review action",
  clients: [
    c(
      "Sample client",
      "When you can",
      "week",
      "Practice",
      [
        "Open this action from the list to see firm-specific follow-ups here.",
        "Connect live data in a production build to replace this prototype copy.",
      ]
    ),
  ],
};

function qRow(
  id: string,
  date: string,
  contact: string,
  desc: string,
  amt: string,
  placeholder?: boolean
): TaxActionQueueRow {
  return {
    id,
    date,
    contact,
    description: desc,
    amount: amt,
    placeholder,
  };
}

function queueActions(
  secondaryLabel: string,
  jaxLabel: string
): TaxActionQueueAction[] {
  return [
    { id: "dismiss", label: "Dismiss", variant: "dismiss" },
    { id: "secondary", label: secondaryLabel, variant: "secondary" },
    { id: "jax", label: jaxLabel, variant: "jax_primary" },
  ];
}

type RegionPrefix = "nz" | "au" | "uk" | "us" | "row";
type QueueCat = "tax" | "payroll" | "insights" | "bookkeeping";

/** Agentic-only GST-style queue panels: 5 regions × 4 categories. */
function buildActionQueuePanelEntries(): Record<string, TaxActionPanelDetail> {
  const regions: RegionPrefix[] = ["nz", "au", "uk", "us", "row"];
  const cats: QueueCat[] = ["tax", "payroll", "insights", "bookkeeping"];
  const out: Record<string, TaxActionPanelDetail> = {};

  for (const p of regions) {
    for (const cat of cats) {
      const key = `${p}-${cat}-action-queue`;
      if (cat === "tax") {
        const c1 =
          p === "nz"
            ? "Winona Woo"
            : p === "au"
              ? "Davids farms"
              : p === "uk"
                ? "Harris Retail Co"
                : p === "us"
                  ? "Summit Retail Inc"
                  : "LATAM Retail SA";
        const c2 =
          p === "nz"
            ? "Funk Group"
            : p === "au"
              ? "Northside Cafe Ltd"
              : p === "uk"
                ? "BuildRight Ltd"
                : p === "us"
                  ? "Acme Partners LLP"
                  : "Manufacturing AG";
        const bundleTitle =
          p === "nz"
            ? "GST anomalies"
            : p === "au"
              ? "BAS anomalies"
              : p === "uk"
                ? "VAT anomalies"
                : p === "us"
                  ? "Sales tax anomalies"
                  : "Indirect tax anomalies";
        const sec1 =
          p === "nz"
            ? "Change tax rate"
            : p === "au"
              ? "Change GST code"
              : p === "uk"
                ? "Change VAT rate"
                : p === "us"
                  ? "Change tax jurisdiction"
                  : "Change WHT code";
        const jax1 =
          p === "nz"
            ? "Review with JAX"
            : p === "au"
              ? "Review with JAX"
              : p === "uk"
                ? "Review with JAX"
                : p === "us"
                  ? "Review with JAX"
                  : "Review with JAX";
        const desc1 =
          p === "nz"
            ? "Dinner at Woo"
            : p === "au"
              ? "Landscaping"
              : p === "uk"
                ? "EU acquisition reverse charge"
                : p === "us"
                  ? "Marketplace sale — WA"
                  : "Import VAT accrual";
        const amt1 =
          p === "nz"
            ? "$158.00"
            : p === "au"
              ? "$2,000.00"
              : p === "uk"
                ? "£1,240.00"
                : p === "us"
                  ? "$1,240.00"
                  : "€1,180.00";
        out[key] = {
          groupTitle: bundleTitle,
          clients: [],
          actionQueueBundle: {
            bundleTitle,
            bundleTotalCount: 7,
            cards: [
              {
                id: `${key}-c1`,
                title:
                  p === "nz"
                    ? "Tax claimed on a potentially non-claimable expense"
                    : p === "au"
                      ? "GST on possibly private use"
                      : p === "uk"
                        ? "VAT on disallowed entertainment"
                        : p === "us"
                          ? "Taxable amount on mixed-use sale"
                          : "Non-recoverable VAT on recharge",
                count: 2,
                rows: [
                  qRow(`${key}-r1`, "1 Apr", c1, desc1, amt1),
                  qRow(`${key}-r1p`, "", "", "", "", true),
                ],
                actions: queueActions(sec1, jax1),
              },
              {
                id: `${key}-c2`,
                title:
                  p === "nz"
                    ? "Default tax rate not used"
                    : p === "au"
                      ? "Default GST code not applied"
                      : p === "uk"
                        ? "Default VAT rate not applied"
                        : p === "us"
                          ? "Default sales tax rate not applied"
                          : "Default indirect tax profile not used",
                count: 4,
                rows: [
                  qRow(`${key}-r2`, "1 Apr", c2, desc1, amt1),
                  qRow(`${key}-r2p`, "", "", "", "", true),
                  qRow(`${key}-r2p2`, "", "", "", "", true),
                ],
                actions: [
                  { id: "d2", label: "Dismiss", variant: "dismiss" },
                  {
                    id: "s2",
                    label:
                      p === "us"
                        ? "Apply default rate to all"
                        : "Apply default rate to all",
                    variant: "secondary",
                  },
                  {
                    id: "j2",
                    label: "Apply default rate with JAX",
                    variant: "jax_primary",
                  },
                ],
              },
              {
                id: `${key}-c3`,
                title:
                  p === "nz"
                    ? "Unreconciled transactions"
                    : p === "au"
                      ? "Unreconciled BAS lines"
                      : p === "uk"
                        ? "Unreconciled VAT control lines"
                        : p === "us"
                          ? "Unreconciled sales tax lines"
                          : "Unreconciled clearing lines",
                count: 1,
                rows: [qRow(`${key}-r3p`, "", "", "", "", true)],
                actions: [
                  { id: "d3", label: "Dismiss", variant: "dismiss" },
                  { id: "s3", label: "Mark reviewed", variant: "secondary" },
                  {
                    id: "j3",
                    label: "Reconcile with JAX",
                    variant: "jax_primary",
                  },
                ],
              },
            ],
          },
        };
      } else if (cat === "payroll") {
        const bundleTitle =
          p === "nz"
            ? "PAYE exceptions"
            : p === "au"
              ? "STP exceptions"
              : p === "uk"
                ? "PAYE / FPS exceptions"
                : p === "us"
                  ? "Payroll tax exceptions"
                  : "Global payroll exceptions";
        out[key] = {
          groupTitle: bundleTitle,
          clients: [],
          actionQueueBundle: {
            bundleTitle,
            bundleTotalCount: 6,
            cards: [
              {
                id: `${key}-p1`,
                title: "Negative YTD tax totals",
                count: 2,
                rows: [
                  qRow(
                    `${key}-pr1`,
                    "5 Apr",
                    "Greener Gardening",
                    "Termination reversal",
                    "$0.00"
                  ),
                  qRow(`${key}-pr1p`, "", "", "", "", true),
                ],
                actions: queueActions(
                  "Adjust tax code",
                  "Fix with JAX"
                ),
              },
              {
                id: `${key}-p2`,
                title: "Missing employee tax codes",
                count: 3,
                rows: [
                  qRow(
                    `${key}-pr2`,
                    "4 Apr",
                    "Davidson Electrics",
                    "New starter — default code",
                    "—"
                  ),
                  qRow(`${key}-pr2p`, "", "", "", "", true),
                ],
                actions: queueActions(
                  "Assign code manually",
                  "Apply codes with JAX"
                ),
              },
              {
                id: `${key}-p3`,
                title: "Duplicate pay run lines",
                count: 1,
                rows: [qRow(`${key}-pr3p`, "", "", "", "", true)],
                actions: queueActions(
                  "Dismiss duplicate",
                  "Merge with JAX"
                ),
              },
            ],
          },
        };
      } else if (cat === "insights") {
        const bundleTitle =
          p === "nz"
            ? "Advisory flags"
            : p === "au"
              ? "Cashflow flags"
              : p === "uk"
                ? "Margin flags"
                : p === "us"
                  ? "Estimate tax flags"
                  : "Group liquidity flags";
        out[key] = {
          groupTitle: bundleTitle,
          clients: [],
          actionQueueBundle: {
            bundleTitle,
            bundleTotalCount: 5,
            cards: [
              {
                id: `${key}-i1`,
                title: "Threshold watch — revenue spike",
                count: 2,
                rows: [
                  qRow(
                    `${key}-ir1`,
                    "3 Apr",
                    "Summit Holdings",
                    "QoQ revenue +32%",
                    "—"
                  ),
                  qRow(`${key}-ir1p`, "", "", "", "", true),
                ],
                actions: queueActions(
                  "Add note only",
                  "Model scenarios with JAX"
                ),
              },
              {
                id: `${key}-i2`,
                title: "Working capital vs tax timing",
                count: 2,
                rows: [
                  qRow(
                    `${key}-ir2`,
                    "2 Apr",
                    "Kauri Holdings Ltd",
                    "Payment due vs cash",
                    "—"
                  ),
                  qRow(`${key}-ir2p`, "", "", "", "", true),
                ],
                actions: queueActions(
                  "Dismiss for quarter",
                  "Refresh forecast with JAX"
                ),
              },
              {
                id: `${key}-i3`,
                title: "Anomaly cluster (low confidence)",
                count: 1,
                rows: [qRow(`${key}-ir3p`, "", "", "", "", true)],
                actions: queueActions(
                  "Archive insight",
                  "Deep dive with JAX"
                ),
              },
            ],
          },
        };
      } else {
        const bundleTitle =
          p === "nz"
            ? "Reconciliation queues"
            : p === "au"
              ? "Bank feed queues"
              : p === "uk"
                ? "VAT control queues"
                : p === "us"
                  ? "1099 prep queues"
                  : "Close checklist queues";
        out[key] = {
          groupTitle: bundleTitle,
          clients: [],
          actionQueueBundle: {
            bundleTitle,
            bundleTotalCount: 8,
            cards: [
              {
                id: `${key}-b1`,
                title: "Bank lines without rules",
                count: 3,
                rows: [
                  qRow(
                    `${key}-br1`,
                    "6 Apr",
                    "Walsh – Conroy",
                    "Card payment — no rule",
                    "$84.20"
                  ),
                  qRow(`${key}-br1p`, "", "", "", "", true),
                ],
                actions: queueActions(
                  "Create rule manually",
                  "Suggest rules with JAX"
                ),
              },
              {
                id: `${key}-b2`,
                title: "Suspense account build-up",
                count: 4,
                rows: [
                  qRow(
                    `${key}-br2`,
                    "5 Apr",
                    "Funk Group",
                    "Office supplies batch",
                    "$312.00"
                  ),
                  qRow(`${key}-br2p`, "", "", "", "", true),
                ],
                actions: queueActions(
                  "Reclass manually",
                  "Clear suspense with JAX"
                ),
              },
              {
                id: `${key}-b3`,
                title: "Period lock conflicts",
                count: 1,
                rows: [qRow(`${key}-br3p`, "", "", "", "", true)],
                actions: queueActions(
                  "Open period",
                  "Resolve locks with JAX"
                ),
              },
            ],
          },
        };
      }
    }
  }
  return out;
}

export const TAX_ACTION_PANELS: Record<string, TaxActionPanelDetail> = {
  // ——— NZ tax (FY26 mocks aligned) ———
  "nz-returns-errors": {
    groupTitle: "Filing errors",
    clients: [
      c(
        "Kauri Holdings Ltd",
        "Due today",
        "soon",
        "Income tax — IR4 FY26",
        [
          "IR4 validation failed: shareholders’ funds don’t match balance sheet.",
          "Schedule of residential property disposals missing for Q3.",
        ]
      ),
      c(
        "Southern Meats Ltd",
        "Due next week",
        "week",
        "Income tax — IR4 FY26",
        [
          "Imputation credit account out of balance after year-end journal.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-ir4-shf",
        title: "Shareholders’ funds tie-out (1)",
        count: 1,
        intro:
          "JAX matched the IR4 validation error to two balances. Approve to drop the orphan reclass and keep the SOFP roll-forward.",
        units: [
          decisionPair(
            "nz-err-shf",
            {
              title: "GL shareholders’ funds",
              subtitle: "Schedule · $1,842,000",
            },
            {
              title: "IR4 working (SOFP)",
              subtitle: "Calculated field · $1,839,400",
            }
          ),
        ],
      },
    ],
  },
  "nz-notices-different": {
    groupTitle: "Notices that are different",
    clients: [
      c(
        "Walsh – Conroy",
        "Due by Friday",
        "soon",
        "Tax statement — FY26",
        [
          "IRD notice total differs from Xero assessment by $1,240 — review pooling transfer.",
        ]
      ),
      c(
        "Harriet Mayert",
        "Due next week",
        "week",
        "Tax statement — FY26",
        [
          "Provisional tax notice line doesn’t match schedule of payments in file.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-notice-mismatch",
        title: "Notice vs assessment (2)",
        count: 2,
        intro:
          "JAX flagged different totals between IRD notices and Xero. It will be applied on approval — pick which figure to keep for each client.",
        units: [
          decisionPair(
            "nz-nd-walsh",
            {
              title: "IRD notice total",
              subtitle: "Pool transfer line · $12,450",
            },
            {
              title: "Xero assessment",
              subtitle: "Same line · $11,210",
            }
          ),
          decisionPair(
            "nz-nd-harriet",
            {
              title: "IRD provisional tax notice",
              subtitle: "Schedule line 4 · $8,200",
            },
            {
              title: "Payments in file",
              subtitle: "Schedule line 4 · $8,440",
            }
          ),
        ],
      },
    ],
  },
  "nz-disputed": {
    groupTitle: "Disputed statements",
    clients: [
      c(
        "Borer – Smitham",
        "Due today",
        "soon",
        "Tax statement dispute",
        [
          "Client disputes interest calculation on late payment — attach correspondence.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-dispute-interest",
        title: "Late payment interest (1)",
        count: 1,
        intro:
          "JAX recalculated interest from actual payment dates. Approve to align the notice to the lower Xero figure, or switch keep/remove if IRD’s amount should stand.",
        units: [
          decisionPair(
            "nz-dis-int",
            {
              title: "IRD notice interest",
              subtitle: "Posted 12 Jan · $1,240",
            },
            {
              title: "Xero recalculated interest",
              subtitle: "Payment-date rule · $980",
            }
          ),
        ],
      },
    ],
  },
  "nz-transfers-different": {
    groupTitle: "Transfers that are different",
    clients: [
      c(
        "Funk Group",
        "Due next week",
        "week",
        "Tax pooling",
        [
          "Transfer to tax pool shows different amount in IRD vs ledger after 31 March.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-transfer-pool",
        title: "Tax pooling transfers (1)",
        count: 1,
        intro:
          "JAX identified a transfer amount mismatch and suggested keeping the ledger posting. Approve to clear the IRD-side duplicate, or switch rows first.",
        units: [
          decisionPair(
            "nz-td-funk",
            {
              title: "IRD tax pool transfer",
              subtitle: "Posted 31 Mar · $5,000",
            },
            {
              title: "Ledger transfer",
              subtitle: "General ledger · $4,820",
            }
          ),
        ],
      },
    ],
  },
  // ——— NZ payroll ———
  "nz-paye-due": {
    groupTitle: "PAYE and deductions",
    clients: [
      c(
        "Erin Predovic Ltd",
        "Due 20th",
        "soon",
        "PAYE — monthly scheduler",
        [
          "Payment aligns with payday filing for 31 Jan — confirm bank batch reference.",
        ]
      ),
      c(
        "Graham and Sons",
        "Due 20th",
        "soon",
        "PAYE",
        [
          "Student loan extra deduction flagged vs IRD employer schedule.",
        ]
      ),
    ],
  },
  "nz-kiwisaver": {
    groupTitle: "KiwiSaver employer contributions",
    clients: [
      c(
        "Davidson Electrics",
        "Before next filing",
        "week",
        "KiwiSaver — ESCT",
        [
          "Employer contribution 3% doesn’t match payroll run for two employees in Jan.",
        ]
      ),
    ],
  },
  "nz-payday": {
    groupTitle: "Payday filing overdue",
    clients: [
      c(
        "Northside Cafe Ltd",
        "4 days overdue",
        "soon",
        "Payday filing",
        [
          "January pay run filed in payroll but payday filing not submitted to IRD.",
          "Penalty risk — submit filing and note reason in client file.",
        ]
      ),
    ],
  },
  // ——— NZ insights ———
  "nz-prov": {
    groupTitle: "Provisional tax",
    clients: [
      c(
        "Summit Holdings",
        "P3 due soon",
        "week",
        "Provisional tax FY26",
        [
          "Standard uplift may underpay given Q2 GST trend — model using actuals.",
        ]
      ),
      c(
        "Greener Gardening",
        "P3 FY26",
        "week",
        "Provisional tax",
        [
          "Residual income tax up 18% vs prior year — consider voluntary payment.",
        ]
      ),
    ],
  },
  "nz-gst-freq": {
    groupTitle: "GST filing frequency",
    clients: [
      c(
        "Roberts, Langworth…",
        "Review this month",
        "week",
        "GST registration",
        [
          "Turnover crossed 2-year test — IRD may expect six-monthly to monthly change.",
        ]
      ),
    ],
  },
  "nz-residential": {
    groupTitle: "Residential land withholding (RLWT)",
    clients: [
      c(
        "Hector Hamill",
        "Settlement 14 Feb",
        "week",
        "RLWT — property",
        [
          "Offshore vendor — confirm 10% RLWT on settlement statement vs sale agreement.",
        ]
      ),
    ],
  },
  // ——— NZ bookkeeping ———
  "nz-bank-rules": {
    groupTitle: "Bank feed rules",
    clients: [
      c(
        "Brendan Zulauf",
        "Low priority",
        "week",
        "Bank rules",
        [
          "32 uncoded lines on business account — 6 high-confidence rules suggested.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-dup-spend",
        title: "Duplicated transactions (3)",
        count: 3,
        intro:
          "JAX identified these duplicated transactions. They will be cleaned up automatically after your approval.",
        units: [
          decisionPair(
            "nz-br-1",
            {
              title: "Starbucks Queen St",
              subtitle: "18 Dec 2025 · −$42.00",
            },
            {
              title: "Starbucks Queen St (uncoded)",
              subtitle: "18 Dec 2025 · −$42.00",
            }
          ),
          decisionPair(
            "nz-br-2",
            {
              title: "IKEA Westgate",
              subtitle: "12 Dec 2025 · −$188.50",
            },
            {
              title: "IKEA Westgate (bank import)",
              subtitle: "12 Dec 2025 · −$188.50",
            }
          ),
          decisionPair(
            "nz-br-3",
            {
              title: "Aramex NZ",
              subtitle: "09 Dec 2025 · −$64.20",
            },
            {
              title: "Aramex NZ (rule match)",
              subtitle: "09 Dec 2025 · −$64.20",
            }
          ),
        ],
      },
    ],
  },
  "nz-old-unreconciled": {
    groupTitle: "Old unreconciled bank lines",
    clients: [
      c(
        "Walsh – Conroy",
        "Oldest 238 days",
        "soon",
        "Bank reconciliation",
        [
          "86 unreconciled items — focus on transfers between business and trust.",
        ]
      ),
    ],
  },
  "nz-missing-docs": {
    groupTitle: "GST — missing documents",
    clients: [
      c(
        "Funk Group",
        "Before filing",
        "week",
        "GST return",
        [
          "5 periods have GST filed without linked bills for major expenses.",
        ]
      ),
    ],
  },

  // ——— AU ———
  "au-bas": {
    groupTitle: "Activity statement variances",
    clients: [
      c(
        "Northside Cafe Ltd",
        "BAS due soon",
        "soon",
        "GST / PAYG",
        [
          "GST on sales vs BAS differs by $2.1k — check cash vs accrual mapping.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "au-bas-variance",
        title: "GST / PAYG variances (1)",
        count: 1,
        intro:
          "JAX compared the BAS draft to the ledger. Resolve which side to align before lodgement.",
        units: [
          decisionPair(
            "au-bas-1",
            {
              title: "BAS — GST on sales",
              subtitle: "Box 1A · $14,200",
            },
            {
              title: "Xero GST control",
              subtitle: "Balance · $12,100",
            }
          ),
        ],
      },
    ],
  },
  "au-tfn": {
    groupTitle: "TFN reporting",
    clients: [
      c(
        "Davidson Electrics",
        "Due next week",
        "week",
        "Payroll — TFN declaration",
        [
          "3 new starters without TFN on file before first pay event.",
        ]
      ),
    ],
  },
  "au-super": {
    groupTitle: "Super guarantee reconciliation",
    clients: [
      c(
        "Summit Holdings",
        "Quarter check",
        "week",
        "Super guarantee",
        [
          "Ordinary time earnings vs super accrual mismatch for 2 pay runs.",
        ]
      ),
    ],
  },
  "au-stp": {
    groupTitle: "Single Touch Payroll",
    clients: [
      c(
        "Greener Gardening",
        "EOFY",
        "week",
        "STP finalisation",
        [
          "Finalisation event not marked for 4 employees with fringe benefits.",
        ]
      ),
    ],
  },
  "au-sgc-risk": {
    groupTitle: "Super guarantee charge",
    clients: [
      c(
        "Southern Meats Ltd",
        "Due soon",
        "soon",
        "SGC exposure",
        [
          "Quarterly super paid after due date — calculate SGC and payment plan.",
        ]
      ),
    ],
  },
  "au-cash": {
    groupTitle: "Cash flow signals",
    clients: [
      c(
        "Kauri Holdings Ltd",
        "Monitor",
        "week",
        "Advisory",
        [
          "BAS payment due exceeds 45-day average bank balance trend.",
        ]
      ),
    ],
  },
  "au-tfn-pending": {
    groupTitle: "TFN follow-ups",
    clients: [
      c(
        "Borer – Smitham",
        "This payroll",
        "week",
        "STP / TFN",
        [
          "6 employees still marked “TFN pending” after 28 days.",
        ]
      ),
    ],
  },
  "au-bas-draft": {
    groupTitle: "BAS drafts",
    clients: [
      c(
        "Harriet Mayert",
        "Prior quarter",
        "soon",
        "BAS",
        [
          "Draft BAS lodged in Xero but not submitted to ATO for Sep quarter.",
        ]
      ),
    ],
  },
  "au-bank-rec": {
    groupTitle: "Bank reconciliation",
    clients: [
      c(
        "Erin Predovic",
        "Backlog",
        "week",
        "Reconciliation",
        [
          "50+ unreconciled lines on main operating account since November.",
        ]
      ),
    ],
  },

  // ——— UK ———
  "uk-nics": {
    groupTitle: "NICs and payroll",
    clients: [
      c(
        "Summit UK Ltd",
        "April payroll",
        "week",
        "Payroll",
        [
          "2026 category letter changes — review employee NIC letters before first run.",
        ]
      ),
    ],
  },
  "uk-ni": {
    groupTitle: "NICs and payroll",
    clients: [
      c(
        "Summit UK Ltd",
        "April payroll",
        "week",
        "Payroll",
        [
          "2026 category letter changes — review employee NIC letters before first run.",
        ]
      ),
    ],
  },
  "uk-ct": {
    groupTitle: "Corporation tax",
    clients: [
      c(
        "Harbour Trading Co",
        "CT600 window",
        "soon",
        "CT600",
        [
          "Payment due date in 21 days — confirm augmented profits for instalments.",
        ]
      ),
    ],
  },
  "uk-mtd": {
    groupTitle: "MTD for ITSA readiness",
    clients: [
      c(
        "Priya Nair Consulting",
        "Compliance",
        "week",
        "MTD ITSA",
        [
          "Quarterly digital updates not yet authorised with HMRC agent credentials.",
        ]
      ),
    ],
  },
  "uk-pension": {
    groupTitle: "Workplace pension",
    clients: [
      c(
        "Northside Cafe UK",
        "Staging",
        "week",
        "Auto-enrolment",
        [
          "Re-enrolment assessment due — 3 eligible jobholders not in scheme.",
        ]
      ),
    ],
  },
  "uk-mtd-nudge": {
    groupTitle: "MTD nudges",
    clients: [
      c(
        "Emma Taylor Ltd",
        "This quarter",
        "week",
        "MTD ITSA",
        [
          "Digital record gaps flagged for property income vs bank feed.",
        ]
      ),
    ],
  },
  "uk-ct-instalment": {
    groupTitle: "Corporation tax payments",
    clients: [
      c(
        "Thames Manufacturing Ltd",
        "Payment window",
        "soon",
        "CT instalments",
        [
          "Q3 instalment differs from computed augmented profits after R&D claim.",
        ]
      ),
    ],
  },
  "uk-vat-anom": {
    groupTitle: "VAT anomalies",
    clients: [
      c(
        "Harris Retail Co",
        "Return review",
        "soon",
        "VAT return",
        [
          "Box 1 vs sales control account drift — check EC acquisitions.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "uk-vat-box1",
        title: "VAT Box 1 drift (1)",
        count: 1,
        intro:
          "JAX compared the VAT return draft to the sales control account. Choose which treatment to carry forward.",
        units: [
          decisionPair(
            "uk-vat-1",
            {
              title: "VAT return Box 1",
              subtitle: "Output tax · £48,200",
            },
            {
              title: "Sales control account",
              subtitle: "GL balance · £47,850",
            }
          ),
        ],
      },
    ],
  },
  "uk-cis": {
    groupTitle: "CIS",
    clients: [
      c(
        "BuildRight Ltd",
        "Month end",
        "week",
        "CIS statements",
        [
          "5 statements not matched to purchase invoices in Xero.",
        ]
      ),
    ],
  },

  // ——— USA ———
  "us-ext": {
    groupTitle: "Extension filings",
    clients: [
      c(
        "Acme Partners LLP",
        "Return due soon",
        "soon",
        "1065 / 1120-S",
        [
          "Extended due date in 12 days — K-1 drafts not issued to partners.",
        ]
      ),
    ],
  },
  "us-1099": {
    groupTitle: "1099-NEC",
    clients: [
      c(
        "Vendor clearing",
        "Before filing",
        "week",
        "1099-NEC",
        [
          "9 vendors over $600 without W-9 on file — match to AP ledger.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "us-1099-dup",
        title: "Vendor NEC amount (1)",
        count: 1,
        intro:
          "JAX found duplicate AP bills for the same contractor payment. Approve to keep the cleared check line and remove the duplicate bill accrual before 1099-NEC filing.",
        units: [
          decisionPair(
            "us-1099-1",
            {
              title: "AP bill — Apex Services LLC",
              subtitle: "Duplicate · $6,200",
            },
            {
              title: "Check + 1099 feed — Apex Services LLC",
              subtitle: "Cleared · $6,200",
            }
          ),
        ],
      },
    ],
  },
  "us-est": {
    groupTitle: "Estimated tax",
    clients: [
      c(
        "Coastal S-Corp",
        "Q1 estimate",
        "soon",
        "1040-ES",
        [
          "Safe harbour at risk — YTD withholding 12% below prior-year liability.",
        ]
      ),
    ],
  },
  "us-941": {
    groupTitle: "Form 941 deposits",
    clients: [
      c(
        "Retail Holdings Inc",
        "Next deposit",
        "week",
        "Federal payroll tax",
        [
          "January liability crosses monthly depositor threshold — confirm schedule.",
        ]
      ),
    ],
  },
  "us-w2": {
    groupTitle: "W-2 / W-3",
    clients: [
      c(
        "PeopleFirst LLC",
        "January deadline",
        "soon",
        "Year-end payroll",
        [
          "7 employers — verify box 12 codes for RSU settlements before transmit.",
        ]
      ),
    ],
  },
  "us-insights-est": {
    groupTitle: "Estimated tax shortfall",
    clients: [
      c(
        "Lakeside LLC",
        "Planning",
        "week",
        "1040-ES",
        [
          "Q4 voucher may be insufficient after one-off dividend in December.",
        ]
      ),
    ],
  },
  "us-insights-ext": {
    groupTitle: "Post-extension returns",
    clients: [
      c(
        "Metro Services Group",
        "Calendar",
        "week",
        "Flow-through",
        [
          "6 extended entities — partner packages not started for 2 largest.",
        ]
      ),
    ],
  },
  "us-nec-recon": {
    groupTitle: "1099-NEC reconciliation",
    clients: [
      c(
        "AP Central",
        "Before Jan 31",
        "soon",
        "1099-NEC",
        [
          "Vendor TIN mismatch letters returned — update before e-file.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "us-nec-vendors",
        title: "Vendor profile clashes (2)",
        count: 2,
        intro:
          "JAX found two AP profiles that may be the same vendor. Pick which record to keep for 1099-NEC filing.",
        units: [
          decisionPair(
            "us-nec-1",
            {
              title: "Office Supplies Inc",
              subtitle: "AP $640 · TIN ending 4821",
            },
            {
              title: "Office Supply Co",
              subtitle: "AP $612 · TIN pending",
            }
          ),
          decisionPair(
            "us-nec-2",
            {
              title: "Contractor · A. Lee",
              subtitle: "NEC $2,400 · W-9 on file",
            },
            {
              title: "Contractor · Alex Lee",
              subtitle: "NEC line · duplicate profile",
            }
          ),
        ],
      },
    ],
  },
  "us-cc": {
    groupTitle: "Bank feeds",
    clients: [
      c(
        "Shop Local Co",
        "Reconnect",
        "week",
        "Bank connection",
        [
          "3 Amex feeds expired — transactions stalled since 4 Jan.",
        ]
      ),
    ],
  },

  // ——— REST_OF_WORLD ———
  "row-vat": {
    groupTitle: "Indirect tax filings",
    clients: [
      c(
        "EU Trading BV",
        "Multi-country",
        "week",
        "VAT",
        [
          "OSS return for Q4 — 2 jurisdictions missing intra-EU B2B lines.",
        ]
      ),
    ],
  },
  "row-fx": {
    groupTitle: "FX and transfer pricing",
    clients: [
      c(
        "Global Parts Group",
        "Year-end",
        "week",
        "TP memo",
        [
          "Intercompany loan FX reval doesn’t match group policy rate table.",
        ]
      ),
    ],
  },
  "row-payroll": {
    groupTitle: "Payroll cut-offs",
    clients: [
      c(
        "APAC Hub Pte Ltd",
        "This week",
        "soon",
        "Multi-country payroll",
        [
          "Singapore and AU pay dates overlap — confirm funding batch order.",
        ]
      ),
    ],
  },
  "row-benefits": {
    groupTitle: "Benefits reporting",
    clients: [
      c(
        "UK–US Holdings",
        "Statutory",
        "week",
        "P11D / local",
        [
          "Cross-border equity awards — local gross-up not posted in payroll.",
        ]
      ),
    ],
  },
  "row-transfer": {
    groupTitle: "Transfer pricing",
    clients: [
      c(
        "Manufacturing AG",
        "Year-end",
        "week",
        "Documentation",
        [
          "CNY benchmarking set expires — refresh comps for TNMM test.",
        ]
      ),
    ],
  },
  "row-indirect-clash": {
    groupTitle: "Indirect tax calendar",
    clients: [
      c(
        "LATAM Retail SA",
        "30 days",
        "soon",
        "VAT / IVA",
        [
          "Brazil and Mexico filing dates within same week — shared SSC capacity.",
        ]
      ),
    ],
  },
  "row-fx-reval": {
    groupTitle: "FX revaluation",
    clients: [
      c(
        "Finance Co Ltd",
        "Month close",
        "week",
        "Consolidation",
        [
          "USD–EUR closing rate differs between entity and group treasury feed.",
        ]
      ),
    ],
  },
  "row-interco": {
    groupTitle: "Intercompany",
    clients: [
      c(
        "HoldCo / OpCo pair",
        "Elimination",
        "week",
        "IC matching",
        [
          "Loan interest accrual posted one side only — €40k mismatch.",
        ]
      ),
    ],
  },

  // ——— Agentic Actions — extra tax queues (see taxAlertsAiTileContent) ———
  "nz-rwt-certs": {
    groupTitle: "RWT certificates",
    clients: [
      c(
        "Kauri Holdings Ltd",
        "Before 31 March",
        "soon",
        "Residential withholding",
        [
          "4 certificates expiring on properties with new tenants.",
          "RWT rate change not yet applied to two recurring rent invoices.",
        ]
      ),
      c(
        "Southern Meats Ltd",
        "This month",
        "week",
        "RWT",
        [
          "Certificate on file for branch office but not linked to Xero payees.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-rwt-dup",
        title: "Duplicate rent lines (2)",
        count: 2,
        intro:
          "JAX found two tenant rent payments coded twice after a certificate renewal. Approve to remove the greyed import and keep the reconciled bank line.",
        units: [
          decisionPair(
            "nz-rwt-1",
            {
              title: "Rent — 22 Hobson Ave (import)",
              subtitle: "18 Dec 2025 · −$2,400",
            },
            {
              title: "Rent — 22 Hobson Ave (bank feed)",
              subtitle: "18 Dec 2025 · −$2,400",
            }
          ),
          decisionPair(
            "nz-rwt-2",
            {
              title: "RWT withheld (rule)",
              subtitle: "10% on $4,200 · −$420",
            },
            {
              title: "RWT withheld (manual)",
              subtitle: "Duplicate tag · −$420",
            }
          ),
        ],
      },
    ],
  },
  "nz-gst-adj": {
    groupTitle: "GST adjustments",
    clients: [
      c(
        "Walsh – Conroy",
        "Partner review",
        "week",
        "GST return",
        [
          "Deferred GST on imports vs customs entries — 3 periods to true up.",
          "Bad debt adjustment draft not posted to return.",
        ]
      ),
      c(
        "Funk Group",
        "Before filing",
        "soon",
        "GST",
        [
          "Mixed-use adjustment for home office — percentage needs sign-off.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-gst-def",
        title: "Deferred GST on imports (1)",
        count: 1,
        intro:
          "JAX matched customs declarations to GST. Approve to post JAX’s clearing journal and remove the overstated deferred GST accrual.",
        units: [
          decisionPair(
            "nz-gst-def-1",
            {
              title: "Deferred GST accrual (GL)",
              subtitle: "Balance · $18,600",
            },
            {
              title: "GST on imports (customs)",
              subtitle: "MTD file · $16,200",
            }
          ),
        ],
      },
    ],
  },
  "nz-rd-tax": {
    groupTitle: "R&D tax credit",
    clients: [
      c(
        "Harbour Trading Co",
        "FY25 wash-up",
        "week",
        "R&D supplement",
        [
          "Labour proxy vs timesheet allocation differs for two projects.",
          "Contractor payments missing scientific uncertainty narrative.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-rd-labour",
        title: "Eligible labour hours (1)",
        count: 1,
        intro:
          "JAX re-mapped timesheets to eligible activity codes. Approve to accept the higher eligible hours and drop the proxy estimate line.",
        units: [
          decisionPair(
            "nz-rd-lab-1",
            {
              title: "Proxy labour (spreadsheet)",
              subtitle: "Project Helix · 1,020 hrs",
            },
            {
              title: "Timesheet-eligible hours",
              subtitle: "Payroll + projects · 1,180 hrs",
            }
          ),
        ],
      },
    ],
  },
  "au-div7a": {
    groupTitle: "Division 7A",
    clients: [
      c(
        "Summit Holdings",
        "Year end",
        "soon",
        "Shareholder loans",
        [
          "Minimum yearly repayment shortfall on three complying Division 7A loans.",
          "Benchmark interest rate change not reflected in loan schedules.",
        ]
      ),
      c(
        "Davidson Electrics",
        "Director loans",
        "week",
        "Private company",
        [
          "Trust distribution treated as loan — document repayment plan before lodgement.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "au-d7a-myr",
        title: "Minimum yearly repayment (1)",
        count: 1,
        intro:
          "JAX recalculated MYR using the updated benchmark rate. Approve to post the top-up repayment schedule and remove the old draft journal.",
        units: [
          decisionPair(
            "au-d7a-1",
            {
              title: "Draft MYR journal (prior rate)",
              subtitle: "Posted Apr · $42,000",
            },
            {
              title: "JAX MYR (benchmark 2025–26)",
              subtitle: "Recalculated · $44,600",
            }
          ),
        ],
      },
    ],
  },
  "au-paygw": {
    groupTitle: "PAYG withholding",
    clients: [
      c(
        "Northside Cafe Ltd",
        "STP event",
        "soon",
        "PAYG",
        [
          "Withholding on bonuses spiked vs prior quarter — check gross-up settings.",
          "Two employees with negative YTD balances after reversal of termination pay.",
        ]
      ),
      c(
        "Greener Gardening",
        "Pay run",
        "week",
        "PAYG",
        [
          "PAYG on unused leave payout differs from ATO estimator by 4%.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "au-paygw-ytd",
        title: "STP vs PAYG withheld (1)",
        count: 1,
        intro:
          "JAX reconciled STP year-to-date to the BAS PAYG withheld account. Approve to write off the variance using JAX’s bonus gross-up correction.",
        units: [
          decisionPair(
            "au-paygw-1",
            {
              title: "BAS PAYG withheld (posted)",
              subtitle: "YTD · $118,400",
            },
            {
              title: "STP sum of withholdings",
              subtitle: "YTD · $116,900",
            }
          ),
        ],
      },
    ],
  },
  "uk-badr": {
    groupTitle: "BADR",
    clients: [
      c(
        "Thames Manufacturing Ltd",
        "Exit planning",
        "soon",
        "Business disposal",
        [
          "Qualifying lifetime limit review after BADR rate change to 14%.",
          "Holdco sale may split gains across two qualifying assets — model scenarios.",
        ]
      ),
      c(
        "Harris Retail Co",
        "Due diligence",
        "week",
        "Share sale",
        [
          "Earn-out clauses may affect BADR availability on part of proceeds.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "uk-badr-rate",
        title: "BADR modelling (1)",
        count: 1,
        intro:
          "JAX applied the new 14% BADR assumption to the disposal memo. Approve to replace the legacy 10% scenario in the working papers.",
        units: [
          decisionPair(
            "uk-badr-1",
            {
              title: "Working — BADR at 10%",
              subtitle: "Draft gain · £2.1m",
            },
            {
              title: "JAX — BADR at 14%",
              subtitle: "Updated gain · £1.94m",
            }
          ),
        ],
      },
    ],
  },
  "uk-p11d-batch": {
    groupTitle: "P11D(b)",
    clients: [
      c(
        "BuildRight Ltd",
        "Amendment window",
        "week",
        "Benefits",
        [
          "Company car CO₂ banding updated mid-year — 8 vehicles to recalculate.",
          "Private fuel scales not withdrawn for 3 directors after policy change.",
        ]
      ),
      c(
        "Northside Cafe UK",
        "Payroll",
        "soon",
        "P11D",
        [
          "Medical cash plans above exempt threshold for 14 employees.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "uk-p11d-car",
        title: "Company car benefit (1)",
        count: 1,
        intro:
          "JAX updated CO₂ banding mid-year and recalculated cash equivalent. Approve to replace the P11D draft line with JAX’s figure and remove the overstated benefit.",
        units: [
          decisionPair(
            "uk-p11d-1",
            {
              title: "P11D draft — car cash equivalent",
              subtitle: "Old banding · £6,420",
            },
            {
              title: "JAX recalculated — car cash equivalent",
              subtitle: "2026 banding · £5,880",
            }
          ),
        ],
      },
    ],
  },
  "us-nexus": {
    groupTitle: "Sales tax nexus",
    clients: [
      c(
        "Acme Partners LLP",
        "Compliance",
        "soon",
        "State nexus",
        [
          "Remote seller thresholds crossed in 6 states based on trailing 12-month sales.",
          "Marketplace facilitator rules differ for two SKUs — confirm sourcing.",
        ]
      ),
      c(
        "Summit Retail Inc",
        "Registration",
        "week",
        "Sales tax",
        [
          "Economic nexus study flagged marketplace-only revenue in WA and TX.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "us-nexus-src",
        title: "Marketplace sourcing (1)",
        count: 1,
        intro:
          "JAX matched facilitator reports to your SKU map. Approve to treat revenue as marketplace-sourced (no new state nexus) and remove the direct-seller accrual.",
        units: [
          decisionPair(
            "us-nexus-1",
            {
              title: "Direct seller nexus accrual",
              subtitle: "WA + TX · $84,000",
            },
            {
              title: "Marketplace-sourced (JAX)",
              subtitle: "Facilitator IDs · $0 new nexus",
            }
          ),
        ],
      },
    ],
  },
  "us-179": {
    groupTitle: "Section 179",
    clients: [
      c(
        "Summit Retail Inc",
        "Book / tax",
        "week",
        "Fixed assets",
        [
          "Bonus depreciation taken on books but Section 179 election capped on partnership K-1.",
          "QIP vs 39-year property classification mismatch on renovation project.",
        ]
      ),
      c(
        "Acme Partners LLP",
        "K-1 review",
        "soon",
        "Partnership",
        [
          "11 assets under $2,500 de minimis — confirm safe harbour vs tax policy.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "us-179-qip",
        title: "QIP vs 39-year (1)",
        count: 1,
        intro:
          "JAX reclassified the renovation spend as qualified improvement property. Approve to take bonus on the QIP schedule and remove the 39-year straight-line draft.",
        units: [
          decisionPair(
            "us-179-1",
            {
              title: "Fixed asset — renovation (39-year)",
              subtitle: "NBV · $312,000",
            },
            {
              title: "QIP — renovation (JAX)",
              subtitle: "15-year property · $312,000",
            }
          ),
        ],
      },
    ],
  },
  "row-pe": {
    groupTitle: "Permanent establishment",
    clients: [
      c(
        "Manufacturing AG",
        "Risk review",
        "soon",
        "Global mobility",
        [
          "8 employees exceeded 183 days in host countries without local payroll setup.",
          "Service PE indicators from on-site commissioning revenue in two jurisdictions.",
        ]
      ),
      c(
        "LATAM Retail SA",
        "Quarterly",
        "week",
        "Tax",
        [
          "Regional SSC travellers charged to local cost centres — map to PE analysis.",
        ]
      ),
    ],
  },
  "row-wht": {
    groupTitle: "Withholding tax",
    clients: [
      c(
        "Finance Co Ltd",
        "Treaty",
        "week",
        "WHT reclaim",
        [
          "Dividend WHT at 15% vs treaty 5% — 5 payments awaiting residency certificates.",
          "Withholding on software royalties — characterisation differs by payer country.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "row-wht-treaty",
        title: "Dividend WHT rate (1)",
        count: 1,
        intro:
          "JAX applied the treaty rate with residency evidence on file. Approve to reverse the excess WHT accrual and keep the 5% treaty posting.",
        units: [
          decisionPair(
            "row-wht-1",
            {
              title: "Statutory WHT accrual (15%)",
              subtitle: "Dividend batch · €75,000",
            },
            {
              title: "Treaty WHT (5%) — JAX",
              subtitle: "Residency pack attached · €25,000",
            }
          ),
        ],
      },
    ],
  },
  "nz-student-loan": {
    groupTitle: "Student loan deductions",
    clients: [
      c(
        "Southern Meats Ltd",
        "Next pay",
        "soon",
        "PAYE",
        [
          "SLC rate change notices not applied for 4 employees after IR update.",
          "Voluntary extra deductions exceed statutory cap on two pay runs.",
        ]
      ),
      c(
        "Kauri Holdings Ltd",
        "Payroll",
        "week",
        "Student loan",
        [
          "Nine adjustment letters queued — confirm start dates vs hire records.",
        ]
      ),
    ],
  },
  "au-lsl": {
    groupTitle: "Long service leave",
    clients: [
      c(
        "Summit Holdings",
        "Award change",
        "soon",
        "Payroll",
        [
          "Pro rata accrual uplift for 7 employees after state portability rules.",
          "Casual conversion triggered LSL eligibility — check opening balances.",
        ]
      ),
    ],
  },
  "uk-p32-fps": {
    groupTitle: "P32 vs FPS",
    clients: [
      c(
        "Summit UK Ltd",
        "HMRC notice",
        "soon",
        "PAYE",
        [
          "FPS cumulative PAYE differs from P32 payment allocation for March.",
          "Employment Allowance claim not reflected on EPS for two schemes.",
        ]
      ),
      c(
        "Northside Cafe UK",
        "Scheme 2",
        "week",
        "PAYE",
        [
          "Apprenticeship levy vs allowance mismatch after payroll import.",
        ]
      ),
    ],
  },
  "us-tip-allocation": {
    groupTitle: "Tip pooling",
    clients: [
      c(
        "Summit Retail Inc",
        "Next payroll",
        "week",
        "FLSA",
        [
          "Credit card service charges netted from tips on 16 pay runs — DOL rule check.",
          "Back-of-house share above 15% of declared tips for 3 locations.",
        ]
      ),
    ],
  },
  "row-shadow-payroll": {
    groupTitle: "Shadow payroll",
    clients: [
      c(
        "Manufacturing AG",
        "Month end",
        "soon",
        "Global payroll",
        [
          "Hypo tax vs host withholding variance for 10 inbound assignees.",
          "Totalisation certificate missing for US–UK split payroll case.",
        ]
      ),
    ],
  },
  "nz-fbt-proxy": {
    groupTitle: "FBT proxy benefits",
    clients: [
      c(
        "Kauri Holdings Ltd",
        "Q4",
        "week",
        "FBT",
        [
          "Motor vehicle CO₂ banding changes affect 18 vehicles in pool.",
          "Private use adjustment for pooled EVs not yet applied.",
        ]
      ),
    ],
  },
  "au-ato-nudge": {
    groupTitle: "ATO pre-fill",
    clients: [
      c(
        "Northside Cafe Ltd",
        "Lodgement",
        "soon",
        "Income tax",
        [
          "Interest and dividend income from ATO pre-fill missing in ledger for 4 clients.",
          "Rental property deductions differ on 11 pre-fill lines vs rental schedule.",
        ]
      ),
    ],
  },
  "uk-cash-tax": {
    groupTitle: "Cash vs instalment tax",
    clients: [
      c(
        "Thames Manufacturing Ltd",
        "Board pack",
        "week",
        "CT / loans",
        [
          "s455 charge risk where dividends paid ahead of cleared CT instalments.",
          "Director loan account interest not posted — affects quarterly instalment base.",
        ]
      ),
    ],
  },
  "us-ubi-nfp": {
    groupTitle: "UBI screening",
    clients: [
      c(
        "Acme Partners LLP",
        "990-T",
        "soon",
        "NFP",
        [
          "Program service revenue streams with advertising share may trigger UBI.",
          "Partnership pass-through rental income on 3 NFP clients needs Schedule K-1 review.",
        ]
      ),
    ],
  },
  "row-pillar-two": {
    groupTitle: "Pillar Two",
    clients: [
      c(
        "Manufacturing AG",
        "Modelling",
        "week",
        "Global minimum tax",
        [
          "CbCR safe harbour vs detailed GloBE calculation differs for 4 entities.",
          "Deferred tax asset recognition on top-up tax under local GAAP unclear.",
        ]
      ),
    ],
  },
  "nz-spend-money": {
    groupTitle: "Spend money coding",
    clients: [
      c(
        "Walsh – Conroy",
        "Close",
        "soon",
        "Bookkeeping",
        [
          "47 spend-money lines on clearing account older than 45 days.",
          "Recurring card payments missing tax tags for GST.",
        ]
      ),
    ],
  },
  "au-lockbox": {
    groupTitle: "Undeposited funds",
    clients: [
      c(
        "Harriet Mayert",
        "Reconciliation",
        "week",
        "Banking",
        [
          "31 customer payments sitting in undeposited funds across 6 clients.",
          "Lockbox deposits not batched to match bank feed amounts.",
        ]
      ),
    ],
  },
  "uk-bank-fees": {
    groupTitle: "Bank fees",
    clients: [
      c(
        "Harris Retail Co",
        "Month end",
        "week",
        "Coding",
        [
          "Merchant service charges posted to suspense across 14 bank accounts.",
        ]
      ),
    ],
  },
  "us-class-memo": {
    groupTitle: "Class mapping",
    clients: [
      c(
        "Summit Retail Inc",
        "K-1 prep",
        "soon",
        "LLC",
        [
          "40 QuickBooks classes need roll-up to 1065 line items for two partnerships.",
        ]
      ),
    ],
  },
  "row-close-pack": {
    groupTitle: "Close pack",
    clients: [
      c(
        "Finance Co Ltd",
        "Month end",
        "soon",
        "Group close",
        [
          "12 checklist items incomplete — FX, intercompany, and WHT reconciliations.",
        ]
      ),
    ],
  },

  // ——— Mix: FYI (no JAX blocks) vs actionable JAX pairs ———
  "nz-fsj-fyi": {
    groupTitle: "Foreign super disclosure",
    clients: [
      c(
        "Kauri Holdings Ltd",
        "FY25 lodged",
        "week",
        "Information return",
        [
          "Inbound assignee disclosures filed — no further tax entries required this period.",
        ]
      ),
    ],
  },
  "nz-ird-log-fyi": {
    groupTitle: "IRD correspondence",
    clients: [
      c(
        "Walsh – Conroy",
        "Logged",
        "week",
        "Practice file",
        [
          "Observation letter scanned to client file; balances unchanged in Xero.",
        ]
      ),
    ],
  },
  "nz-gst-dup-inv": {
    groupTitle: "GST duplicate invoice",
    clients: [
      c(
        "Funk Group",
        "GST return",
        "soon",
        "GST",
        [
          "JAX found the same supplier invoice posted twice against one bank payment.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "nz-gst-dup",
        title: "Duplicate GST postings (1)",
        count: 1,
        intro:
          "JAX matched the bank line to a single supplier bill. Approve to remove the duplicate accrual and keep the paid bill.",
        units: [
          decisionPair(
            "nz-gst-dup-1",
            {
              title: "GST accrual — duplicate bill",
              subtitle: "AP · $4,820 incl GST",
            },
            {
              title: "Paid supplier bill (bank matched)",
              subtitle: "Cleared · $4,820 incl GST",
            }
          ),
        ],
      },
    ],
  },
  "au-loss-carry-fyi": {
    groupTitle: "Loss carry-forward",
    clients: [
      c(
        "Summit Holdings",
        "Schedule OK",
        "week",
        "Income tax",
        [
          "ATO schedule matches prior year losses — no amendment triggered.",
        ]
      ),
    ],
  },
  "au-bas-velocity-fyi": {
    groupTitle: "BAS cadence",
    clients: [
      c(
        "Northside Cafe Ltd",
        "Trend",
        "week",
        "Compliance",
        [
          "Trailing four quarters lodged within 2 days of due date across the firm.",
        ]
      ),
    ],
  },
  "au-gst-export-jax": {
    groupTitle: "GST-free exports",
    clients: [
      c(
        "Davidson Electrics",
        "BAS review",
        "soon",
        "GST",
        [
          "Exporter with mixed domestic sales — JAX indexed airway bills to GST-free lines.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "au-gst-exp",
        title: "Export evidence (1)",
        count: 1,
        intro:
          "JAX linked three AWBs to BAS Box 7. Approve to accept GST-free treatment and remove the domestic GST accrual JAX flagged as overstated.",
        units: [
          decisionPair(
            "au-gst-exp-1",
            {
              title: "Domestic GST accrual (manual)",
              subtitle: "BAS draft · $3,400",
            },
            {
              title: "GST-free export (AWB matched)",
              subtitle: "JAX · $0 domestic GST",
            }
          ),
        ],
      },
    ],
  },
  "uk-vat-dd-fyi": {
    groupTitle: "VAT direct debit",
    clients: [
      c(
        "Harris Retail Co",
        "Current month",
        "week",
        "VAT",
        [
          "HMRC collections matched to Xero bank — no variance on six mandates.",
        ]
      ),
    ],
  },
  "uk-ct-pmt-fyi": {
    groupTitle: "CT payments",
    clients: [
      c(
        "Thames Manufacturing Ltd",
        "Instalments",
        "week",
        "CT600",
        [
          "Payments posted match CT forecast — no top-up letter expected.",
        ]
      ),
    ],
  },
  "uk-vat-partial-jax": {
    groupTitle: "Partial exemption",
    clients: [
      c(
        "Harris Retail Co",
        "Year-end",
        "soon",
        "VAT",
        [
          "Residual tax method recalculation after property partial use change.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "uk-vat-pe",
        title: "Partial exemption % (1)",
        count: 1,
        intro:
          "JAX recalculated the annual adjustment using transaction-level mapping. Approve to lock the new recovery percentage and retire the provisional rate.",
        units: [
          decisionPair(
            "uk-vat-pe-1",
            {
              title: "Provisional recovery %",
              subtitle: "Year to date · 68.2%",
            },
            {
              title: "JAX recalculated recovery %",
              subtitle: "Annual adjustment · 71.0%",
            }
          ),
        ],
      },
    ],
  },
  "us-fed-wh-fyi": {
    groupTitle: "Federal withholding",
    clients: [
      c(
        "Summit Retail Inc",
        "Form 941",
        "week",
        "Payroll tax",
        [
          "941 totals tie to payroll registers for the quarter — no deposit variance.",
        ]
      ),
    ],
  },
  "us-ext-log-fyi": {
    groupTitle: "Extensions",
    clients: [
      c(
        "Acme Partners LLP",
        "Calendar",
        "week",
        "Compliance",
        [
          "Extension dates synced from IRS to firm calendar — no entities past watch window.",
        ]
      ),
    ],
  },
  "us-charity-sub-jax": {
    groupTitle: "Charitable substantiation",
    clients: [
      c(
        "Coastal S-Corp",
        "990 / books",
        "soon",
        "NFP",
        [
          "Non-cash donations need photo receipts tied to GL lines before filing.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "us-ch-sub",
        title: "Non-cash donations (1)",
        count: 1,
        intro:
          "JAX paired appraisal PDFs to pledge batches. Approve to accept appraised amounts and remove the lower book estimate lines.",
        units: [
          decisionPair(
            "us-ch-1",
            {
              title: "Book estimate — auction items",
              subtitle: "GL batch · $18,200",
            },
            {
              title: "Appraisal-backed gifts (JAX)",
              subtitle: "Receipt pack · $21,400",
            }
          ),
        ],
      },
    ],
  },
  "row-cbcr-fyi": {
    groupTitle: "CbCR validation",
    clients: [
      c(
        "Manufacturing AG",
        "FY25",
        "week",
        "CbCR",
        [
          "OECD XML schema checks passed — file ready for local submission window.",
        ]
      ),
    ],
  },
  "row-tp-calendar-fyi": {
    groupTitle: "TP calendar",
    clients: [
      c(
        "LATAM Retail SA",
        "Quarterly",
        "week",
        "Transfer pricing",
        [
          "Local files due in next 30 days are green in shared tracker.",
        ]
      ),
    ],
  },
  "row-stc-wht-jax": {
    groupTitle: "Service fee WHT",
    clients: [
      c(
        "Finance Co Ltd",
        "SSC",
        "soon",
        "WHT",
        [
          "Two shared service centres posted the same WHT accrual on the same invoice ID.",
        ]
      ),
    ],
    decisionGroups: [
      {
        id: "row-stc-dup",
        title: "Duplicate WHT accrual (1)",
        count: 1,
        intro:
          "JAX traced the invoice to a single source payment. Approve to reverse the duplicate STC accrual and keep the posting with supporting WHT certificate.",
        units: [
          decisionPair(
            "row-stc-1",
            {
              title: "WHT accrual (duplicate)",
              subtitle: "SSC B · €12,400",
            },
            {
              title: "WHT accrual (certificate linked)",
              subtitle: "SSC A · €12,400",
            }
          ),
        ],
      },
    ],
  },
  "nz-pr-green-fyi": {
    groupTitle: "PAYE health",
    clients: [
      c(
        "Graham and Sons",
        "Current",
        "week",
        "PAYE",
        [
          "All employer PAYE schemes filed on time for the payroll month — no exceptions.",
        ]
      ),
    ],
  },
  "au-stp-health-fyi": {
    groupTitle: "STP stream",
    clients: [
      c(
        "Greener Gardening",
        "STP",
        "week",
        "Payroll",
        [
          "No missing event IDs in the last 14 days of STP submissions.",
        ]
      ),
    ],
  },
  "uk-pension-file-fyi": {
    groupTitle: "Pension file",
    clients: [
      c(
        "Northside Cafe UK",
        "Sync",
        "week",
        "Auto-enrolment",
        [
          "Contribution file matches payroll deductions for the month.",
        ]
      ),
    ],
  },
  "us-deposit-941-fyi": {
    groupTitle: "941 deposits",
    clients: [
      c(
        "Coastal S-Corp",
        "Schedule",
        "week",
        "941",
        [
          "Next federal deposits calculated and within safe harbour based on prior quarter.",
        ]
      ),
    ],
  },
  "row-pr-clock-fyi": {
    groupTitle: "Payroll cut-off",
    clients: [
      c(
        "Manufacturing AG",
        "Global",
        "week",
        "Payroll",
        [
          "All regions reported green status for the upcoming payroll cut-off.",
        ]
      ),
    ],
  },
  "nz-ins-rhythm-fyi": {
    groupTitle: "Filing rhythm",
    clients: [
      c(
        "Summit Holdings",
        "Outlook",
        "week",
        "Advisory",
        [
          "Firm-wide lodgement dates cluster with no capacity risk in the next 45 days.",
        ]
      ),
    ],
  },
  "au-ins-margin-fyi": {
    groupTitle: "Margin snapshot",
    clients: [
      c(
        "Northside Cafe Ltd",
        "BAS trend",
        "week",
        "Insights",
        [
          "Gross margin vs prior BAS quarter stable — no alert thresholds tripped.",
        ]
      ),
    ],
  },
  "uk-ins-forecast-fyi": {
    groupTitle: "Cash tax forecast",
    clients: [
      c(
        "Harbour Trading Co",
        "Board",
        "week",
        "Forecast",
        [
          "Management forecast aligns with CT instalment profile for the quarter.",
        ]
      ),
    ],
  },
  "us-ins-cash-fyi": {
    groupTitle: "Operating cash",
    clients: [
      c(
        "Acme Partners LLP",
        "Liquidity",
        "week",
        "Advisory",
        [
          "Operating cash buffer vs scheduled tax payments healthy on rolling 90-day view.",
        ]
      ),
    ],
  },
  "row-ins-liquidity-fyi": {
    groupTitle: "Regional liquidity",
    clients: [
      c(
        "LATAM Retail SA",
        "Policy",
        "week",
        "Treasury",
        [
          "Regional cash vs tax payment policy within tolerance for both SSCs.",
        ]
      ),
    ],
  },
  "nz-bk-rules-applied-fyi": {
    groupTitle: "Bank rules",
    clients: [
      c(
        "Brendan Zulauf",
        "Overnight",
        "week",
        "Automation",
        [
          "JAX applied three high-confidence bank rules; entries posted with full audit trail.",
        ]
      ),
    ],
  },
  "au-bk-feed-health-fyi": {
    groupTitle: "Bank feeds",
    clients: [
      c(
        "Harriet Mayert",
        "SLA",
        "week",
        "Feeds",
        [
          "Feed latency within SLA for all linked institutions — no reconnect prompts.",
        ]
      ),
    ],
  },
  "uk-bk-vat-lock-fyi": {
    groupTitle: "VAT lock",
    clients: [
      c(
        "BuildRight Ltd",
        "Post-file",
        "week",
        "Bookkeeping",
        [
          "VAT periods locked after successful filing — no reopen requests pending.",
        ]
      ),
    ],
  },
  "us-bk-cc-cleared-fyi": {
    groupTitle: "Corporate cards",
    clients: [
      c(
        "Summit Retail Inc",
        "Month end",
        "week",
        "Cards",
        [
          "Corporate card clearing accounts net to zero after statement close.",
        ]
      ),
    ],
  },
  "row-bk-ic-rec-fyi": {
    groupTitle: "Intercompany rec",
    clients: [
      c(
        "HoldCo / OpCo pair",
        "Close",
        "week",
        "IC",
        [
          "Matched intercompany pairs with no exceptions flagged this close.",
        ]
      ),
    ],
  },

  ...buildActionQueuePanelEntries(),
};

export function mergeTaxActionPanels(
  memberIds: readonly string[],
  groupTitle: string
): TaxActionPanelDetail {
  const byName = new Map<string, TaxActionPanelClient>();
  for (const mid of memberIds) {
    const p = TAX_ACTION_PANELS[mid];
    if (!p) continue;
    for (const cl of p.clients) {
      const ex = byName.get(cl.name);
      if (ex) {
        const merged = new Set([...ex.insights, ...cl.insights]);
        ex.insights = [...merged];
      } else {
        byName.set(cl.name, {
          ...cl,
          insights: [...cl.insights],
        });
      }
    }
  }
  // Aggregates stay as the classic client-card list; decision UI is single-alert only.
  return { groupTitle, clients: [...byName.values()] };
}

/** Totals for aggregate widget lines (matches merged sidebar dedupe). */
export function countTaxActionPanelStats(
  memberIds: readonly string[]
): { actionCount: number; entityCount: number } {
  const merged = mergeTaxActionPanels(memberIds, "");
  let actionCount = 0;
  for (const cl of merged.clients) {
    actionCount += cl.insights.length;
  }
  return { actionCount, entityCount: merged.clients.length };
}

export function getTaxActionPanelDetail(
  id: string | null | undefined
): TaxActionPanelDetail {
  if (id && TAX_ACTION_PANELS[id]) {
    return TAX_ACTION_PANELS[id];
  }
  return DEFAULT_TAX_ACTION_PANEL;
}


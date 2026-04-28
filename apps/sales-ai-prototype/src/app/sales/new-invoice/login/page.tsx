"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInvoiceLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/sales/new-invoice/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError("Incorrect password");
        setLoading(false);
        return;
      }
      router.push("/sales/new-invoice");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f3f4] flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-[19px] font-bold text-[#333]">New invoice</h1>
        <p className="mt-1 text-[13px] text-[#666]">Enter the password to continue.</p>
        <form onSubmit={handleSubmit} className="mt-5">
          <label className="block text-[12px] font-bold text-[#404756]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-8 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-[13px] text-[#333] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
            autoComplete="current-password"
            autoFocus
            disabled={loading}
          />
          {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
          <button
            type="submit"
            className="mt-4 h-8 w-full rounded-[3px] bg-[#0078C8] px-4 text-[13px] font-medium text-white hover:bg-[#005fa3] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Checking…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

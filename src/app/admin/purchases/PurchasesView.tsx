"use client";

import { useState } from "react";
import PurchasesUploadPanel from "./PurchasesUploadPanel";

export type Purchase = {
  timestamp: string;
  provider: string;
  order_id: string;
  bill: number;
  fees: number;
  net: number;
  status: string;
  name: string;
  email: string;
  payment_method: string;
};

export default function PurchasesView({ initialPurchases }: { initialPurchases: Purchase[] }) {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const res  = await fetch("/api/admin/purchases");
      const data = await res.json();
      if (res.ok) setPurchases(data.purchases);
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="space-y-6">
      <PurchasesUploadPanel onUploaded={refresh} />

      <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-sans text-sm font-bold text-text-dark">
            {purchases.length} record{purchases.length === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            className="cursor-pointer font-sans text-xs font-bold text-korean-red hover:underline disabled:opacity-60"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 font-sans text-sm">
            <thead>
              <tr className="border-b border-cherry-pink/30 text-left text-xs font-bold uppercase tracking-wide text-text-light">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Provider</th>
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4 text-right">Bill</th>
                <th className="py-2 pr-4 text-right">Fees</th>
                <th className="py-2 pr-4 text-right">Net</th>
                <th className="py-2 pr-4">Method</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, i) => (
                <tr key={`${p.order_id}-${p.timestamp}-${i}`} className="border-b border-cherry-pink/10 text-text-mid">
                  <td className="py-2 pr-4 whitespace-nowrap">{p.timestamp}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{p.provider}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{p.order_id}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{p.name}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{p.email}</td>
                  <td className="py-2 pr-4 text-right whitespace-nowrap">RM {p.bill.toFixed(2)}</td>
                  <td className="py-2 pr-4 text-right whitespace-nowrap">RM {p.fees.toFixed(2)}</td>
                  <td className="py-2 pr-4 text-right whitespace-nowrap font-bold text-text-dark">RM {p.net.toFixed(2)}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{p.payment_method || "—"}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    <span className={p.status === "success" ? "text-green-600" : "text-text-light"}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-6 text-center text-text-light">No purchases yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import PurchasesUploadPanel from "./PurchasesUploadPanel";
import PayPalSyncPanel from "./PayPalSyncPanel";

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
  country: string;
};

const PAGE_SIZE = 20;
const ALL = "__all__";

const STATUS_STYLES: Record<string, string> = {
  success: "bg-green-100 text-green-700",
};

function uniqueSorted(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => !!v))).sort();
}

export default function PurchasesView({ initialPurchases }: { initialPurchases: Purchase[] }) {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const [providerFilter, setProviderFilter] = useState(ALL);
  const [methodFilter, setMethodFilter]     = useState(ALL);
  const [statusFilter, setStatusFilter]     = useState(ALL);

  const providerOptions = useMemo(() => uniqueSorted(purchases.map((p) => p.provider)), [purchases]);
  const methodOptions   = useMemo(() => uniqueSorted(purchases.map((p) => p.payment_method)), [purchases]);
  const statusOptions   = useMemo(() => uniqueSorted(purchases.map((p) => p.status)), [purchases]);

  const filtered = useMemo(() => purchases.filter((p) =>
    (providerFilter === ALL || p.provider === providerFilter) &&
    (methodFilter === ALL || p.payment_method === methodFilter) &&
    (statusFilter === ALL || p.status === statusFilter)
  ), [purchases, providerFilter, methodFilter, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageRows  = useMemo(() => filtered.slice(pageStart, pageStart + PAGE_SIZE), [filtered, pageStart]);

  async function refresh() {
    setRefreshing(true);
    try {
      const res  = await fetch("/api/admin/purchases");
      const data = await res.json();
      if (res.ok) {
        setPurchases(data.purchases);
        setPage(1);
      }
    } finally {
      setRefreshing(false);
    }
  }

  function goToPage(next: number) {
    setPage(Math.min(Math.max(next, 1), pageCount));
  }

  function updateFilter(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PurchasesUploadPanel onUploaded={refresh} />
        <PayPalSyncPanel onSynced={refresh} />
      </div>

      <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-sans text-sm font-bold text-text-dark">
            {filtered.length} of {purchases.length} record{purchases.length === 1 ? "" : "s"}
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

        <div className="mb-4 flex flex-wrap gap-3">
          <FilterSelect label="Provider" value={providerFilter} options={providerOptions} onChange={(v) => updateFilter(setProviderFilter, v)} />
          <FilterSelect label="Method"   value={methodFilter}   options={methodOptions}   onChange={(v) => updateFilter(setMethodFilter, v)} />
          <FilterSelect label="Status"   value={statusFilter}   options={statusOptions}   onChange={(v) => updateFilter(setStatusFilter, v)} />
        </div>

        <div className="max-h-[70vh] min-w-225 overflow-auto rounded-xl border border-cherry-pink/20">
          <table className="w-full font-sans text-sm">
            <thead className="sticky top-0 z-10 bg-light-pink">
              <tr className="text-left text-xs font-bold uppercase tracking-wide text-text-light">
                <th className="py-3 pr-4 pl-4">Date</th>
                <th className="py-3 pr-4">Provider</th>
                <th className="py-3 pr-4">Order ID</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4 text-right">Bill</th>
                <th className="py-3 pr-4 text-right">Fees</th>
                <th className="py-3 pr-4 text-right">Net</th>
                <th className="py-3 pr-4">Method</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Country</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((p, i) => (
                <tr
                  key={`${p.order_id}-${p.timestamp}-${i}`}
                  className="border-b border-cherry-pink/10 text-text-mid odd:bg-warm-linen/50 hover:bg-light-pink/60"
                >
                  <td className="py-2.5 pr-4 pl-4 whitespace-nowrap">{p.timestamp}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">{p.provider}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">{p.order_id}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">{p.name}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">{p.email}</td>
                  <td className="py-2.5 pr-4 text-right whitespace-nowrap">RM {p.bill.toFixed(2)}</td>
                  <td className="py-2.5 pr-4 text-right whitespace-nowrap">RM {p.fees.toFixed(2)}</td>
                  <td className="py-2.5 pr-4 text-right whitespace-nowrap font-bold text-text-dark">RM {p.net.toFixed(2)}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">{p.payment_method || "—"}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_STYLES[p.status] ?? "bg-gray-100 text-text-light"}`}>
                      {p.status || "—"}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">{p.country || "—"}</td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-6 text-center text-text-light">No purchases match these filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="font-sans text-xs text-text-light">
              Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="cursor-pointer rounded-lg border border-cherry-pink/30 px-3 py-1.5 font-sans text-xs font-bold text-text-dark transition-colors hover:bg-light-pink disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <span className="font-sans text-xs font-bold text-text-dark">Page {page} / {pageCount}</span>
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === pageCount}
                className="cursor-pointer rounded-lg border border-cherry-pink/30 px-3 py-1.5 font-sans text-xs font-bold text-text-dark transition-colors hover:bg-light-pink disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 font-sans text-xs font-bold text-text-light">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer rounded-lg border border-cherry-pink/30 bg-white px-2.5 py-1.5 font-sans text-xs font-bold text-text-dark outline-none focus:border-korean-red"
      >
        <option value={ALL}>All</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
  );
}

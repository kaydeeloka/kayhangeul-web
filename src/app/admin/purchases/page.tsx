import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/lib/adminAuth";
import { gasGet } from "@/src/lib/gas";
import AdminShell from "../AdminShell";
import PurchasesView, { type Purchase } from "./PurchasesView";

async function getPurchases(): Promise<{ purchases: Purchase[]; error: string | null }> {
  try {
    const data = await gasGet<{ purchases: Purchase[] }>("purchases-list");
    return { purchases: data.purchases, error: null };
  } catch (err) {
    return { purchases: [], error: err instanceof Error ? err.message : "Failed to load purchases." };
  }
}

export default async function AdminPurchasesPage() {
  if (!(await requireAdmin())) redirect("/admin/login");

  const { purchases, error } = await getPurchases();

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="font-sans text-3xl font-black text-text-dark">Purchases</h1>
        {error && <p className="font-sans text-sm text-red-500">{error}</p>}
        <PurchasesView initialPurchases={purchases} />
      </div>
    </AdminShell>
  );
}

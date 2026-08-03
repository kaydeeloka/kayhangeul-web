import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/lib/adminAuth";
import { gasGet } from "@/src/lib/gas";
import AdminShell from "./AdminShell";
import StatTile from "./StatTile";

async function getDashboardStats() {
  try {
    const [purchasesSummary, reviewStats] = await Promise.all([
      gasGet<{ count: number; totalBill: number; totalFees: number; totalNet: number }>("purchases-summary"),
      gasGet<{ count: number; average: number }>("review-stats"),
    ]);
    return { purchasesSummary, reviewStats, error: null };
  } catch (err) {
    return {
      purchasesSummary: { count: 0, totalBill: 0, totalFees: 0, totalNet: 0 },
      reviewStats:       { count: 0, average: 0 },
      error: err instanceof Error ? err.message : "Failed to load dashboard.",
    };
  }
}

export default async function AdminDashboardPage() {
  if (!(await requireAdmin())) redirect("/admin/login");

  const { purchasesSummary, reviewStats, error } = await getDashboardStats();

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="font-sans text-3xl font-black text-text-dark">Dashboard</h1>

        {error && <p className="font-sans text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Total Sold" value={String(purchasesSummary.count)} sublabel="Successful purchases" />
          <StatTile
            label="Net Revenue"
            value={`RM ${purchasesSummary.totalNet.toFixed(2)}`}
            sublabel={`RM ${purchasesSummary.totalBill.toFixed(2)} billed − RM ${purchasesSummary.totalFees.toFixed(2)} fees`}
          />
          <StatTile
            label="Total Reviews"
            value={String(reviewStats.count)}
            sublabel={reviewStats.count > 0 ? `${reviewStats.average}/5 average` : "No approved reviews yet"}
          />
          <StatTile label="Total Product" value="1" sublabel="KayHangeul Traveler Pack" />
        </div>
      </div>
    </AdminShell>
  );
}

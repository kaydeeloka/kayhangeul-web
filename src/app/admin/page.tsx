import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/lib/adminAuth";
import { gasGet } from "@/src/lib/gas";
import AdminShell from "./AdminShell";
import StatCard from "./StatCard";
import BalanceCard from "./BalanceCard";
import SalesChart from "./SalesChart";
import RecentPurchases from "./RecentPurchases";
import RecentReviews from "./RecentReviews";
import PaymentMethodDonut from "./PaymentMethodDonut";
import TopCountries from "./TopCountries";

type PurchasesSummary = { count: number; totalBill: number; totalFees: number; totalNet: number };
type ReviewStats       = { count: number; average: number };
type MonthPoint        = { month: string; count: number; bill: number; net: number };
type Purchase          = { timestamp: string; order_id: string; net: number; name: string; payment_method: string };
type Review            = { row: number; date: string; name: string; rating: number; status: string };
type MethodTotal       = { method: string; count: number; total: number };
type CountryTotal      = { country: string; count: number; total: number };

async function getDashboardData() {
  try {
    const [purchasesSummary, reviewStats, monthly, purchasesList, reviewsList, byMethod, byCountry] = await Promise.all([
      gasGet<PurchasesSummary>("purchases-summary"),
      gasGet<ReviewStats>("review-stats"),
      gasGet<{ months: MonthPoint[] }>("purchases-monthly"),
      gasGet<{ purchases: Purchase[] }>("purchases-list"),
      gasGet<{ reviews: Review[] }>("reviews-list"),
      gasGet<{ methods: MethodTotal[] }>("purchases-by-method"),
      gasGet<{ countries: CountryTotal[] }>("purchases-by-country"),
    ]);
    return {
      purchasesSummary,
      reviewStats,
      months:          monthly.months,
      recentPurchases: purchasesList.purchases.slice(0, 5),
      recentReviews:   reviewsList.reviews.slice(0, 5),
      methods:         byMethod.methods,
      countries:       byCountry.countries,
      error: null,
    };
  } catch (err) {
    return {
      purchasesSummary: { count: 0, totalBill: 0, totalFees: 0, totalNet: 0 },
      reviewStats:       { count: 0, average: 0 },
      months:            [] as MonthPoint[],
      recentPurchases:   [] as Purchase[],
      recentReviews:     [] as Review[],
      methods:           [] as MethodTotal[],
      countries:         [] as CountryTotal[],
      error: err instanceof Error ? err.message : "Failed to load dashboard.",
    };
  }
}

export default async function AdminDashboardPage() {
  if (!(await requireAdmin())) redirect("/admin/login");

  const { purchasesSummary, reviewStats, months, recentPurchases, recentReviews, methods, countries, error } = await getDashboardData();

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="font-sans text-3xl font-black text-text-dark">Dashboard</h1>

        {error && <p className="font-sans text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: stat cards + chart + recent purchases */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard
                label="Total Orders"
                value={String(purchasesSummary.count)}
                sublabel={`RM ${purchasesSummary.totalBill.toFixed(2)} billed`}
                iconBg="bg-korean-red"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                  </svg>
                }
              />
              <StatCard
                label="Total Reviews"
                value={String(reviewStats.count)}
                sublabel={reviewStats.count > 0 ? `${reviewStats.average}/5 average` : "No approved reviews yet"}
                iconBg="bg-korean-blue"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.63 22 9.24 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.24 8.91 8.63 12 2" />
                  </svg>
                }
              />
              <StatCard
                label="Total Product"
                value="1"
                sublabel="KayHangeul Traveler Pack"
                iconBg="bg-charcoal"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.5 7.3 12 12l-8.5-4.7M12 22V12M21 16.5V7.5a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4a2 2 0 0 0-1 1.7v9a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z" />
                  </svg>
                }
              />
            </div>

            <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
              <p className="font-sans text-sm font-bold text-text-dark">Sales — Last 6 Months</p>
              <div className="mt-4">
                <SalesChart months={months} />
              </div>
            </div>

            <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
              <p className="font-sans text-sm font-bold text-text-dark">Sales by Payment Instrument Type</p>
              <div className="mt-4">
                <PaymentMethodDonut methods={methods} />
              </div>
            </div>

            <RecentPurchases purchases={recentPurchases} />
          </div>

          {/* Right: balance + top countries + recent reviews */}
          <div className="space-y-6">
            <BalanceCard
              totalNet={purchasesSummary.totalNet}
              totalBill={purchasesSummary.totalBill}
              totalFees={purchasesSummary.totalFees}
            />

            <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
              <p className="mb-4 font-sans text-sm font-bold text-text-dark">Top 5 Countries by Sales</p>
              <TopCountries countries={countries} />
            </div>

            <RecentReviews reviews={recentReviews} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

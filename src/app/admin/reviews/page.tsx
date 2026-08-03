import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/lib/adminAuth";
import { gasGet } from "@/src/lib/gas";
import AdminShell from "../AdminShell";
import ReviewsModerationView, { type ReviewRow } from "./ReviewsModerationView";

async function getReviews(): Promise<{ reviews: ReviewRow[]; error: string | null }> {
  try {
    const data = await gasGet<{ reviews: ReviewRow[] }>("reviews-list");
    return { reviews: data.reviews, error: null };
  } catch (err) {
    return { reviews: [], error: err instanceof Error ? err.message : "Failed to load reviews." };
  }
}

export default async function AdminReviewsPage() {
  if (!(await requireAdmin())) redirect("/admin/login");

  const { reviews, error } = await getReviews();

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="font-sans text-3xl font-black text-text-dark">Reviews</h1>
        {error && <p className="font-sans text-sm text-red-500">{error}</p>}
        <ReviewsModerationView initialReviews={reviews} />
      </div>
    </AdminShell>
  );
}

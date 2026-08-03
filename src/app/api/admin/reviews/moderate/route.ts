import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/adminAuth";
import { gasPost } from "@/src/lib/gas";

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { row, status } = await req.json();
  if (!row || !["approved", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "Invalid row or status." }, { status: 400 });
  }

  try {
    await gasPost({ type: "review-moderate", row, status });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to update review." }, { status: 502 });
  }
}

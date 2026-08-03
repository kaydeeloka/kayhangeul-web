import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/adminAuth";
import { gasGet } from "@/src/lib/gas";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await gasGet("reviews-list");
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to load reviews." }, { status: 502 });
  }
}

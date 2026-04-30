import { NextResponse } from "next/server";

export async function GET() {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ count: 0, average: 0 });

  const res = await fetch(`${scriptUrl}?action=review-stats`, { cache: "no-store" });
  if (!res.ok) return NextResponse.json({ count: 0, average: 0 });

  const data = await res.json();
  return NextResponse.json({ count: data.count ?? 0, average: data.average ?? 0 });
}

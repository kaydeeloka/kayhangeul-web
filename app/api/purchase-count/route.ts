import { NextResponse } from "next/server";

export async function GET() {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });

  const res = await fetch(`${scriptUrl}?action=purchase-count`, { cache: "no-store" });
  if (!res.ok) return NextResponse.json({ count: 0 });

  const data = await res.json();
  return NextResponse.json({ count: data.count ?? 0 });
}

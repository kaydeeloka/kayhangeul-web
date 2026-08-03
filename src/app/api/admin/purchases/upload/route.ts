import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidAdminSession } from "@/src/lib/adminAuth";
import { parseToyyibPayFile } from "@/src/lib/parsePurchasesFile";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  let rows;
  try {
    rows = parseToyyibPayFile(buffer);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to parse file." }, { status: 400 });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: "No rows found in file." }, { status: 400 });
  }

  const scriptUrl = process.env.GOOGLE_TRAVEL_SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const sheetRes  = await fetch(scriptUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ type: "purchases_bulk", rows }),
  });
  const sheetData = await sheetRes.json();

  if (sheetData.error) {
    return NextResponse.json({ error: sheetData.error }, { status: 502 });
  }

  const totalRevenue = rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  const byMethod: Record<string, { count: number; revenue: number }> = {};
  for (const r of rows) {
    const method = r.payment_method || "Unknown";
    byMethod[method] ??= { count: 0, revenue: 0 };
    byMethod[method].count   += 1;
    byMethod[method].revenue += parseFloat(r.amount) || 0;
  }

  return NextResponse.json({
    success: true,
    parsed:  rows.length,
    added:   sheetData.added,
    skipped: sheetData.skipped,
    totalRevenue,
    byMethod,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/adminAuth";
import { parseToyyibPayFile } from "@/src/lib/parsePurchasesFile";
import { gasPost } from "@/src/lib/gas";

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
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

  let sheetData;
  try {
    sheetData = await gasPost<{ added: number; skipped: number }>({ type: "purchases_bulk", rows });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to sync to sheet." }, { status: 502 });
  }

  const totalBill = rows.reduce((sum, r) => sum + (parseFloat(r.bill) || 0), 0);
  const totalNet  = rows.reduce((sum, r) => sum + (parseFloat(r.net)  || 0), 0);
  const byMethod: Record<string, { count: number; bill: number; net: number }> = {};
  for (const r of rows) {
    const method = r.payment_method || "Unknown";
    byMethod[method] ??= { count: 0, bill: 0, net: 0 };
    byMethod[method].count += 1;
    byMethod[method].bill  += parseFloat(r.bill) || 0;
    byMethod[method].net   += parseFloat(r.net)  || 0;
  }

  return NextResponse.json({
    success: true,
    parsed:  rows.length,
    added:   sheetData.added,
    skipped: sheetData.skipped,
    totalBill,
    totalNet,
    byMethod,
  });
}

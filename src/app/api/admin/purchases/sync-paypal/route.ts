import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/adminAuth";
import { summarizePurchaseRows } from "@/src/lib/parsePurchasesFile";
import { fetchPayPalPurchases } from "@/src/lib/paypal";
import { gasPost } from "@/src/lib/gas";

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { startDate, endDate } = await req.json();
  if (!startDate || !endDate) {
    return NextResponse.json({ error: "startDate and endDate are required." }, { status: 400 });
  }

  let rows;
  try {
    rows = await fetchPayPalPurchases(startDate, endDate);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to fetch PayPal transactions." }, { status: 502 });
  }

  if (rows.length === 0) {
    return NextResponse.json({ success: true, parsed: 0, added: 0, skipped: 0, totalBill: 0, totalNet: 0, byMethod: {} });
  }

  let sheetData;
  try {
    sheetData = await gasPost<{ added: number; skipped: number }>({ type: "purchases_bulk", rows });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to sync to sheet." }, { status: 502 });
  }

  const { totalBill, totalNet, byMethod } = summarizePurchaseRows(rows);

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

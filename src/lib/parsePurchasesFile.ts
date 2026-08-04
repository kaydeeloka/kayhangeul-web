import * as XLSX from "xlsx";

export type PurchaseRow = {
  timestamp: string;
  provider: string;
  order_id: string;
  bill: string;
  fees: string;
  net: string;
  status: string;
  name: string;
  email: string;
  payment_method: string;
  country: string;
};

const TOYYIBPAY_FLAT_FEE = 1;

export function parseToyyibPayFile(buffer: ArrayBuffer): PurchaseRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet    = workbook.Sheets[workbook.SheetNames[0]];
  const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });

  if (rows.length === 0) return [];

  const header = rows[0].map((h) => String(h).trim());
  const columnIndex = (name: string) => header.indexOf(name);

  const iPayerName  = columnIndex("Payer Name");
  const iPayerEmail = columnIndex("Payer Email");
  const iRefNo      = columnIndex("Reference Number");
  const iAmountPaid = columnIndex("Amount Paid (RM)");
  const iTxnDate    = columnIndex("Transaction Date");
  const iMethod     = columnIndex("Payment Method");

  if (iPayerName === -1 || iPayerEmail === -1 || iRefNo === -1 || iAmountPaid === -1 || iTxnDate === -1) {
    throw new Error("Unrecognized ToyyibPay file format — expected columns not found.");
  }

  return rows
    .slice(1)
    .filter((r) => r.some((cell) => String(cell).trim() !== ""))
    .map((r) => {
      const bill = parseFloat(String(r[iAmountPaid] ?? "").trim()) || 0;
      const fees = TOYYIBPAY_FLAT_FEE;
      const net  = bill - fees;

      return {
        timestamp:      String(r[iTxnDate] ?? "").trim(),
        provider:       "toyyibpay",
        order_id:       String(r[iRefNo] ?? "").trim(),
        bill:           bill.toFixed(2),
        fees:           fees.toFixed(2),
        net:            net.toFixed(2),
        status:         "success",
        name:           String(r[iPayerName] ?? "").trim(),
        email:          String(r[iPayerEmail] ?? "").trim(),
        payment_method: iMethod !== -1 ? String(r[iMethod] ?? "").trim() : "",
        country:        "Malaysia",
      };
    });
}

export function summarizePurchaseRows(rows: PurchaseRow[]) {
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
  return { totalBill, totalNet, byMethod };
}

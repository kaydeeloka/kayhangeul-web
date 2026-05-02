import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { sendPurchaseEmail } from "@/app/lib/sendPurchaseEmail";

// Configure Callback URL in ToyyibPay category settings (not available on localhost)
export async function POST(req: NextRequest) {
  const form = await req.formData();

  const refno      = form.get("refno")?.toString()       ?? "";
  const status     = form.get("status")?.toString()      ?? "";
  const orderId    = form.get("order_id")?.toString()    ?? "";
  const amount     = form.get("amount")?.toString()      ?? "";
  const hash       = form.get("hash")?.toString()        ?? "";
  const buyerEmail = form.get("email")?.toString()       ?? "";
  const buyerName  = form.get("name")?.toString()        ?? "Pelanggan";

  // Validate hash: MD5(secretKey + status + order_id + refno + "ok")
  const secretKey    = process.env.TOYYIBPAY_SECRET_KEY ?? "";
  const expectedHash = createHash("md5")
    .update(secretKey + status + orderId + refno + "ok")
    .digest("hex");

  if (hash !== expectedHash) {
    return NextResponse.json({ error: "Invalid hash." }, { status: 400 });
  }

  // status: "1" = success, "2" = pending, "3" = fail
  const statusMap: Record<string, string> = { "1": "success", "2": "pending", "3": "failed" };
  const resolvedStatus = statusMap[status] ?? "failed";

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });

  await Promise.all([
    fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type:     "purchase",
        provider: "toyyibpay",
        order_id: orderId,
        amount,
        status:   resolvedStatus,
        email:    buyerEmail,
      }),
    }),
    resolvedStatus === "success" && buyerEmail
      ? sendPurchaseEmail(buyerEmail, buyerName)
      : Promise.resolve(),
  ]);

  return NextResponse.json({ success: true });
}

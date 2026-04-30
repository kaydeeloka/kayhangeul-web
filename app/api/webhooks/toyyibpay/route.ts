import { NextRequest, NextResponse } from "next/server";

// ToyyibPay POSTs form-encoded data to this URL after payment
// Configure this URL in your ToyyibPay category/bill settings dashboard
export async function POST(req: NextRequest) {
  const form = await req.formData();

  const status    = form.get("status")?.toString();      // "1" = success, "0" = failed
  const orderId   = form.get("order_id")?.toString();
  const amount    = form.get("billpaymentAmount")?.toString();

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });

  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type:     "purchase",
      provider: "toyyibpay",
      order_id: orderId ?? "",
      amount:   amount ? (Number(amount) / 100).toFixed(2) : "",
      status:   status === "1" ? "success" : "failed",
    }),
  });

  return NextResponse.json({ success: true });
}

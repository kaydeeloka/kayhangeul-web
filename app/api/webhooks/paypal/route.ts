import { NextRequest, NextResponse } from "next/server";
import { sendPurchaseEmail } from "@/app/lib/sendPurchaseEmail";

// PayPal POSTs JSON events to this URL
// Configure this URL in PayPal Developer Dashboard → Webhooks
// Event to subscribe: PAYMENT.CAPTURE.COMPLETED
export async function POST(req: NextRequest) {
  const event = await req.json();

  if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
    return NextResponse.json({ ignored: true });
  }

  const resource   = event.resource ?? {};
  const orderId    = resource.id ?? "";
  const amount     = resource.amount?.value ?? "";
  const buyerEmail = resource.payer?.email_address ?? "";
  const buyerName  = resource.payer?.name?.given_name ?? "Pelanggan";

  const scriptUrl = process.env.GOOGLE_TRAVEL_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });

  await Promise.all([
    fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type:     "purchase",
        provider: "paypal",
        order_id: orderId,
        amount,
        status:   "success",
        email:    buyerEmail,
      }),
    }),
    buyerEmail ? sendPurchaseEmail(buyerEmail, buyerName) : Promise.resolve(),
  ]);

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { sendPurchaseEmail } from "@/app/lib/sendPurchaseEmail";

// Handles both PayPal IPN (form-encoded) and REST webhook (JSON)
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";

  // --- PayPal IPN ---
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    const params = new URLSearchParams(text);

    // Verify with PayPal
    const verifyRes = await fetch("https://ipnpb.paypal.com/cgi-bin/webscr", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `cmd=_notify-validate&${text}`,
    });
    const verifyText = await verifyRes.text();
    if (verifyText !== "VERIFIED") {
      return NextResponse.json({ error: "IPN not verified" }, { status: 400 });
    }

    const paymentStatus = params.get("payment_status");
    if (paymentStatus !== "Completed") {
      return NextResponse.json({ ignored: true });
    }

    const buyerEmail = params.get("payer_email")  ?? "";
    const buyerName  = params.get("first_name")   ?? "Pelanggan";
    const orderId    = params.get("txn_id")        ?? "";
    const amount     = params.get("mc_gross")      ?? "";

    const scriptUrl = process.env.GOOGLE_TRAVEL_SCRIPT_URL;
    if (scriptUrl) {
      await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "purchase", provider: "paypal",
          order_id: orderId, amount, status: "success", email: buyerEmail,
        }),
      });
    }

    if (buyerEmail) await sendPurchaseEmail(buyerEmail, buyerName, orderId);
    return NextResponse.json({ success: true });
  }

  // --- PayPal REST Webhook ---
  const event = await req.json();
  const eventType = event.event_type ?? "";

  if (eventType !== "PAYMENT.CAPTURE.COMPLETED" && eventType !== "CHECKOUT.ORDER.COMPLETED") {
    return NextResponse.json({ ignored: true });
  }

  const resource = event.resource ?? {};

  // PAYMENT.CAPTURE.COMPLETED — fires for payment links, no buyer email
  // CHECKOUT.ORDER.COMPLETED  — fires for checkout API, includes buyer email
  const orderId    = resource.id ?? "";
  const amount     = eventType === "CHECKOUT.ORDER.COMPLETED"
    ? resource.purchase_units?.[0]?.amount?.value ?? ""
    : resource.amount?.value ?? "";
  const buyerEmail = resource.payer?.email_address ?? "";
  const buyerName  = resource.payer?.name?.given_name ?? "Pelanggan";

  const scriptUrl = process.env.GOOGLE_TRAVEL_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });

  await Promise.all([
    fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "purchase", provider: "paypal",
        order_id: orderId, amount, status: "success", email: buyerEmail,
      }),
    }),
    buyerEmail ? sendPurchaseEmail(buyerEmail, buyerName, orderId) : Promise.resolve(),
  ]);

  return NextResponse.json({ success: true });
}

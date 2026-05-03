import { NextResponse } from "next/server";

export async function POST() {
  const secretKey    = process.env.TOYYIBPAY_SECRET_KEY   ?? "";
  const categoryCode = process.env.TOYYIBPAY_CATEGORY_CODE ?? "";
  const toyyibpayUrl = process.env.TOYYIBPAY_URL           ?? "https://toyyibpay.com";
  const returnUrl    = `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://kayhangeul.vercel.app"}/download?token=${process.env.DOWNLOAD_SECRET}`;
  const callbackUrl  = "https://kayhangeul.vercel.app/api/webhooks/toyyibpay";

  const params = new URLSearchParams({
    userSecretKey:          secretKey,
    categoryCode:           categoryCode,
    billName:               "KayHangeul Traveler Pack",
    billDescription:        "50 Frasa Korea Edisi Traveler - PDF Ebook",
    billPriceSetting:       "1",
    billPayorInfo:          "1",
    billAmount:             "1590",
    billReturnUrl:          returnUrl,
    billCallbackUrl:        callbackUrl,
    billExternalReferenceNo: `KH-${Date.now()}`,
    billChargeToCustomer:   "1",
  });

  let data: { BillCode: string }[];
  try {
    const res = await fetch(`${toyyibpayUrl}/index.php/api/createBill`, {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    params.toString(),
    });
    data = await res.json();
  } catch {
    return NextResponse.json({ error: "Failed to reach ToyyibPay" }, { status: 502 });
  }

  const billCode = data?.[0]?.BillCode;
  if (!billCode) {
    return NextResponse.json({ error: "Invalid response from ToyyibPay" }, { status: 500 });
  }

  return NextResponse.json({ url: `${toyyibpayUrl}/${billCode}` });
}

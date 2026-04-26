import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { amount, productName } = await req.json();

  const base = process.env.TOYYIBPAY_URL ?? "https://toyyibpay.com";

  const params = new URLSearchParams({
    userSecretKey:           process.env.TOYYIBPAY_SECRET_KEY!,
    categoryCode:            process.env.TOYYIBPAY_CATEGORY_CODE!,
    billName:                productName,
    billDescription:         productName,
    billPriceSetting:        "1",
    billPayorInfo:           "1",
    billAmount:              String(amount),
    billReturnUrl:           `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    billCallbackUrl:         `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
    billExternalReferenceNo: `ORDER-${Date.now()}`,
    billTo:                  "",
    billEmail:               "",
    billPhone:               "",
  });

  const res  = await fetch(`${base}/index.php/api/createBill`, {
    method: "POST",
    body:   params,
  });

  const data     = await res.json();
  const billCode = data[0]?.BillCode;

  if (!billCode) {
    return NextResponse.json({ error: "Failed to create bill." }, { status: 502 });
  }

  return NextResponse.json({ url: `${base}/${billCode}` });
}

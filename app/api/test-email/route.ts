import { NextResponse } from "next/server";
import { sendPurchaseEmail } from "@/app/lib/sendPurchaseEmail";

export async function GET() {
  try {
    await sendPurchaseEmail("nexanetraedu@gmail.com", "Kay");
    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

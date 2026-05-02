import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const scriptUrl = process.env.GOOGLE_CONTACT_SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "contact", name, email, subject, message }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to submit." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, rating, review, recaptchaToken } = await req.json();

  if (!name || !rating || !review) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (secretKey) {
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token missing." }, { status: 400 });
    }
    const verify = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const result = await verify.json();
    if (!result.success || result.score < 0.5) {
      return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 403 });
    }
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "review", name, rating, review }),
  });

  if (!res.ok) return NextResponse.json({ error: "Failed to submit." }, { status: 502 });

  return NextResponse.json({ success: true });
}

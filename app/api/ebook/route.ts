import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { readFile } from "fs/promises";
import { join } from "path";

export function verifyDownloadToken(orderId: string, sig: string): boolean {
  const secret = process.env.DOWNLOAD_SECRET ?? "";
  const expected = createHmac("sha256", secret).update(orderId).digest("hex");
  return sig === expected;
}

export function generateDownloadUrl(orderId: string): string {
  const secret = process.env.DOWNLOAD_SECRET ?? "";
  const sig = createHmac("sha256", secret).update(orderId).digest("hex");
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kayhangeul.vercel.app";
  return `${base}/download?order=${encodeURIComponent(orderId)}&sig=${sig}`;
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order") ?? "";
  const sig     = req.nextUrl.searchParams.get("sig")   ?? "";

  const secret = process.env.DOWNLOAD_SECRET ?? "";
  // Accept either: valid HMAC per-order token, or static secret token (ToyyibPay flow)
  const allowed =
    (orderId === "toyyibpay" && sig === secret) ||
    (!!orderId && orderId !== "toyyibpay" && verifyDownloadToken(orderId, sig));

  if (!allowed) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let buffer: Buffer;
  try {
    const filePath = join(process.cwd(), "private", "KayHangeul-Traveler-Pack.pdf");
    buffer = await readFile(filePath);
  } catch {
    return new NextResponse("Ebook file not found", { status: 500 });
  }

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"KayHangeul-Traveler-Pack.pdf\"",
      "Cache-Control": "private, no-store",
    },
  });
}

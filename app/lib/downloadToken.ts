import { createHmac } from "crypto";

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

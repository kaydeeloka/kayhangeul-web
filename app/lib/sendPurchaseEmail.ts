import nodemailer from "nodemailer";
import { generateDownloadUrl } from "@/app/api/ebook/route";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendPurchaseEmail(buyerEmail: string, buyerName: string, orderId: string) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;

  await transporter.sendMail({
    from: `"KayHangeul" <${process.env.GMAIL_USER}>`,
    to: buyerEmail,
    subject: "✅ Pembelian Berjaya — KayHangeul Traveler Pack",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <div style="background:#ed155d;padding:32px;text-align:center;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:28px;font-weight:900;letter-spacing:-1px">Terima Kasih, ${buyerName}!</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">Pembayaran anda telah berjaya diterima</p>
        </div>
        <div style="background:#fff8f9;padding:32px;border:1px solid #ffd6e0;border-top:none">
          <p style="font-size:15px;line-height:1.7;color:#444">
            E-book <strong>KayHangeul Traveler Pack</strong> anda sudah sedia untuk dimuat turun. Klik butang di bawah untuk akses:
          </p>
          <div style="text-align:center;margin:28px 0">
            <a href="${generateDownloadUrl(orderId)}"
               style="background:#ed155d;color:white;padding:16px 36px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;display:inline-block">
              Muat Turun Ebook →
            </a>
          </div>
          <p style="font-size:12px;color:#999;margin-top:24px;text-align:center">
            Ada masalah? E-mel kami di <a href="mailto:nexanetraedu@gmail.com" style="color:#ed155d">nexanetraedu@gmail.com</a>
          </p>
        </div>
        <div style="padding:16px;text-align:center;font-size:11px;color:#bbb">
          © 2026 KayHangeul · NexaNetra Ventures
        </div>
      </div>
    `,
  });
}

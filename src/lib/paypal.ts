import { countryName } from "./countryNames";
import { convertToMYR } from "./currency";
import type { PurchaseRow } from "./parsePurchasesFile";

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE ?? "https://api-m.paypal.com";
const MAX_WINDOW_DAYS = 31; // PayPal Transaction Search API hard limit per request

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret   = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) throw new Error("PayPal credentials not configured.");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error(`PayPal auth failed (${res.status}).`);

  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.value;
}

function toPayPalDate(date: string, endOfDay: boolean): string {
  return `${date}T${endOfDay ? "23:59:59" : "00:00:00"}+0800`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type PayPalTransaction = {
  transaction_info: {
    transaction_id: string;
    transaction_status: string;
    transaction_initiation_date: string;
    transaction_amount: { value: string; currency_code: string };
    fee_amount?: { value: string; currency_code: string };
  };
  payer_info?: {
    email_address?: string;
    payer_name?: { given_name?: string; surname?: string; alternate_full_name?: string };
    country_code?: string;
  };
};

async function fetchWindow(startDate: string, endDate: string, token: string): Promise<PayPalTransaction[]> {
  const results: PayPalTransaction[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const params = new URLSearchParams({
      start_date: toPayPalDate(startDate, false),
      end_date:   toPayPalDate(endDate, true),
      fields:     "transaction_info,payer_info",
      page_size:  "500",
      page:       String(page),
    });

    const res = await fetch(`${PAYPAL_API_BASE}/v1/reporting/transactions?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`PayPal transaction search failed (${res.status}): ${body.slice(0, 200)}`);
    }

    const data = await res.json();
    results.push(...(data.transaction_details ?? []));
    totalPages = data.total_pages ?? 1;
    page++;
  } while (page <= totalPages);

  return results;
}

export async function fetchPayPalPurchases(startDate: string, endDate: string): Promise<PurchaseRow[]> {
  const token = await getAccessToken();
  const rows: PurchaseRow[] = [];

  let windowStart = new Date(`${startDate}T00:00:00`);
  const rangeEnd   = new Date(`${endDate}T00:00:00`);

  while (windowStart <= rangeEnd) {
    const windowEnd = new Date(Math.min(addDays(windowStart, MAX_WINDOW_DAYS - 1).getTime(), rangeEnd.getTime()));

    const transactions = await fetchWindow(toDateOnly(windowStart), toDateOnly(windowEnd), token);

    for (const txn of transactions) {
      const info  = txn.transaction_info;
      if (info.transaction_status !== "S") continue; // S = Successful

      const payer = txn.payer_info ?? {};
      const rawBill = parseFloat(info.transaction_amount.value) || 0;
      const rawFees = Math.abs(parseFloat(info.fee_amount?.value ?? "0")) || 0;
      const currency = info.transaction_amount.currency_code || "MYR";

      // PayPal reports amounts in the transaction's original currency (often USD for
      // international buyers) — convert to MYR so totals stay consistent with ToyyibPay.
      const bill = await convertToMYR(rawBill, currency);
      const fees = await convertToMYR(rawFees, info.fee_amount?.currency_code || currency);

      const name  = [payer.payer_name?.given_name, payer.payer_name?.surname].filter(Boolean).join(" ")
        || payer.payer_name?.alternate_full_name || "";

      rows.push({
        timestamp:      info.transaction_initiation_date,
        provider:       "paypal",
        order_id:       info.transaction_id,
        bill:           bill.toFixed(2),
        fees:           fees.toFixed(2),
        net:            (bill - fees).toFixed(2),
        status:         "success",
        name,
        email:          payer.email_address ?? "",
        payment_method: "PayPal",
        country:        countryName(payer.country_code),
      });
    }

    windowStart = addDays(windowEnd, 1);
  }

  return rows;
}

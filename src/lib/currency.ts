const rateCache = new Map<string, { rate: number; fetchedAt: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour — exchange rates don't need to be fetched per-transaction

export async function getExchangeRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;

  const key = `${from}:${to}`;
  const cached = rateCache.get(key);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.rate;

  const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
  if (!res.ok) throw new Error(`Failed to fetch exchange rate ${from}->${to} (${res.status}).`);

  const data = await res.json();
  const rate = data.rates?.[to];
  if (typeof rate !== "number") throw new Error(`No exchange rate available for ${from}->${to}.`);

  rateCache.set(key, { rate, fetchedAt: Date.now() });
  return rate;
}

export async function convertToMYR(amount: number, currency: string): Promise<number> {
  if (currency === "MYR") return amount;
  const rate = await getExchangeRate(currency, "MYR");
  return amount * rate;
}

export async function gasGet<T = Record<string, unknown>>(action: string): Promise<T> {
  const scriptUrl = process.env.GOOGLE_TRAVEL_SCRIPT_URL;
  if (!scriptUrl) throw new Error("Server misconfiguration.");

  const res  = await fetch(`${scriptUrl}?action=${action}`, { cache: "no-store" });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function gasPost<T = Record<string, unknown>>(payload: Record<string, unknown>): Promise<T> {
  const scriptUrl = process.env.GOOGLE_TRAVEL_SCRIPT_URL;
  if (!scriptUrl) throw new Error("Server misconfiguration.");

  const res  = await fetch(scriptUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function redirectToPayment(amount: number, product: string) {
  const res = await fetch("/api/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, productName: product }),
  });

  if (!res.ok) {
    alert("Pembayaran gagal dimulakan. Sila cuba lagi.");
    return;
  }

  const { url } = await res.json();
  window.location.href = url;
}

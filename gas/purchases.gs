// ============================================================
//  Purchases router — action: purchase, purchases_bulk, purchase-count
// ============================================================

function routePurchases(action, p, body) {
  switch (action) {
    case "purchase":
      // Row shape: Timestamp, Provider, Order ID, Amount, Status, Name, Email, Payment Method
      getSheet("Purchases").appendRow([
        new Date(), body.provider, body.order_id, body.amount, body.status,
        body.name || "", body.email, body.payment_method || "",
      ]);
      return { success: true };

    case "purchases_bulk":
      return appendPurchasesBulk(body.rows || []);

    case "purchase-count": {
      const rows  = getSheet("Purchases").getDataRange().getValues().slice(1);
      const count = rows.filter(r => r[4] === "success").length;
      return { count };
    }

    default:
      return null;
  }
}

// rows: [{ timestamp, provider, order_id, amount, status, name, email, payment_method }]
function appendPurchasesBulk(rows) {
  const sheet    = getSheet("Purchases");
  const existing = sheet.getDataRange().getValues().slice(1);
  const existingOrderIds = new Set(existing.map(r => String(r[2])));

  const toAppend = [];
  let skipped = 0;

  rows.forEach(row => {
    const orderId = String(row.order_id || "");
    if (orderId && existingOrderIds.has(orderId)) {
      skipped++;
      return;
    }
    if (orderId) existingOrderIds.add(orderId);
    toAppend.push([
      row.timestamp ? new Date(row.timestamp) : new Date(),
      row.provider || "",
      orderId,
      row.amount || "",
      row.status || "",
      row.name || "",
      row.email || "",
      row.payment_method || "",
    ]);
  });

  if (toAppend.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, toAppend.length, 8).setValues(toAppend);
  }

  return { success: true, added: toAppend.length, skipped };
}

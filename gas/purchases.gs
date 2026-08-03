// ============================================================
//  Purchases router — action: purchase, purchases_bulk,
//  purchase-count, purchases-summary, purchases-list
//  Row shape: Timestamp, Provider, Order ID, Bill, Fees, Net, Status, Name, Email, Payment Method
// ============================================================

function routePurchases(action, p, body) {
  switch (action) {
    case "purchase":
      getSheet("Purchases").appendRow([
        new Date(), body.provider, body.order_id, body.bill || "", body.fees || "", body.net || "",
        body.status, body.name || "", body.email, body.payment_method || "",
      ]);
      return { success: true };

    case "purchases_bulk":
      return appendPurchasesBulk(body.rows || []);

    case "purchase-count": {
      const rows  = getSheet("Purchases").getDataRange().getValues().slice(1);
      const count = rows.filter(r => r[6] === "success").length;
      return { count };
    }

    case "purchases-summary": {
      const rows = getSheet("Purchases").getDataRange().getValues().slice(1)
        .filter(r => r[6] === "success");
      const totalBill = rows.reduce((sum, r) => sum + (Number(r[3]) || 0), 0);
      const totalFees = rows.reduce((sum, r) => sum + (Number(r[4]) || 0), 0);
      const totalNet  = rows.reduce((sum, r) => sum + (Number(r[5]) || 0), 0);
      return { count: rows.length, totalBill, totalFees, totalNet };
    }

    case "purchases-list": {
      const rows = getSheet("Purchases").getDataRange().getValues().slice(1);
      const purchases = rows.map(r => ({
        timestamp:      r[0] ? Utilities.formatDate(new Date(r[0]), "Asia/Kuala_Lumpur", "dd MMM yyyy HH:mm") : "",
        provider:       r[1],
        order_id:       r[2],
        bill:           Number(r[3]) || 0,
        fees:           Number(r[4]) || 0,
        net:            Number(r[5]) || 0,
        status:         r[6],
        name:           r[7],
        email:          r[8],
        payment_method: r[9],
      })).reverse();
      return { purchases };
    }

    default:
      return null;
  }
}

// rows: [{ timestamp, provider, order_id, bill, fees, net, status, name, email, payment_method }]
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
      row.bill || "",
      row.fees || "",
      row.net || "",
      row.status || "",
      row.name || "",
      row.email || "",
      row.payment_method || "",
    ]);
  });

  if (toAppend.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, toAppend.length, 10).setValues(toAppend);
  }

  return { success: true, added: toAppend.length, skipped };
}

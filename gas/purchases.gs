// ============================================================
//  Purchases router — action: purchase, purchases_bulk,
//  purchase-count, purchases-summary, purchases-monthly, purchases-list,
//  purchases-by-method, purchases-by-country
//  Row shape: Timestamp, Provider, Order ID, Bill, Fees, Net, Status, Name, Email, Payment Method, Country
// ============================================================

function routePurchases(action, p, body) {
  switch (action) {
    case "purchase":
      getSheet("Purchases").appendRow([
        new Date(), body.provider, body.order_id, body.bill || "", body.fees || "", body.net || "",
        body.status, body.name || "", body.email, body.payment_method || "", body.country || "",
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
      const rows = getSheet("Purchases").getDataRange().getValues().slice(1);
      const totalBill = rows.reduce((sum, r) => sum + (Number(r[3]) || 0), 0);
      const totalFees = rows.reduce((sum, r) => sum + (Number(r[4]) || 0), 0);
      const totalNet  = rows.reduce((sum, r) => sum + (Number(r[5]) || 0), 0);
      return { count: rows.length, totalBill, totalFees, totalNet };
    }

    case "purchases-monthly": {
      const rows = getSheet("Purchases").getDataRange().getValues().slice(1)
        .filter(r => r[0]);

      const buckets = {}; // "yyyy-MM" -> { count, bill, net }
      rows.forEach(r => {
        const key = Utilities.formatDate(new Date(r[0]), "Asia/Kuala_Lumpur", "yyyy-MM");
        if (!buckets[key]) buckets[key] = { count: 0, bill: 0, net: 0 };
        buckets[key].count += 1;
        buckets[key].bill  += Number(r[3]) || 0;
        buckets[key].net   += Number(r[5]) || 0;
      });

      // Last 6 months, oldest first, including months with zero sales.
      const months = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const d   = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = Utilities.formatDate(d, "Asia/Kuala_Lumpur", "yyyy-MM");
        const b   = buckets[key] || { count: 0, bill: 0, net: 0 };
        months.push({
          month: Utilities.formatDate(d, "Asia/Kuala_Lumpur", "MMM"),
          count: b.count,
          bill:  b.bill,
          net:   b.net,
        });
      }
      return { months };
    }

    case "purchases-by-method": {
      const rows = getSheet("Purchases").getDataRange().getValues().slice(1);
      const buckets = {}; // provider -> { count, total }
      rows.forEach(r => {
        const method = r[1] || "Unknown";
        if (!buckets[method]) buckets[method] = { count: 0, total: 0 };
        buckets[method].count += 1;
        buckets[method].total += Number(r[3]) || 0;
      });
      const methods = Object.keys(buckets)
        .map(method => ({ method, count: buckets[method].count, total: buckets[method].total }))
        .sort((a, b) => b.total - a.total);
      return { methods };
    }

    case "purchases-by-country": {
      const rows = getSheet("Purchases").getDataRange().getValues().slice(1);
      const buckets = {}; // country -> { count, total }
      rows.forEach(r => {
        const country = r[10] || "Unknown";
        if (!buckets[country]) buckets[country] = { count: 0, total: 0 };
        buckets[country].count += 1;
        buckets[country].total += Number(r[3]) || 0;
      });
      const countries = Object.keys(buckets)
        .map(country => ({ country, count: buckets[country].count, total: buckets[country].total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);
      return { countries };
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
        country:        r[10] || "",
      })).reverse();
      return { purchases };
    }

    default:
      return null;
  }
}

// rows: [{ timestamp, provider, order_id, bill, fees, net, status, name, email, payment_method, country }]
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
      row.country || "",
    ]);
  });

  if (toAppend.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, toAppend.length, 11).setValues(toAppend);
  }

  return { success: true, added: toAppend.length, skipped };
}

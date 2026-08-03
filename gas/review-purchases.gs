const SPREADSHEET_ID = "1HVuy-uBPzYq9qwsx0U50ZyIkw2BaSP9wV49j_FMGBdc";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    switch (data.type) {
      case "review":
        ss.getSheetByName("Reviews").appendRow([new Date(), data.name, data.rating, data.review, "pending"]);
        return json({ success: true });

      case "purchase":
        // Row shape: Timestamp, Provider, Order ID, Amount, Status, Name, Email, Payment Method
        ss.getSheetByName("Purchases").appendRow([
          new Date(), data.provider, data.order_id, data.amount, data.status,
          data.name || "", data.email, data.payment_method || "",
        ]);
        return json({ success: true });

      case "purchases_bulk":
        return json(appendPurchasesBulk(ss, data.rows || []));

      case "contact":
        // Row shape: Timestamp, Name, Email, Subject, Message
        ss.getSheetByName("Messages").appendRow([new Date(), data.name, data.email, data.subject, data.message]);
        return json({ success: true });

      default:
        return json({ error: "unknown type" });
    }
  } catch (err) {
    return json({ error: err.message });
  }
}

// rows: [{ timestamp, provider, order_id, amount, status, name, email, payment_method }]
function appendPurchasesBulk(ss, rows) {
  const sheet = ss.getSheetByName("Purchases");
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

function doGet(e) {
  try {
    const action = e.parameter.action;
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (action === "purchase-count") {
      const rows = ss.getSheetByName("Purchases").getDataRange().getValues().slice(1);
      const count = rows.filter(r => r[4] === "success").length;
      return json({ count });
    }

    if (action === "review-stats") {
      const rows = ss.getSheetByName("Reviews").getDataRange().getValues().slice(1);
      const approved = rows.filter(r => r[4] === "approved");
      const count = approved.length;
      const average = count === 0 ? 0
        : Math.round(approved.reduce((sum, r) => sum + Number(r[2]), 0) / count * 10) / 10;
      return json({ count, average });
    }

    if (action === "reviews") {
      const rows = ss.getSheetByName("Reviews").getDataRange().getValues().slice(1);
      const reviews = rows
        .filter(r => r[4] === "approved" && r[1] && r[3])
        .map(r => ({
          name:   r[1],
          rating: Number(r[2]),
          review: r[3],
          date:   r[0] ? Utilities.formatDate(new Date(r[0]), "Asia/Kuala_Lumpur", "dd MMM yyyy") : ""
        }));
      return json({ reviews });
    }

    return json({ error: "unknown action" });
  } catch (err) {
    return json({ error: err.message });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

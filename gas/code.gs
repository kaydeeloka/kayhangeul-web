// ============================================================
//  KayHangeul Traveler — API entry point
//  Sheet: Reviews / Purchases / Messages
//  Feature routers: reviews.gs, purchases.gs, contact.gs
// ============================================================

const SPREADSHEET_ID = "1HVuy-uBPzYq9qwsx0U50ZyIkw2BaSP9wV49j_FMGBdc";

function getSheet(name) {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
}

// Feature routers — each file owns its own routeXxx(action, p, body)
const FEATURE_ROUTERS = [
  routeReviews,
  routePurchases,
  routeContact,
];

function _dispatch(action, p, body) {
  for (const route of FEATURE_ROUTERS) {
    const r = route(action, p, body);
    if (r !== null) return r;
  }
  return null;
}

// ── GET dispatcher ────────────────────────────────────────────
function doGet(e) {
  const p      = (e && e.parameter) || {};
  const action = p.action || "";

  let result;
  try {
    result = _dispatch(action, p, null);
    if (result === null) result = { error: "unknown action" };
  } catch (err) {
    result = { error: err.message };
  }

  return json(result);
}

// ── POST dispatcher ───────────────────────────────────────────
function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ error: "Invalid JSON body." });
  }

  // Existing Next.js routes send `type`; keep `action` as an alias for parity with the router template.
  const action = payload.type || payload.action || "";

  let result;
  try {
    result = _dispatch(action, null, payload);
    if (result === null) result = { error: "Unknown action: " + action };
  } catch (err) {
    result = { error: err.message };
  }

  return json(result);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

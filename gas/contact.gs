// ============================================================
//  Contact router — action: contact
// ============================================================

function routeContact(action, p, body) {
  if (action !== "contact") return null;

  // Row shape: Timestamp, Name, Email, Subject, Message
  getSheet("Messages").appendRow([new Date(), body.name, body.email, body.subject, body.message]);
  return { success: true };
}

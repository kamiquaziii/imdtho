/**
 * imdtho — contact form backend (Google Apps Script → Google Sheet)
 * -----------------------------------------------------------------------------
 * Receives POSTs from assets/js/contact.js and appends one row per submission
 * to a Google Sheet. Free, no server to maintain.
 *
 * === SETUP (about 5 minutes) ===
 * 1. Create a new Google Sheet (sheets.new). Name it e.g. "imdtho — contact".
 * 2. In that Sheet: Extensions ▸ Apps Script. Delete the sample code and paste
 *    THIS ENTIRE FILE in. Save.
 * 3. Deploy: click "Deploy" ▸ "New deployment".
 *      - Type (gear icon):        Web app
 *      - Description:             imdtho contact
 *      - Execute as:              Me (your account)
 *      - Who has access:          Anyone
 *    Click "Deploy", authorize when prompted (it's your own script), and copy
 *    the "Web app URL" — it ends in "/exec".
 * 4. Paste that URL into CONFIG.endpoint in assets/js/contact.js. Done.
 *
 * To change where rows go, set SHEET_NAME below to a tab name in your Sheet.
 * The header row is created automatically on the first submission.
 */

var SHEET_NAME = ""; // "" = the first/active sheet tab; or set a tab name like "Submissions"
var HEADERS = ["Timestamp", "Name", "Email", "Who they are", "Message", "Source"];

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var sheet = SHEET_NAME
      ? SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      : SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.role || "",
      data.message || "",
      data.source || ""
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Lets you open the /exec URL in a browser to confirm the deployment is live.
function doGet() {
  return json({ ok: true, service: "imdtho contact", status: "ready" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

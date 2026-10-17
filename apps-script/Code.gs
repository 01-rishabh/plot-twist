/**
 * Plot Twist: saves landing-page form entries into this Google Sheet.
 *
 * Setup (once): Extensions > Apps Script, replace everything with this file, Save,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Full steps are in README.md.
 */

// Tab that receives the entries. It is created automatically if missing.
var SHEET_NAME = 'Responses';

// Optional: put an email address here to get an email for every new entry.
// Leave it empty ('') to turn notifications off.
var NOTIFY_EMAIL = '';

var MAX_FIELDS = 40;
var MAX_VALUE_LENGTH = 2000;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);

    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var data = body.data;
    if (!data || typeof data !== 'object') return json_({ ok: false, error: 'No data received' });

    var keys = Object.keys(data).slice(0, MAX_FIELDS);
    if (keys.length === 0) return json_({ ok: false, error: 'No fields received' });

    var sheet = getSheet_();
    var headers = ensureHeaders_(sheet, keys);
    var row = headers.map(function (header) {
      if (header === 'Submitted At') return new Date();
      return clean_(data[header]);
    });
    sheet.appendRow(row);
    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat('dd mmm yyyy, h:mm AM/PM');

    if (NOTIFY_EMAIL) notify_(keys, data);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the web app URL in a browser shows this, which confirms the deployment works.
function doGet() {
  return json_({ ok: true, message: 'Plot Twist form endpoint is running.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;
  // A brand-new spreadsheet has one empty "Sheet1": reuse it so the admin sees one tab.
  var sheets = ss.getSheets();
  if (sheets.length === 1 && sheets[0].getLastRow() === 0) return sheets[0].setName(SHEET_NAME);
  return ss.insertSheet(SHEET_NAME);
}

// Writes the header row on first use and adds a column for any new form field.
function ensureHeaders_(sheet, keys) {
  var lastCol = sheet.getLastColumn();
  // Columns are matched by header name, so the admin can add or reorder their own columns.
  var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String) : [];

  if (headers.join('') === '') headers = ['Submitted At'];
  var added = false;
  keys.forEach(function (key) {
    var name = String(key).slice(0, 100);
    if (headers.indexOf(name) === -1) {
      headers.push(name);
      added = true;
    }
  });

  if (added || lastCol === 0) {
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setValues([headers]).setFontWeight('bold').setBackground('#f4f4f5');
    sheet.setFrozenRows(1);
  }
  return headers;
}

// Stores everything exactly as typed. The leading ' (hidden in the sheet) stops values
// like "=SUM()" from running as formulas and keeps "0982..." phone numbers intact.
function clean_(value) {
  if (value === undefined || value === null || value === '') return '';
  return "'" + String(value).slice(0, MAX_VALUE_LENGTH);
}

function notify_(keys, data) {
  var lines = keys.map(function (key) { return key + ': ' + String(data[key] == null ? '' : data[key]); });
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New Plot Twist entry',
    body: lines.join('\n') + '\n\nOpen the sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

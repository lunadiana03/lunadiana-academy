/**
 * ルナディアーナ学園 公式サイト用 GAS
 * 新しいスプレッドシートの「拡張機能 → Apps Script」にこのコードを丸ごと貼り付けて、
 * 「デプロイ → 新しいデプロイ → ウェブアプリ（実行ユーザー：自分 / アクセス：全員）」で公開してください。
 * シートは初回アクセス時に自動で作られます。
 * 管理パスワードは「設定」シートの adminPassword で変えてください（changeme のままだとログインできません）。
 */

const SHEET_CONTENT = 'コンテンツ';
const SHEET_REQUEST = '資料請求';
const SHEET_SETTING = '設定';
const CONTENT_KEYS = ['site', 'home', 'news', 'about', 'courses', 'life', 'career', 'admission', 'request'];
const CHUNK = 40000;          // 1セルに入れる文字数（セルの上限は5万字）
const MAX_CONTENT = 400000;   // 1項目の最大文字数
const REQUEST_HOURLY_MAX = 60; // 資料請求は全体で1時間にこの件数まで

// ---------- 入口 ----------
function doGet(e) {
  const p = (e && e.parameter) || {};
  return respond_(handle_({ action: p.action || 'get' }), p.callback);
}
function doPost(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { return respond_({ error: '送信データが読めませんでした' }); }
  return respond_(handle_(body));
}
function respond_(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback && /^[A-Za-z_$][\w$.]{0,60}$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function handle_(b) {
  try {
    setup_();
    switch (b.action) {
      case 'get': return { ok: true, content: readContent_() };
      case 'addRequest': return withLock_(() => addRequest_(b));
      case 'checkKey': return auth_(b.password) || { ok: true };
      case 'save': return auth_(b.password) || withLock_(() => saveContent_(b.key, b.value));
      case 'listRequests': return auth_(b.password) || { ok: true, requests: listRequests_() };
      case 'deleteRequest': return auth_(b.password) || withLock_(() => deleteRequest_(b.id));
    }
    return { error: '不明な操作です' };
  } catch (err) {
    return { error: 'エラー：' + (err && err.message ? err.message : err) };
  }
}

// ---------- 準備 ----------
function setup_() {
  const ss = SpreadsheetApp.getActive();
  sheet_(ss, SHEET_CONTENT, ['key', 'updatedAt', 'data']);
  sheet_(ss, SHEET_REQUEST, ['受付日時', 'ID', 'お名前', '気になる組', '連絡先', 'ひとこと']);
  const st = sheet_(ss, SHEET_SETTING, ['項目', '値', 'メモ']);
  if (!getSetting_('adminPassword', st)) st.appendRow(['adminPassword', 'changeme', '管理画面のパスワード（必ず変えてください）']);
}
function sheet_(ss, name, header) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}
function getSetting_(key, sh) {
  sh = sh || SpreadsheetApp.getActive().getSheetByName(SHEET_SETTING);
  const last = sh.getLastRow();
  if (last < 2) return '';
  const rows = sh.getRange(2, 1, last - 1, 2).getValues();
  for (const r of rows) if (String(r[0]).trim() === key) return String(r[1]);
  return '';
}
function withLock_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return { error: '混み合っています。少し待ってからもう一度お試しください' };
  try { return fn(); } finally { lock.releaseLock(); }
}

// ---------- 管理者の確認（間違いが続いたら一時的に止める） ----------
function auth_(password) {
  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('authFails') || 0);
  if (fails >= 10) return { error: 'パスワードの間違いが続いたため、10分ほど待ってからお試しください' };
  const real = getSetting_('adminPassword');
  if (!real || real === 'changeme') return { error: 'スプレッドシートの「設定」シートで adminPassword を changeme 以外に変えてください' };
  if (String(password || '') !== real) {
    cache.put('authFails', String(fails + 1), 600);
    return { error: 'パスワードが違います' };
  }
  return null;
}

// ---------- 文章 ----------
function readContent_() {
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_CONTENT);
  const last = sh.getLastRow();
  const out = {};
  if (last < 2) return out;
  const width = Math.max(3, sh.getLastColumn());
  const rows = sh.getRange(2, 1, last - 1, width).getValues();
  rows.forEach(r => {
    const key = String(r[0]);
    if (CONTENT_KEYS.indexOf(key) < 0) return;
    const json = r.slice(2).map(String).join('');
    if (!json) return;
    try { out[key] = JSON.parse(json); } catch (err) {}
  });
  return out;
}
function saveContent_(key, value) {
  if (CONTENT_KEYS.indexOf(key) < 0) return { error: '保存できない項目です' };
  if (value === null || typeof value !== 'object') return { error: '内容が正しくありません' };
  const json = JSON.stringify(value);
  if (json.length > MAX_CONTENT) return { error: '文章が長すぎます' };
  const chunks = [];
  for (let i = 0; i < json.length; i += CHUNK) chunks.push(json.slice(i, i + CHUNK));
  if (!chunks.length) chunks.push('');
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_CONTENT);
  const last = sh.getLastRow();
  let row = 0;
  if (last >= 2) {
    const keys = sh.getRange(2, 1, last - 1, 1).getValues();
    for (let i = 0; i < keys.length; i++) if (String(keys[i][0]) === key) { row = i + 2; break; }
  }
  if (!row) row = last + 1;
  const width = Math.max(sh.getLastColumn(), 2 + chunks.length);
  const line = [key, new Date()].concat(chunks);
  while (line.length < width) line.push('');
  if (sh.getMaxColumns() < width) sh.insertColumnsAfter(sh.getMaxColumns(), width - sh.getMaxColumns());
  sh.getRange(row, 3, 1, width - 2).setNumberFormat('@');
  sh.getRange(row, 1, 1, width).setValues([line]);
  return { ok: true };
}

// ---------- 資料請求 ----------
function safe_(v, max) {
  let s = String(v == null ? '' : v).slice(0, max || 200);
  if (/^[=+\-@]/.test(s)) s = "'" + s; // 数式として読まれないように
  return s;
}
function addRequest_(b) {
  const name = String(b.name || '').trim(), contact = String(b.contact || '').trim();
  if (!name || !contact) return { error: 'お名前とご連絡先を入力してください' };
  const cache = CacheService.getScriptCache();
  const n = Number(cache.get('reqCount') || 0);
  if (n >= REQUEST_HOURLY_MAX) return { error: 'ただいま受付が混み合っています。時間をおいてお試しください' };
  cache.put('reqCount', String(n + 1), 3600);
  const id = 'r' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
  SpreadsheetApp.getActive().getSheetByName(SHEET_REQUEST)
    .appendRow([new Date(), id, safe_(name, 40), safe_(b.kumi, 20), safe_(contact, 80), safe_(b.message, 1000)]);
  return { ok: true };
}
function listRequests_() {
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_REQUEST);
  const last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, 6).getValues()
    .map(r => ({ at: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), id: String(r[1]), name: String(r[2]), kumi: String(r[3]), contact: String(r[4]), message: String(r[5]) }))
    .reverse();
}
function deleteRequest_(id) {
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_REQUEST);
  const last = sh.getLastRow();
  if (last < 2) return { error: '見つかりませんでした' };
  const ids = sh.getRange(2, 2, last - 1, 1).getValues();
  for (let i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === String(id)) { sh.deleteRow(i + 2); return { ok: true }; }
  }
  return { error: '見つかりませんでした' };
}

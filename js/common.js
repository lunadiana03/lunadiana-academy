/* ルナディアーナ学園 公式サイト 共通スクリプト
 * ・ヘッダー / 右の縦レール / メニュー / フッターを各ページに描く
 * ・文章は DEFAULTS を初期値に、スプレッドシート（GAS）に保存された内容で上書きして表示する
 */

// GASのウェブアプリURL（空のあいだは「お試しモード」：このブラウザの中だけに保存されます）
const API_URL = '';

const KUMI = [
  { name: '花の歌組🌸', emo: '🌸', en: 'VOCAL', stat: 'Vo', color: '#e8618c' },
  { name: '鳥の劇組🕊‎', emo: '🕊', en: 'PLAY', stat: 'Pl', color: '#e0a21a' },
  { name: '風の舞組🍃', emo: '🍃', en: 'DANCE', stat: 'Da', color: '#2f9e5b' },
  { name: '月の美組🌙', emo: '🌙', en: 'VISUAL', stat: 'Vi', color: '#7b5fe0' }
];

const PAGES = [
  { id: 'about', file: 'about.html', ja: '学園紹介', en: 'ABOUT', nav: true },
  { id: 'courses', file: 'courses.html', ja: 'コース紹介', en: 'COURSE', nav: true },
  { id: 'life', file: 'life.html', ja: '学園生活', en: 'CAMPUS LIFE', nav: true },
  { id: 'career', file: 'career.html', ja: '進路実績', en: 'CAREER', nav: true },
  { id: 'admission', file: 'admission.html', ja: '入学案内', en: 'ADMISSION', nav: true },
  { id: 'news', file: 'news.html', ja: 'お知らせ', en: 'NEWS' },
  { id: 'request', file: 'request.html', ja: '資料請求', en: 'REQUEST' }
];

// ---------- 初期の文章（管理画面で書き換えると、こちらは使われなくなります） ----------
const DEFAULTS = {
  site: {
    name: 'ルナディアーナ学園',
    kicker: '芸能育成学校',
    en: 'LUNADIANA ACADEMY',
    heroSub: 'ENTERTAINMENT TRAINING SCHOOL',
    motto: '星々よ、大志を抱け',
    marshmallowUrl: '',
    notebookUrl: 'https://lunadiana03.github.io/LunaDianaSchool/',
    copyright: '© LUNADIANA ACADEMY'
  },
  home: {
    introTitle: '月の光のもとで、\nまだ見ぬ一番星へ。',
    introText: 'ルナディアーナ学園は、アイドル・俳優・ダンサー・モデルなど\n「ステージに立つ人」を育てる芸能育成学校です。\n\n歌・お芝居・ダンス・ビジュアル。\nそれぞれの組で自分の輝きを見つけ、仲間と磨き合いながら\n世界でひとつだけの星を目指します。',
    linksTitle: 'ルナディアーナ学園を知る'
  },
  news: [
    { id: 'n3', date: '2026-10-12', cat: 'お知らせ', title: '公式サイトを公開しました', body: 'ルナディアーナ学園の公式サイトを公開しました。\n学園のこと、4つの組のこと、毎日の学園生活などをご紹介していきます。どうぞよろしくお願いいたします。' },
    { id: 'n2', date: '2026-10-01', cat: '入学', title: '新入生の募集を受け付けています', body: '現在、新入生を随時募集しています。\n募集要項は「入学案内」ページをご覧ください。入学願書はレッスン手帳から提出できます。' },
    { id: 'n1', date: '2026-09-20', cat: '学園生活', title: 'レッスン手帳がリニューアルしました', body: '毎日のレッスン記録をつける「レッスン手帳」がリニューアルしました。\n組ごとのランキングやカレンダーも使えます。' }
  ],
  about: {
    philosophyLead: '一人ひとりの中にある光を信じ、\n夢を「叶える力」を育てる。',
    principles: [
      { title: '自分だけの輝きを', text: '誰かの真似ではなく、あなたにしか出せない色を見つけます。' },
      { title: '仲間と高め合う', text: '同じ夢を持つ仲間と、支え合い、競い合いながら成長します。' },
      { title: '感謝を力に', text: 'ステージを支えるすべての人とファンへの感謝を忘れません。' }
    ],
    principalTitle: '学園長',
    principalName: '',
    message: 'ルナディアーナ学園へようこそ。\n\n夜空の星は、ひとつとして同じ光り方をしていません。\nこの学園に集うみなさんも、きっと同じです。\n\n歌うこと、演じること、踊ること、魅せること。\n得意なことも、まだ自信がないことも、すべてがあなたの輝きの種です。\n\n「星々よ、大志を抱け」。\nこの言葉を胸に、大きな夢へ一歩ずつ進んでいきましょう。',
    emblemText: '三日月と星は「夜空を照らす存在になる」という願いを、\n四つの青い花は、学園の四つの組を表しています。',
    flowers: [
      { title: '花の歌組', text: '歌声で人の心に花を咲かせる。' },
      { title: '鳥の劇組', text: '鳥のように自由に、役を生きる。' },
      { title: '風の舞組', text: '風のようにしなやかに、舞台を駆ける。' },
      { title: '月の美組', text: '月のように気高く、美しさを磨く。' }
    ],
    history: [
      { t: '創立', title: 'ルナディアーナ学園 開校', text: '芸能育成学校として開校。' },
      { t: '—', title: '4つの組を設置', text: '花の歌組・鳥の劇組・風の舞組・月の美組がそろう。' },
      { t: '—', title: 'レッスン手帳 運用開始', text: '毎日のレッスン記録を全校でつけはじめる。' }
    ]
  },
  courses: {
    lead: '入学すると、4つの組のどれかに所属します。\n組ごとに伸ばす力は違いますが、レッスンは全員で受けられます。',
    kumi: [
      { catch: '歌声で、心に花を。', text: '歌うことが大好きな人のための組。発声や音感をきたえ、聴く人の心に届く歌を目指します。', points: 'ボーカルが伸びやすい\n音感レッスンで表現力を磨く\nライブでのソロ・ハモリに挑戦' },
      { catch: '舞台の上で、自由に羽ばたく。', text: 'お芝居が得意な人のための組。役になりきる力と、見る人を惹きつけるアピール力を伸ばします。', points: 'アピールが伸びやすい\n女優レッスン・モデルレッスンで魅せ方を学ぶ\n舞台やドラマ出演を目指す' },
      { catch: '風のように、しなやかに。', text: '踊ることが大好きな人のための組。体づくりからはじめ、ステージを大きく使うダンスを身につけます。', points: 'ダンスが伸びやすい\n筋トレ・トランポリンで体幹をきたえる\nダンスパフォーマンスで魅せる' },
      { catch: '月の光のように、気高く美しく。', text: '美しさを磨く人のための組。立ち姿・表情・ファッションまで、トータルのビジュアルを高めます。', points: 'ビジュアルが伸びやすい\nモデルレッスンで立ち姿と表情を学ぶ\n撮影やランウェイを目指す' }
    ],
    lessonsLead: 'どの組の生徒も受けられる、学園のレッスンです。\n毎日の記録は「レッスン手帳」につけます。',
    lessons: [
      { icon: 'directions_run', title: 'ランニング', text: '基礎体力をつける毎日の基本。' },
      { icon: 'landscape', title: '崖登り', text: '学園名物。高く登るほど大きく成長できる。' },
      { icon: 'fitness_center', title: '筋トレ', text: 'ステージで負けない体をつくる。' },
      { icon: 'sports_gymnastics', title: 'トランポリン', text: '体幹とバランス感覚をきたえる。' },
      { icon: 'piano', title: '音感レッスン', text: '正しい音程とリズムを身につける。' },
      { icon: 'music_note', title: 'ダンスレッスン', text: '振り付けを覚え、表現として踊る。' },
      { icon: 'styler', title: 'モデルレッスン', text: 'ウォーキングとポージングを学ぶ。' },
      { icon: 'theater_comedy', title: '女優レッスン', text: 'せりふと表情で役を生きる。' }
    ]
  },
  life: {
    lead: 'レッスン、仲間との時間、ステージ。\nルナディアーナ学園の毎日をご紹介します。',
    day: [
      { t: '7:00', title: '朝のランニング', text: '学園のまわりを走って、一日をスタート。' },
      { t: '9:00', title: '午前のレッスン', text: '組ごとの専門レッスン。' },
      { t: '12:30', title: 'お昼休み', text: 'カフェテリアで仲間とランチ。' },
      { t: '14:00', title: '午後のレッスン', text: '全員参加の合同レッスンや自主練習。' },
      { t: '18:00', title: '放課後', text: 'レッスン手帳に今日の記録をつけて、寮でゆっくり。' }
    ],
    events: [
      { t: '4月', title: '入学式・組分け', text: '新入生が4つの組に分かれます。' },
      { t: '6月', title: '組対抗レッスン週間', text: 'レッスン手帳のランキングで組ごとに競います。' },
      { t: '8月', title: '夏合宿', text: '崖登りに挑む、学園伝統の合宿。' },
      { t: '10月', title: 'ルナディアーナ祭', text: '一年でいちばん大きな学園祭ライブ。' },
      { t: '3月', title: '卒業ステージ', text: '卒業生が最後のステージに立ちます。' }
    ],
    notebookTitle: 'レッスン手帳',
    notebookText: '毎日のレッスンを記録する、生徒のための手帳です。\nレッスンの成果や組のランキング、カレンダーを確認できます。'
  },
  career: {
    lead: 'ルナディアーナ学園の卒業生・在校生の活躍をご紹介します。',
    stats: [
      { num: '—', label: 'デビュー' },
      { num: '—', label: 'ステージ出演' },
      { num: '—', label: '在校生' }
    ],
    items: []
  },
  admission: {
    lead: 'ルナディアーナ学園では、夢に向かってがんばるあなたを待っています。',
    table: [
      { k: '募集する人', v: 'アイドル・俳優・ダンサー・モデルなど、芸能の道を目指す人' },
      { k: '所属', v: '花の歌組 / 鳥の劇組 / 風の舞組 / 月の美組\n（入学願書で希望の組を選べます）' },
      { k: '募集期間', v: '随時' },
      { k: '出願方法', v: 'レッスン手帳の「入学願書」から提出してください' },
      { k: '選考', v: '願書の内容をもとに、学園で確認します' }
    ],
    steps: [
      { title: '資料請求', text: 'まずは学園のことを知ってください。' },
      { title: '入学願書の提出', text: 'レッスン手帳から\n願書を送ります。' },
      { title: '組の決定', text: '希望をもとに\n所属する組が決まります。' },
      { title: '入学', text: 'レッスン手帳で\n毎日のレッスンがはじまります。' }
    ],
    note: 'わからないことがあれば、お問い合わせ（マシュマロ）からお気軽にどうぞ。'
  },
  request: {
    lead: '学園案内の資料をご希望の方は、こちらからお申し込みください。',
    done: 'お申し込みありがとうございました。\n学園からのご連絡をお待ちください。'
  }
};

// 管理画面で使う「編集できる項目」の一覧
const SCHEMA = {
  site: { label: 'サイト全体', fields: [
    { k: 'name', label: '学園名' }, { k: 'kicker', label: '学園名の上の小さい文字' }, { k: 'en', label: '英語の学園名' },
    { k: 'heroSub', label: 'トップの大きな文字の下の英語' }, { k: 'motto', label: '校訓' },
    { k: 'marshmallowUrl', label: 'お問い合わせ（マシュマロ）のURL', type: 'url' },
    { k: 'notebookUrl', label: 'レッスン手帳のURL', type: 'url' }, { k: 'copyright', label: 'フッターの著作権表示' }
  ] },
  news: { label: 'お知らせ', list: true, itemLabel: 'お知らせ', fields: [
    { k: 'date', label: '日付', type: 'date' }, { k: 'cat', label: 'カテゴリ' }, { k: 'title', label: 'タイトル' }, { k: 'body', label: '本文', type: 'textarea' }
  ] },
  home: { label: 'トップ', fields: [
    { k: 'introTitle', label: '紹介の見出し', type: 'textarea' }, { k: 'introText', label: '紹介の文章', type: 'textarea' }, { k: 'linksTitle', label: 'リンク欄の見出し' }
  ] },
  about: { label: '学園紹介', fields: [
    { k: 'philosophyLead', label: '教育理念（ひとこと）', type: 'textarea' },
    { k: 'principles', label: '教育理念の3つの柱', type: 'list', itemLabel: '柱', fields: [{ k: 'title', label: '見出し' }, { k: 'text', label: '説明', type: 'textarea' }] },
    { k: 'principalTitle', label: '肩書き' }, { k: 'principalName', label: '学園長の名前' },
    { k: 'message', label: '学園長メッセージ', type: 'textarea' },
    { k: 'emblemText', label: '校章の説明', type: 'textarea' },
    { k: 'flowers', label: '四つの花', type: 'list', itemLabel: '花', fields: [{ k: 'title', label: '見出し' }, { k: 'text', label: '説明', type: 'textarea' }] },
    { k: 'history', label: '沿革', type: 'list', itemLabel: '出来事', fields: [{ k: 't', label: '時期' }, { k: 'title', label: '見出し' }, { k: 'text', label: '説明', type: 'textarea' }] }
  ] },
  courses: { label: 'コース紹介', fields: [
    { k: 'lead', label: 'はじめの文章', type: 'textarea' },
    { k: 'kumi', label: '4つの組（順番：花の歌組・鳥の劇組・風の舞組・月の美組）', type: 'list', fixed: 4, itemLabel: '組', fields: [{ k: 'catch', label: 'キャッチコピー' }, { k: 'text', label: '説明', type: 'textarea' }, { k: 'points', label: '特徴（1行に1つ）', type: 'textarea' }] },
    { k: 'lessonsLead', label: 'レッスン紹介の文章', type: 'textarea' },
    { k: 'lessons', label: 'レッスン', type: 'list', itemLabel: 'レッスン', fields: [{ k: 'icon', label: 'アイコン名（Material Symbols）' }, { k: 'title', label: '名前' }, { k: 'text', label: '説明', type: 'textarea' }] }
  ] },
  life: { label: '学園生活', fields: [
    { k: 'lead', label: 'はじめの文章', type: 'textarea' },
    { k: 'day', label: '1日の流れ', type: 'list', itemLabel: '時間', fields: [{ k: 't', label: '時刻' }, { k: 'title', label: '見出し' }, { k: 'text', label: '説明', type: 'textarea' }] },
    { k: 'events', label: '年間行事', type: 'list', itemLabel: '行事', fields: [{ k: 't', label: '月' }, { k: 'title', label: '行事名' }, { k: 'text', label: '説明', type: 'textarea' }] },
    { k: 'notebookTitle', label: 'レッスン手帳の見出し' }, { k: 'notebookText', label: 'レッスン手帳の説明', type: 'textarea' }
  ] },
  career: { label: '進路実績', fields: [
    { k: 'lead', label: 'はじめの文章', type: 'textarea' },
    { k: 'stats', label: '数字の帯（3つ）', type: 'list', fixed: 3, itemLabel: '数字', fields: [{ k: 'num', label: '数字' }, { k: 'label', label: 'ラベル' }] },
    { k: 'items', label: '実績', type: 'list', itemLabel: '実績', fields: [{ k: 'year', label: '年・時期' }, { k: 'title', label: '内容（例：○○でデビュー）' }, { k: 'who', label: '名前・組' }, { k: 'text', label: 'ひとこと', type: 'textarea' }] }
  ] },
  admission: { label: '入学案内', fields: [
    { k: 'lead', label: 'はじめの文章', type: 'textarea' },
    { k: 'table', label: '募集要項', type: 'list', itemLabel: '項目', fields: [{ k: 'k', label: '項目名' }, { k: 'v', label: '内容', type: 'textarea' }] },
    { k: 'steps', label: '入学までの流れ', type: 'list', itemLabel: 'ステップ', fields: [{ k: 'title', label: '見出し' }, { k: 'text', label: '説明', type: 'textarea' }] },
    { k: 'note', label: 'さいごのひとこと', type: 'textarea' }
  ] },
  request: { label: '資料請求', fields: [
    { k: 'lead', label: 'フォームの上の文章', type: 'textarea' }, { k: 'done', label: '送信後のメッセージ', type: 'textarea' }
  ] }
};

// ---------- 小さな道具 ----------
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function mi(name) { return `<span class="mi">${esc(name)}</span>`; }
function star() { return '<i class="star"></i>'; }
function fmtDate(d) { return esc(String(d || '').replace(/-/g, '.')); }
function safeUrl(u) { return /^https?:\/\//i.test(String(u || '')) ? String(u) : ''; }
function toast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .5s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 500); }, 2600);
}
function secHead(en, ja) { return `<div class="sec-head reveal"><span class="en">${esc(en)}</span><h2>${esc(ja)}</h2><div class="orn">${star()}</div></div>`; }

// ---------- 通信（API_URLが空ならブラウザ内のお試し保存） ----------
const DEMO_KEY = 'lda_demo_db';
function demoDb() { try { return JSON.parse(localStorage.getItem(DEMO_KEY)) || { content: {}, requests: [] }; } catch (e) { return { content: {}, requests: [] }; } }
function demoSave(db) { try { localStorage.setItem(DEMO_KEY, JSON.stringify(db)); } catch (e) {} }
function demoApi(body) {
  const db = demoDb();
  const authed = body.password === 'admin';
  switch (body.action) {
    case 'get': return { ok: true, content: db.content };
    case 'addRequest': db.requests.unshift({ id: 'r' + Date.now(), at: new Date().toISOString(), name: body.name, kumi: body.kumi, contact: body.contact, message: body.message }); demoSave(db); return { ok: true };
    case 'checkKey': return authed ? { ok: true } : { error: 'パスワードが違います' };
    case 'save': if (!authed) return { error: 'パスワードが違います' }; db.content[body.key] = body.value; demoSave(db); return { ok: true };
    case 'listRequests': return authed ? { ok: true, requests: db.requests } : { error: 'パスワードが違います' };
    case 'deleteRequest': if (!authed) return { error: 'パスワードが違います' }; db.requests = db.requests.filter(r => r.id !== body.id); demoSave(db); return { ok: true };
  }
  return { error: '不明な操作です' };
}
function api(action, payload) {
  const body = Object.assign({ action }, payload || {});
  if (!API_URL) return new Promise(res => setTimeout(() => res(demoApi(JSON.parse(JSON.stringify(body)))), 250));
  return fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body) })
    .then(r => r.json())
    .catch(() => ({ error: '通信できませんでした。時間をおいてもう一度お試しください' }));
}

// ---------- 文章の読み込み ----------
const CACHE_KEY = 'lda_content_cache';
let C = mergeContent({});
function mergeContent(remote) {
  const out = {};
  Object.keys(DEFAULTS).forEach(k => {
    const d = DEFAULTS[k], r = remote ? remote[k] : undefined;
    if (Array.isArray(d)) out[k] = Array.isArray(r) ? r : d;
    else out[k] = Object.assign({}, d, (r && typeof r === 'object' && !Array.isArray(r)) ? r : {});
  });
  return out;
}
function loadContent(onUpdate) {
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)); } catch (e) {}
  if (cached) C = mergeContent(cached);
  api('get').then(res => {
    if (!res || !res.ok) return;
    const s = JSON.stringify(res.content || {});
    try { localStorage.setItem(CACHE_KEY, s); } catch (e) {}
    if (s !== JSON.stringify(cached || {})) { C = mergeContent(res.content || {}); onUpdate(); }
  });
}

// ---------- 共通の枠 ----------
function openContact(e) {
  if (e) e.preventDefault();
  const url = safeUrl(C.site.marshmallowUrl);
  if (url) window.open(url, '_blank', 'noopener');
  else toast('お問い合わせは準備中です');
}
function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function renderShell(page) {
  const s = C.site;
  const header = document.getElementById('site-header') || document.body.insertBefore(Object.assign(document.createElement('header'), { id: 'site-header', className: 'site-header' }), document.body.firstChild);
  header.innerHTML = `
    <a class="brand" href="index.html"><img src="img/emblem.png" alt=""><span><small>${esc(s.kicker)}</small><b>${esc(s.name)}</b></span></a>
    <nav class="gnav">${PAGES.filter(p => p.nav).map(p => `<a href="${p.file}"${p.id === page ? ' class="on"' : ''}>${esc(p.ja)}</a>`).join('')}</nav>`;

  let rail = document.querySelector('.rail');
  if (!rail) { rail = document.createElement('aside'); rail.className = 'rail'; document.body.appendChild(rail); }
  rail.innerHTML = `
    <button class="menu-btn" type="button" aria-expanded="false" aria-label="メニュー" onclick="toggleMenu()"><span class="bars"><i></i><i></i><i></i></span><span class="l">MENU</span></button>
    <hr>
    <a href="request.html">${mi('description')}資料請求</a>
    <a href="#" onclick="openContact(event)">${mi('mail')}お問い合わせ</a>
    <div class="tail">${star()}</div>`;

  let menu = document.querySelector('.menu');
  if (!menu) { menu = document.createElement('div'); menu.className = 'menu'; document.body.appendChild(menu); }
  const items = [{ file: 'index.html', ja: 'トップ', en: 'TOP' }].concat(PAGES);
  menu.innerHTML = `<nav class="menu-list">
    ${items.map((p, i) => `<a href="${p.file}" style="transition-delay:${.05 + i * .04}s"><b>${esc(p.ja)}</b><span>${esc(p.en)}</span></a>`).join('')}
    <a href="#" onclick="openContact(event)" style="transition-delay:${.05 + items.length * .04}s"><b>お問い合わせ</b><span>CONTACT</span></a>
    ${safeUrl(s.notebookUrl) ? `<a href="${esc(safeUrl(s.notebookUrl))}" target="_blank" rel="noopener" style="transition-delay:${.09 + items.length * .04}s"><b>レッスン手帳</b><span>LESSON NOTE</span></a>` : ''}
  </nav>`;

  let footer = document.querySelector('.site-footer');
  if (!footer) { footer = document.createElement('footer'); footer.className = 'site-footer'; document.body.appendChild(footer); }
  footer.innerHTML = `
    <img src="img/emblem.png" alt="">
    <div class="nm">${esc(s.name)}</div><div class="en">${esc(s.en)}</div>
    <nav>${items.map(p => `<a href="${p.file}">${esc(p.ja)}</a>`).join('')}<a href="#" onclick="openContact(event)">お問い合わせ</a></nav>
    <small>${esc(s.copyright)}</small>
    <a class="adm" href="admin.html">管理</a>`;
}
function pageHero(page) {
  const p = PAGES.find(x => x.id === page);
  return `<section class="page-hero"><span class="en">${esc(p.en)}</span><h1>${esc(p.ja)}</h1></section>
    <div class="wrap crumb"><a href="index.html">トップ</a><span class="sep">/</span>${esc(p.ja)}</div>`;
}

// ---------- 各ページの中身 ----------
function newsSorted() { return (C.news || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date))); }
function newsItems(list) {
  if (!list.length) return '<p class="center" style="color:var(--sub)">お知らせはまだありません</p>';
  return `<ul class="news-list reveal">${list.map(n => `<li><a href="news.html?id=${encodeURIComponent(n.id)}"><time>${fmtDate(n.date)}</time><span class="cat">${esc(n.cat || 'お知らせ')}</span><span class="ttl">${esc(n.title)}</span>${mi('chevron_right')}</a></li>`).join('')}</ul>`;
}
function kumiCard(i, full) {
  const k = KUMI[i], d = (C.courses.kumi || [])[i] || {};
  const pts = String(d.points || '').split('\n').map(x => x.trim()).filter(Boolean);
  return `<article class="card kumi reveal" style="--kc:${k.color}">
    <div class="top"><div class="emo">${k.emo}</div><h3>${esc(k.name.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{200E}]/gu, ''))}</h3><div class="en">${k.en}</div><span class="stat">${k.stat}</span></div>
    <div class="body"><p class="serif" style="color:var(--ink);font-weight:700;margin:14px 0 6px;text-align:center">${esc(d.catch)}</p>
    ${full ? `<p style="margin:0">${esc(d.text)}</p>${pts.length ? `<ul>${pts.map(p => `<li>${star()}<span>${esc(p)}</span></li>`).join('')}</ul>` : ''}` : ''}</div>
  </article>`;
}
function timeline(list) { return `<ol class="timeline reveal">${(list || []).map(x => `<li><span class="t">${esc(x.t)}</span><div><b>${esc(x.title)}</b>${x.text ? `<p class="prose">${esc(x.text)}</p>` : ''}</div></li>`).join('')}</ol>`; }

const RENDER = {
  home() {
    const s = C.site, h = C.home;
    const spark = [[8, 18, 18], [16, 62, 12], [26, 30, 22], [72, 22, 16], [84, 56, 20], [92, 30, 12], [60, 12, 10], [38, 70, 10]]
      .map(([x, y, z], i) => `<i class="star" style="left:${x}%;top:${y}%;font-size:${z}px;animation-delay:${i * .4}s"></i>`).join('');
    const links = [
      ['about.html', 'school', '学園紹介', 'ABOUT'], ['life.html', 'auto_stories', '学園生活', 'CAMPUS LIFE'],
      ['career.html', 'workspace_premium', '進路実績', 'CAREER'], ['admission.html', 'how_to_reg', '入学案内', 'ADMISSION']
    ];
    return `
      <section class="hero"><img class="pic" src="img/hero.jpg" alt="${esc(s.name)}"><div class="sparkles">${spark}</div>
        <div class="big"><b>LUNADIANA</b><span>${esc(s.heroSub)}</span></div></section>
      <section class="section"><div class="wrap">
        ${secHead('ABOUT US', s.name + 'とは')}
        <p class="lead reveal" style="font-size:22px;font-weight:700;margin-bottom:24px">${esc(h.introTitle)}</p>
        <p class="lead reveal">${esc(h.introText)}</p>
        <p class="center reveal" style="margin-top:36px"><a class="btn" href="about.html">学園紹介を見る${mi('arrow_forward')}</a></p>
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('NEWS', 'お知らせ')}
        ${newsItems(newsSorted().slice(0, 4))}
        <p class="center reveal" style="margin-top:36px"><a class="btn line" href="news.html">お知らせ一覧${mi('arrow_forward')}</a></p>
      </div></section>
      <section class="section"><div class="wrap">
        ${secHead('COURSE', 'コース紹介')}
        <div class="cards c4">${KUMI.map((_, i) => kumiCard(i, false)).join('')}</div>
        <p class="center reveal" style="margin-top:40px"><a class="btn" href="courses.html">4つの組を見る${mi('arrow_forward')}</a></p>
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('INFORMATION', h.linksTitle)}
        <div class="cards c4 links">${links.map(l => `<a class="card link-card reveal" href="${l[0]}">${mi(l[1])}<b>${esc(l[2])}</b><span>${l[3]}</span></a>`).join('')}</div>
        <div class="cards c2" style="margin-top:28px">
          <a class="card link-card reveal" href="request.html">${mi('description')}<b>資料請求</b><span>REQUEST</span></a>
          <a class="card link-card reveal" href="#" onclick="openContact(event)">${mi('mail')}<b>お問い合わせ</b><span>CONTACT</span></a>
        </div>
      </div></section>`;
  },

  about() {
    const a = C.about, s = C.site;
    return pageHero('about') + `
      <section class="section"><div class="wrap">
        ${secHead('PHILOSOPHY', '教育理念')}
        <p class="lead reveal" style="font-size:22px;font-weight:700">${esc(a.philosophyLead)}</p>
        <div class="cards c3" style="margin-top:44px">${(a.principles || []).map((p, i) => `<div class="card reveal center"><div class="num">${String(i + 1).padStart(2, '0')}</div><h3 style="margin-top:12px">${esc(p.title)}</h3><p class="prose" style="margin:0">${esc(p.text)}</p></div>`).join('')}</div>
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('MESSAGE', '学園長メッセージ')}
        <div class="message reveal"><div class="seal"><img src="img/emblem.png" alt=""></div>
          <div><p class="prose serif" style="margin:0;font-size:16px;line-height:2.2;color:var(--ink)">${esc(a.message)}</p>
          <div class="sign">${esc(s.name)} ${esc(a.principalTitle)}${a.principalName ? `<b>${esc(a.principalName)}</b>` : ''}</div></div></div>
      </div></section>
      <section class="section"><div class="wrap">
        ${secHead('EMBLEM', '校章と校訓')}
        <div class="reveal center"><img src="img/emblem.png" alt="校章" style="width:180px;margin:0 auto 22px">
          <p class="serif" style="font-size:26px;font-weight:700;color:var(--ink);letter-spacing:.2em;margin:0 0 12px">${esc(s.motto)}</p>
          <p class="lead" style="margin:0 0 40px">${esc(a.emblemText)}</p></div>
        <div class="cards c4">${(a.flowers || []).map((f, i) => `<div class="card reveal center" style="--kc:${(KUMI[i] || KUMI[0]).color}">
          <div style="font-size:34px;line-height:1">${(KUMI[i] || {}).emo || ''}</div><h3 style="margin-top:10px">${esc(f.title)}</h3><p class="prose" style="margin:0;font-size:14px">${esc(f.text)}</p></div>`).join('')}</div>
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('HISTORY', '沿革')}
        ${timeline(a.history)}
      </div></section>`;
  },

  courses() {
    const c = C.courses;
    return pageHero('courses') + `
      <section class="section"><div class="wrap">
        ${secHead('4 CLASSES', '4つの組')}
        <p class="lead reveal" style="margin-bottom:48px">${esc(c.lead)}</p>
        <div class="cards c2">${KUMI.map((_, i) => kumiCard(i, true)).join('')}</div>
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('LESSON', 'レッスン')}
        <p class="lead reveal" style="margin-bottom:44px">${esc(c.lessonsLead)}</p>
        <div class="cards c4 links">${(c.lessons || []).map(l => `<div class="card link-card reveal">${mi(l.icon || 'star')}<b>${esc(l.title)}</b><p class="prose" style="margin:8px 0 0;font-size:13.5px;color:var(--sub)">${esc(l.text)}</p></div>`).join('')}</div>
      </div></section>`;
  },

  life() {
    const l = C.life, url = safeUrl(C.site.notebookUrl);
    return pageHero('life') + `
      <section class="section"><div class="wrap">
        ${secHead('DAILY SCHEDULE', '1日の流れ')}
        <p class="lead reveal" style="margin-bottom:44px">${esc(l.lead)}</p>
        ${timeline(l.day)}
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('ANNUAL EVENTS', '年間行事')}
        ${timeline(l.events)}
      </div></section>
      <section class="section"><div class="wrap">
        ${secHead('LESSON NOTE', l.notebookTitle)}
        <div class="card reveal center" style="max-width:760px;margin:0 auto;padding:44px 28px">
          <div style="color:var(--navy2)">${mi('menu_book').replace('class="mi"', 'class="mi" style="font-size:48px"')}</div>
          <p class="lead" style="margin:14px 0 26px">${esc(l.notebookText)}</p>
          ${url ? `<a class="btn gold" href="${esc(url)}" target="_blank" rel="noopener">レッスン手帳をひらく${mi('open_in_new')}</a>` : ''}
        </div>
      </div></section>`;
  },

  career() {
    const c = C.career, items = c.items || [];
    return pageHero('career') + `
      <section class="section"><div class="wrap">
        ${secHead('RESULTS', '活躍する生徒たち')}
        <p class="lead reveal" style="margin-bottom:44px">${esc(c.lead)}</p>
        <div class="stats-band reveal">${(c.stats || []).map(s => `<div><b>${esc(s.num)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>
        ${items.length ? `<div class="career">${items.map(x => `<div class="card reveal"><div class="yr">${esc(x.year)}</div><b>${esc(x.title)}</b>${x.who ? `<div class="who">${esc(x.who)}</div>` : ''}${x.text ? `<p>${esc(x.text)}</p>` : ''}</div>`).join('')}</div>`
          : '<p class="center reveal" style="color:var(--sub)">実績は順次掲載していきます</p>'}
      </div></section>`;
  },

  admission() {
    const a = C.admission, url = safeUrl(C.site.notebookUrl);
    return pageHero('admission') + `
      <section class="section"><div class="wrap">
        ${secHead('GUIDELINES', '募集要項')}
        <p class="lead reveal" style="margin-bottom:44px">${esc(a.lead)}</p>
        <table class="table reveal"><tbody>${(a.table || []).map(r => `<tr><th>${esc(r.k)}</th><td>${esc(r.v)}</td></tr>`).join('')}</tbody></table>
      </div></section>
      <section class="section alt"><div class="wrap">
        ${secHead('FLOW', '入学までの流れ')}
        <div class="steps">${(a.steps || []).map(s => `<div class="step reveal"><b>${esc(s.title)}</b><p>${esc(s.text)}</p></div>`).join('')}</div>
        <p class="lead reveal" style="margin:44px 0 30px">${esc(a.note)}</p>
        <p class="center reveal" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
          ${url ? `<a class="btn gold" href="${esc(url)}" target="_blank" rel="noopener">入学願書（レッスン手帳）${mi('open_in_new')}</a>` : ''}
          <a class="btn" href="request.html">資料請求${mi('arrow_forward')}</a>
          <a class="btn line" href="#" onclick="openContact(event)">お問い合わせ${mi('mail')}</a>
        </p>
      </div></section>`;
  },

  request() {
    return pageHero('request') + `
      <section class="section"><div class="wrap">
        ${secHead('REQUEST', '資料請求')}
        <p class="lead reveal" style="margin-bottom:40px">${esc(C.request.lead)}</p>
        <form class="form reveal" id="req-form" onsubmit="sendRequest(event)">
          <div class="field"><label for="f-name">お名前<span class="req">必須</span></label><input id="f-name" maxlength="40" required autocomplete="off"></div>
          <div class="field"><label for="f-kumi">気になる組</label><select id="f-kumi"><option value="">まだ決めていない</option>${KUMI.map(k => `<option>${esc(k.name)}</option>`).join('')}</select></div>
          <div class="field"><label for="f-contact">ご連絡先（オープンチャットでのお名前など）<span class="req">必須</span></label><input id="f-contact" maxlength="80" required autocomplete="off"></div>
          <div class="field"><label for="f-msg">ひとこと・ご質問</label><textarea id="f-msg" maxlength="1000"></textarea></div>
          <p class="center" style="margin:30px 0 0"><button class="btn" type="submit" id="f-send">送信する${mi('send')}</button></p>
        </form>
      </div></section>`;
  },

  news() {
    const id = new URLSearchParams(location.search).get('id');
    const n = id && (C.news || []).find(x => String(x.id) === id);
    if (n) {
      return pageHero('news') + `
        <section class="section"><div class="wrap">
          <article class="news-article reveal"><div class="meta news-list" style="border:0"><time>${fmtDate(n.date)}</time><span class="cat">${esc(n.cat || 'お知らせ')}</span></div>
            <h2>${esc(n.title)}</h2><div class="prose">${esc(n.body)}</div></article>
          <p class="center reveal" style="margin-top:40px"><a class="btn line" href="news.html">${mi('arrow_back')}お知らせ一覧へ</a></p>
        </div></section>`;
    }
    return pageHero('news') + `<section class="section"><div class="wrap">${secHead('NEWS', 'お知らせ一覧')}${newsItems(newsSorted())}</div></section>`;
  }
};

function sendRequest(e) {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const body = { name: v('f-name'), kumi: v('f-kumi'), contact: v('f-contact'), message: v('f-msg') };
  if (!body.name || !body.contact) return toast('お名前とご連絡先を入力してください');
  const btn = document.getElementById('f-send'); btn.disabled = true; btn.style.opacity = '.6';
  api('addRequest', body).then(res => {
    btn.disabled = false; btn.style.opacity = '';
    if (!res || !res.ok) return toast((res && res.error) || '送信できませんでした');
    const f = document.getElementById('req-form');
    f.innerHTML = `<div class="thanks">${star()}<h3>送信しました</h3><p class="prose" style="margin:0">${esc(C.request.done)}</p>
      <p style="margin:28px 0 0"><a class="btn line" href="index.html">トップへ戻る</a></p></div>`;
  });
}

// ---------- ふわっと表示 ----------
let revealObs = null;
function setupReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  if (!revealObs) revealObs = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => revealObs.observe(el));
}

// ---------- 起動 ----------
function renderPage() {
  const app = document.getElementById('app');
  const page = app.dataset.page;
  // 送信フォームの入力中に描き直さない
  if (page === 'request' && document.getElementById('req-form') && app.dataset.drawn) { renderShell(page); return; }
  renderShell(page);
  app.innerHTML = RENDER[page] ? RENDER[page]() : '';
  app.dataset.drawn = '1';
  if (page === 'news') {
    const id = new URLSearchParams(location.search).get('id');
    const n = id && (C.news || []).find(x => String(x.id) === id);
    document.title = (n ? n.title + ' | ' : 'お知らせ | ') + C.site.name;
  } else {
    const p = PAGES.find(x => x.id === page);
    document.title = (p ? p.ja + ' | ' : '') + C.site.name + (p ? '' : '｜' + C.site.kicker);
  }
  requestAnimationFrame(setupReveal);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
document.addEventListener('click', e => { if (document.body.classList.contains('menu-open') && e.target.closest('.menu-list a')) toggleMenu(false); });
if (document.getElementById('app')) {
  document.addEventListener('DOMContentLoaded', () => { renderPage(); loadContent(renderPage); });
}

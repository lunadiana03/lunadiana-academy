# ルナディアーナ学園 公式サイト（lunadiana-academy）

LINEオープンチャットのなりきり部屋「アイドル養成学校パロ」の、学園の公式サイト風ページ。GitHub Pages で公開。
姉妹サイト：レッスン手帳 https://lunadiana03.github.io/LunaDianaSchool/

## 構成
- ページ：`index.html`（トップ）/ `about.html` / `courses.html` / `life.html` / `career.html` / `admission.html` / `request.html`（資料請求）/ `news.html`（`?id=` で記事）/ `admin.html`（管理画面）
- 各ページは空の `<main id="app" data-page="...">` だけ持ち、中身は `js/common.js` の `RENDER[page]` が描く。ヘッダー・右の縦レール・メニュー・フッターも `renderShell()` が描く。
- 見た目は `css/style.css`（紺 `--navy` ・金 `--gold` ・白）。画像は `img/`。
- 文章の初期値は `common.js` の `DEFAULTS`、管理画面で編集できる項目は `SCHEMA`。新しい項目を足すときは両方に足す。
- バックエンドは Google Apps Script（`GAS.gs`）+ スプレッドシート。`common.js` の `API_URL` が空のあいだは「お試しモード」（localStorage に保存、管理パスワード `admin`）。
  - シート：コンテンツ（key / updatedAt / JSON を4万字ずつ横に分割）、資料請求、設定（adminPassword）
- この開発環境からGASやスプレッドシートには接続できない。

## ユーザーとの約束
- **GASの変更が必要なときは、変更後のGAS全コードをチャットにそのまま貼る**（コピペできる形で）。
- 画面上の表示に**絵文字は使わない**。アイコンは Material Symbols Rounded（`mi('name')`）。組の絵文字（🌸🕊🍃🌙）だけは例外。
- 演出はふわっと・やわらかく（`.reveal` のフェードイン、きらめく星）。派手すぎない。
- お問い合わせはマシュマロに飛ぶ（URLは管理画面「サイト全体」で設定。空なら「準備中」）。
- オープンキャンパス・アクセスのページは作らない。
- 組名（`花の歌組🌸` など）はレッスン手帳と同じ値を使う（鳥の劇組には見えない文字 U+200E が入っている）。

# ルナディアーナ学園 公式サイト（lunadiana-academy）

LINEオープンチャットのなりきり部屋「アイドル養成学校パロ」の、学園の公式サイト風ページ。GitHub Pages で公開。
姉妹サイト：レッスン手帳 https://lunadiana03.github.io/LunaDianaSchool/

## 構成
- ページ：`index.html`（トップ）/ `about.html` / `courses.html` / `life.html` / `career.html` / `admission.html` / `news.html`（`?id=` で記事）
- 各ページは空の `<main id="app" data-page="...">` だけ持ち、中身は `js/common.js` の `RENDER[page]` が描く。ヘッダー・右の縦レール・メニュー・フッターも `renderShell()` が描く。
- 見た目は `css/style.css`（紺 `--navy` ・金 `--gold` ・白）。画像は `img/`。
- 文章はすべて `common.js` の `C`（お知らせ・進路実績も）。更新はここを書き換えてプッシュする。
- バックエンド（GAS・スプレッドシート）は使わない。管理画面もない。
- ボタンの行き先は `common.js` 先頭の `LINKS`：`request`＝資料請求（リットリンク）、`contact`＝お問い合わせ（マシュマロ）、`notebook`＝レッスン手帳。空なら押すと「準備中です」。URLはユーザーが後で貼る。

## ユーザーとの約束
- 画面上の表示に**絵文字は使わない**。アイコンは Material Symbols Rounded（`mi('name')`）。組の絵文字（🌸🕊🍃🌙）だけは例外。
- 演出はふわっと・やわらかく（`.reveal` のフェードイン、きらめく星）。派手すぎない。
- 資料請求はリットリンク、お問い合わせはマシュマロに飛ぶ（サイト内にフォームは作らない）。
- オープンキャンパス・アクセスのページは作らない。
- 組名（`花の歌組🌸` など）はレッスン手帳と同じ値を使う（鳥の劇組には見えない文字 U+200E が入っている）。

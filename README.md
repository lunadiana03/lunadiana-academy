# ルナディアーナ学園 公式サイト

芸能育成学校「ルナディアーナ学園」（なりきり）の公式サイトです。

## 公開
GitHub の Settings → Pages → Branch を `main` / `/ (root)` にして保存。

## リンクの設定
`js/common.js` の一番上にある `LINKS` にURLを貼ります。

```js
const LINKS = {
  request: '',  // 資料請求（リットリンク）
  contact: '...',  // お問い合わせ（マシュマロ）
  openchat: '', // 出願（公式オープンチャット）
  notebook: 'https://lunadiana03.github.io/LunaDianaSchool/' // レッスン手帳
};
```

`''` の間にURLを入れてください（例：`request: 'https://lit.link/xxxx',`）。空のあいだはボタンを押すと「準備中です」と出ます。

## 文章の変更
同じ `js/common.js` の `const C = {` 以下に、ページごとの文章・お知らせ・進路実績が書いてあります。

# Instagram 自動投稿

## ふだんの使い方

Claude Code でこのフォルダを開き、こんなふうに頼むだけです。

> 「来週の水曜19時に、2月のリトルドラゴンコースの告知を投稿したい。写真はこれ → ～」

Claude が投稿文を作って見せる → OK を出す → 画像と予約ファイルを用意 → push してよいか聞かれる → OK、で予約完了です。
予約時刻を過ぎると30分以内に自動で投稿されます。

## しくみ

```
instagram/posts/○○.md        … 予約ファイル（投稿日時・画像・本文）
public/instagram/○○/1.jpg    … 投稿する画像（サイト quest-walk.pages.dev 上に公開される）
instagram/videos/○○.mp4      … リールの動画（サイトには公開されず、Instagram に直接アップロード）
        │ push
        ▼
GitHub Actions（30分おき）… 投稿時刻を過ぎた予約を Instagram API で投稿
        │
        ▼
予約ファイルが status: published に書き換わり、投稿のURL（permalink）が記録される
```

- 費用はかかりません（GitHub Actions・Instagram API・Cloudflare Pages すべて無料の範囲）。
- 画像は Instagram に取り込ませるため、サイト上の `https://quest-walk.pages.dev/instagram/...` に公開されます。
- 投稿に失敗すると `status: error` になり、理由が `error:` に書かれます。GitHub からメールでも通知が来ます。

## はじめに1回だけ必要な設定

Facebook ページ経由の方式です。一度設定すればトークンは期限切れにならないので、更新作業はいりません。

### 1. Instagram をプロアカウントにする（@quest.walk は設定済み）

### 2. Facebook ページを作って Instagram とリンクする（無料）

1. Facebook で「クエストウォーク」のページを作る（メニュー → ページ → 新しいページを作成）
2. ページの設定 →「リンク済みのアカウント」→ Instagram → @quest.walk をリンク

### 3. Meta のアプリでトークンを発行する（無料）

1. [Meta for Developers](https://developers.facebook.com/apps/) のアプリ「Quest Walk Poster」（作成済み）を開く
2. [グラフAPIエクスプローラ](https://developers.facebook.com/tools/explorer/) で、アプリに「Quest Walk Poster」を選ぶ
3. アクセス許可に次を追加して「Generate Access Token」→ Facebook の画面でクエストウォークのページと @quest.walk を選んで許可
   `instagram_basic` `instagram_content_publish` `pages_show_list` `pages_read_engagement` `business_management`
4. このユーザートークンを長期トークンに交換し、そこからページのアクセストークンを取り出す（期限なしになる）
   ※ 3〜4 は Claude が画面を見ながら一緒に進めます

アプリは「開発モード」のままで大丈夫です（自分のアカウントにだけ投稿するため、Meta の審査は不要）。

### 4. GitHub にトークンを登録する

GitHub のリポジトリ `yamanyclimber-eng/quest-walk` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Name | 値 |
|---|---|
| `IG_ACCESS_TOKEN` | 手順3で取り出したページのアクセストークン |

### 5. 動作確認

GitHub の **Actions** タブ → 「Instagram 自動投稿」→ **Run workflow**。予約がなければ「投稿時刻になった予約はありません」と出ます。

## 注意

- 予約ファイルを作ったら必ず push してください。push しないと予約されません。
- 投稿時刻の直前に push した場合、サイトの更新（1〜2分）が終わってから投稿されます。
- 公開リポジトリで60日間まったく更新がないと、GitHub が定期実行を自動停止することがあります。その場合は Actions タブで再度有効にしてください。
- Instagram の制限：画像は JPEG・最大10枚、縦横比は 4:5〜1.91:1、本文2200文字・ハッシュタグ30個まで。
- ストーリー：予約ファイルに `type: story` を書く。画像1枚か動画1本、本文なし。リンクスタンプは自動投稿では付けられません。
- リール：MP4/MOV・3秒〜15分・300MB まで（GitHub に置ける上限は100MBなので、それ以上は圧縮）。投稿はフィードにも表示されます。

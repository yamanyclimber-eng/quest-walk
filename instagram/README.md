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

### 1. Instagram をプロアカウントに切り替える（無料・数分）

Instagram アプリ → プロフィール → ≡ → **アカウントの種類とツール** → **プロアカウントに切り替える**
→ 「クリエイター」か「ビジネス」を選ぶ（どちらでも自動投稿できます。イベント運営なら「ビジネス」がおすすめ）。
フォロワーや投稿はそのまま残ります。Facebook ページとの連携は**不要**です。

### 2. Meta のアプリを作ってアクセストークンを発行する（無料）

1. [Meta for Developers](https://developers.facebook.com/) に Facebook アカウントでログインし、開発者登録する
2. 「マイアプリ」→「アプリを作成」→ ユースケースで **「Instagram でメッセージとコンテンツを管理」** を選ぶ
3. アプリの「Instagram ログインによる API 設定」→「アカウントを追加」でクエストウォークの Instagram アカウントを追加
4. 「トークンを生成」でアクセストークンをコピー（`instagram_business_content_publish` の権限が含まれていること）

アプリは「開発モード」のままで大丈夫です（自分のアカウントにだけ投稿するため、Meta の審査は不要）。
※画面の名前は Meta 側の変更で少し違うことがあります。迷ったら Claude に「ブラウザで一緒に設定して」と頼んでください。

### 3. GitHub にトークンを登録する

GitHub のリポジトリ `yamanyclimber-eng/quest-walk` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Name | 値 |
|---|---|
| `IG_ACCESS_TOKEN` | 手順2でコピーしたトークン |
| `GH_PAT` | 下の手順で作るトークン（トークンの自動更新用） |

**GH_PAT の作り方**：GitHub 右上のアイコン → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
- Repository access：`quest-walk` だけを選ぶ
- Permissions：**Secrets** を「Read and write」
- 有効期限：最長（1年）にして、カレンダーに更新日をメモ

> Instagram のトークンは60日で切れます。「Instagram トークン更新」ワークフローが毎週自動で延長します。
> GH_PAT を設定しない場合は、50日おきくらいに手順2をやり直して `IG_ACCESS_TOKEN` を貼り替えてください。

### 4. 動作確認

GitHub の **Actions** タブ → 「Instagram トークン更新」→ **Run workflow** → 緑のチェックになれば設定完了です。
（「Instagram 自動投稿」も同じように手動実行できます。予約がなければ「投稿時刻になった予約はありません」と出ます）

## 注意

- 予約ファイルを作ったら必ず push してください。push しないと予約されません。
- 投稿時刻の直前に push した場合、サイトの更新（1〜2分）が終わってから投稿されます。
- 公開リポジトリで60日間まったく更新がないと、GitHub が定期実行を自動停止することがあります。その場合は Actions タブで再度有効にしてください。
- Instagram の制限：画像は JPEG・最大10枚、縦横比は 4:5〜1.91:1、本文2200文字・ハッシュタグ30個まで。
- リール：MP4/MOV・3秒〜15分・300MB まで（GitHub に置ける上限は100MBなので、それ以上は圧縮）。投稿はフィードにも表示されます。

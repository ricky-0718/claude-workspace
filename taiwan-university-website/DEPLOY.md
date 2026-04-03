# Cloudflare Pages デプロイ手順

## 1. wrangler認証（初回のみ）
```bash
cd taiwan-university-website
npx wrangler login
```
ブラウザが開くのでCloudflareアカウントでログイン。

## 2. プロジェクト作成 & デプロイ
```bash
npx astro build
npx wrangler pages deploy dist --project-name=taiwan-university-db
```
初回はプロジェクトが自動作成される。

## 3. カスタムドメイン設定（Cloudflareダッシュボード）
1. Workers & Pages → taiwan-university-db → Custom domains
2. `db.ryugaku101.com` を追加
3. ryugaku101.com のDNSにCNAMEが自動追加される

## 4. Bot Fight Mode有効化（Cloudflareダッシュボード）
1. ryugaku101.com → Security → Bots
2. Bot Fight Mode を ON
3. 「Block AI Scrapers and Crawlers」を ON

## 5. 更新デプロイ（以降毎回）
```bash
npx astro build && npx wrangler pages deploy dist --project-name=taiwan-university-db
```

# BGterminal

ボードゲームのソロプレイ支援ツールを集めたゲームポータルサイト。React + Vite 製。

## ゲーム一覧

| ディレクトリ | ゲーム |
|---|---|
| `games/hannnibal` | ハンニバル |
| `games/manilla` | マニラ 1945 |
| `games/pandemic_rome` | パンデミック：ローマ |

各ゲームは Git サブモジュールとして管理されており、ビルド時に `public/games/<name>/` へ出力されます。

---

## ローカル開発

```bash
# サブモジュールごとクローン
git clone --recurse-submodules git@github.com:tomo9878/BGterminal.git
cd BGterminal

# 依存インストール＆ゲームビルド
npm install
npm run build:games   # 全ゲームをビルドして public/games/ へ配置

# 開発サーバー起動
npm run dev
```

特定のゲームだけビルドしたい場合:

```bash
node scripts/build-games.mjs manilla
```

---

## Vercel デプロイ設定

### 1. リポジトリ接続時の注意

このリポジトリは Git サブモジュールを使用しています。Vercel がサブモジュールを取得できるよう、以下の設定が必要です。

**Environment Variables** に以下を追加してください（Project Settings → Environment Variables）:

| 変数名 | 値 |
|---|---|
| `VERCEL_GIT_FETCH_SUBMODULES` | `1` |

サブモジュールのリポジトリ（hannnibal / manilla / pandemic_rome）がプライベートの場合は、Vercel の **Deploy Keys** または **GitHub App 連携** でアクセス権を付与してください。

### 2. Build & Output Settings

Project Settings → General → **Build & Output Settings** を以下に設定:

| 項目 | 値 |
|---|---|
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | `20.x` |

`npm run build` の中身は `npm run build:games && vite build` です。  
各ゲームのビルドスクリプトが `--legacy-peer-deps` を自動で付けるため、ルートの Install Command への追加は不要です。

### 3. 確認事項チェックリスト

- [ ] `VERCEL_GIT_FETCH_SUBMODULES=1` を Environment Variables に設定した
- [ ] サブモジュールのリポジトリへの読み取りアクセスが Vercel に付与されている
- [ ] Build Command が `npm run build` になっている
- [ ] Output Directory が `dist` になっている

---

## ビルドの仕組み

```
npm run build
  └─ node scripts/build-games.mjs   # 各ゲームを npm install → vite build
       └─ 出力先: public/games/<name>/
  └─ vite build                     # ポータル本体をビルド
       └─ 出力先: dist/
            └─ games/<name>/        # public/games/ がそのままコピーされる
```

# Next.js Image Gallery

モダンでパフォーマンスの高い画像ギャラリーアプリケーション。Next.js、Cloudinary、TailwindCSSを使用して構築されています。

## 特長

- 🖼️ Cloudinaryと連携した最適化された画像配信
- 🚀 高速なページロードとSEO対応（Static Site Generation）
- 📱 レスポンシブなグリッドレイアウト
- 🎯 画像のモーダル表示と直接リンク
- ✨ スムーズな画像読み込みとブラープレースホルダー
- 💾 最後に表示した画像の位置を記憶

## 技術スタック

- **フレームワーク:** Next.js (Latest)
- **言語:** TypeScript 4.8.4
- **UI:** React 18.2.0
- **スタイリング:** TailwindCSS 3.2.1
- **画像管理:** Cloudinary
- **アニメーション:** Framer Motion 7.6.4
- **その他のライブラリ:**
  - @headlessui/react: UIコンポーネント
  - react-swipeable: スワイプジェスチャー対応
  - react-use-keypress: キーボードナビゲーション

## セットアップ手順

1. リポジトリのクローン:
```bash
git clone <repository-url>
cd image-gallery
```

2. 依存関係のインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env.local`ファイルを作成し、以下の変数を設定:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=your_folder_name
```

4. 開発サーバーの起動:
```bash
npm run dev
```

アプリケーションは http://localhost:3000 で利用可能になります。

## ビルドと本番環境

本番用ビルドの作成:
```bash
npm run build
```

本番環境での起動:
```bash
npm run start
```

## 主要機能の使い方

### 画像の表示
- グリッドビューで全画像を表示
- 画像をクリックしてモーダルビューで拡大表示
- 左右の矢印キーまたはスワイプでナビゲーション
- ESCキーでモーダルを閉じる

### パフォーマンス最適化
- 画像は自動的に最適化され、レスポンシブに配信
- ブラープレースホルダーによるスムーズなローディング
- 静的生成による高速なページロード

## 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Cloudinaryのクラウド名 | ✅ |
| CLOUDINARY_API_KEY | CloudinaryのAPI Key | ✅ |
| CLOUDINARY_API_SECRET | CloudinaryのAPI Secret | ✅ |
| CLOUDINARY_FOLDER | 画像を格納するフォルダ名 | ✅ |

## コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

MITライセンスの下で公開されています。

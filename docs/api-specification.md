# API仕様書

## Cloudinary API統合

このアプリケーションは、CloudinaryのAPIを使用して画像の管理と配信を行っています。

### 認証設定

```typescript
// 環境変数による認証情報の設定
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
CLOUDINARY_FOLDER=<folder_name>
```

### API エンドポイント

#### 画像リスト取得

```typescript
// cloudinary.ts
const results = await cloudinary.v2.search
  .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
  .sort_by("public_id", "desc")
  .max_results(400)
  .execute();
```

**パラメータ:**
- `folder`: 画像を格納しているフォルダパス
- `sort_by`: ソート条件
- `max_results`: 取得する最大件数

**レスポンス:**
```typescript
interface CloudinaryResource {
  public_id: string;
  format: string;
  height: number;
  width: number;
}

interface SearchResponse {
  resources: CloudinaryResource[];
  total_count: number;
}
```

### 画像URL生成

#### 最適化された画像URL
```typescript
`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`
```

**パラメータ:**
- `c_scale`: 画像のスケーリング
- `w_720`: 画像の幅（ピクセル）
- `public_id`: 画像の一意識別子
- `format`: 画像フォーマット（jpg, png等）

### ブラーハッシュ生成

```typescript
// generateBlurPlaceholder.ts
async function getBase64ImageUrl(image: ImageProps): Promise<string> {
  // 画像の取得とブラーハッシュの生成
}
```

**入力:**
```typescript
interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}
```

**出力:**
- Base64エンコードされたブラー画像データURL

### レスポンシブ画像設定

```typescript
// Next.js Image コンポーネントの設定
<Image
  sizes="(max-width: 640px) 100vw,
         (max-width: 1280px) 50vw,
         (max-width: 1536px) 33vw,
         25vw"
  width={720}
  height={480}
  // その他のprops
/>
```

## エラーハンドリング

### エラーレスポンス形式

```typescript
interface ErrorResponse {
  error: {
    message: string;
    code: string;
  }
}
```

### 主要エラーコード

| コード | 説明 | 対処方法 |
|--------|------|----------|
| rate_limited | APIレート制限超過 | 一定時間待機後にリトライ |
| invalid_credentials | 認証情報が無効 | 環境変数の設定を確認 |
| resource_not_found | 画像が見つからない | public_idの存在確認 |
| invalid_parameter | パラメータが無効 | APIドキュメントを参照 |

## キャッシュ戦略

1. **ビルド時キャッシュ**
   - getStaticPropsによる静的生成
   - 画像メタデータのキャッシュ

2. **CDNキャッシュ**
   - Cloudinaryによる自動CDNキャッシュ
   - キャッシュヘッダーの最適化

3. **ブラウザキャッシュ**
   - 画像のブラウザキャッシュ
   - ブラーハッシュのメモリキャッシュ

## セキュリティ考慮事項

1. **APIキーの保護**
   - 環境変数による管理
   - サーバーサイドでの実行

2. **アクセス制御**
   - 適切なCloud名の使用
   - 画像変換パラメータの制限

3. **URL署名**
   - 必要に応じてセキュアURL生成
   - 有効期限付きURL対応

## パフォーマンス最適化

1. **画像最適化**
   - 自動フォーマット選択
   - プログレッシブ読み込み
   - 適切なサイズ指定

2. **配信最適化**
   - CDN活用
   - レスポンシブ配信
   - キャッシュ戦略

## モニタリング

1. **Cloudinaryダッシュボード**
   - 使用状況監視
   - エラー監視
   - パフォーマンスメトリクス

2. **アプリケーションログ**
   - APIコール記録
   - エラーログ
   - パフォーマンスログ
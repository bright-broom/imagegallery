# コーディングガイドライン

## 全般的なルール

1. **TypeScriptの厳格な使用**
   - `strict: true`の設定を維持
   - 明示的な型定義
   - any型の使用を避ける

2. **命名規則**
   ```typescript
   // コンポーネント名: PascalCase
   const ImageGallery: React.FC<Props> = () => {};
   
   // 関数名: camelCase
   const handleImageClick = () => {};
   
   // 型定義: PascalCase
   interface ImageProps {}
   type GalleryState = {};
   
   // 定数: UPPER_SNAKE_CASE
   const MAX_IMAGE_WIDTH = 1920;
   ```

3. **ファイル構成**
   ```
   components/
     └── ComponentName/
         ├── index.tsx        // メインコンポーネント
         ├── types.ts         // 型定義
         └── utils.ts         // ヘルパー関数
   ```

## Reactベストプラクティス

1. **フックの使用**
   ```typescript
   // ✅ 良い例
   const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
   
   // ❌ 避けるべき例
   let lastViewedPhoto = '';
   const updateLastViewedPhoto = () => {};
   ```

2. **メモ化**
   ```typescript
   // 高コストな計算や再レンダリングの最適化
   const MemoizedComponent = React.memo(({images}) => {
     return <div>{/* レンダリング */}</div>;
   });
   
   const memoizedValue = useMemo(() => computeExpensiveValue(images), [images]);
   ```

3. **副作用の管理**
   ```typescript
   useEffect(() => {
     // クリーンアップ関数を返す
     const handler = () => {};
     window.addEventListener('resize', handler);
     return () => window.removeEventListener('resize', handler);
   }, [/* 依存配列 */]);
   ```

## Next.jsパターン

1. **データフェッチング**
   ```typescript
   // ✅ 静的生成の活用
   export const getStaticProps: GetStaticProps = async () => {
     const images = await fetchImages();
     return { props: { images } };
   };
   
   // ❌ 避けるべき例
   const Component = () => {
     useEffect(() => {
       fetchImages(); // クライアントサイドでの不要なフェッチ
     }, []);
   };
   ```

2. **画像最適化**
   ```typescript
   // ✅ Next.js Image コンポーネントの適切な使用
   <Image
     src={imageUrl}
     alt="Description"
     width={width}
     height={height}
     placeholder="blur"
     blurDataURL={blurDataUrl}
     sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            25vw"
   />
   ```

## TailwindCSSガイドライン

1. **クラス名の整理**
   ```typescript
   // ✅ 論理的なグループ化
   className="
     // レイアウト
     flex flex-col items-center
     // スペーシング
     gap-4 p-6
     // 見た目
     bg-white rounded-lg shadow-lg
     // インタラクション
     hover:bg-gray-50 transition-colors
   "
   ```

2. **レスポンシブデザイン**
   ```typescript
   // モバイルファースト
   className="
     columns-1
     sm:columns-2
     xl:columns-3
     2xl:columns-4
   "
   ```

3. **カスタマイズ**
   ```javascript
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         // 既存の設定を拡張
       }
     }
   };
   ```

## 型定義ベストプラクティス

1. **共通型の集中管理**
   ```typescript
   // types/index.ts
   export interface ImageProps {
     id: number;
     public_id: string;
     format: string;
     blurDataUrl?: string;
   }
   
   export type ImageSize = 'thumbnail' | 'medium' | 'large';
   ```

2. **Utility Types の活用**
   ```typescript
   type ImageWithoutBlur = Omit<ImageProps, 'blurDataUrl'>;
   type RequiredImage = Required<ImageProps>;
   type ReadonlyImage = Readonly<ImageProps>;
   ```

## エラーハンドリング

1. **型安全なエラー処理**
   ```typescript
   class APIError extends Error {
     constructor(
       message: string,
       public code: string,
       public status: number
     ) {
       super(message);
     }
   }
   
   try {
     await fetchImages();
   } catch (error) {
     if (error instanceof APIError) {
       // 型安全なエラーハンドリング
     }
   }
   ```

2. **非同期エラー処理**
   ```typescript
   const handleImageLoad = async () => {
     try {
       await loadImage();
     } catch (error) {
       console.error('画像の読み込みに失敗:', error);
       // フォールバックUI表示
     }
   };
   ```

## パフォーマンス最適化

1. **コンポーネントの分割**
   ```typescript
   // ✅ 適切な粒度での分割
   const Gallery = () => <div>{/* 全体のレイアウト */}</div>;
   const ImageGrid = () => <div>{/* 画像グリッド */}</div>;
   const ImageCard = () => <div>{/* 個別の画像カード */}</div>;
   ```

2. **遅延読み込み**
   ```typescript
   // 動的インポート
   const Modal = dynamic(() => import('../components/Modal'), {
     loading: () => <LoadingSpinner />
   });
   ```

## TypeScriptビルド設定

1. **増分ビルド (Incremental Build)**
    ```typescript
    // tsconfig.json
    {
      "compilerOptions": {
        "incremental": true // ビルドパフォーマンス向上のため有効化
      }
    }
    ```
    
    - `tsconfig.tsbuildinfo` ファイルについて:
      - 目的: 増分ビルドのキャッシュ情報を保存
      - 場所: プロジェクトルートに生成
      - 取り扱い:
        - バージョン管理から除外（.gitignoreに設定済）
        - CI/CDでキャッシュとして活用可能
        - 削除しても自動的に再生成される
      - 注意: 削除すると次回ビルド時に全ファイルの再コンパイルが必要

## テスト規約

1. **コンポーネントテスト**
   ```typescript
   describe('ImageGallery', () => {
     it('正しく画像を表示する', () => {
       render(<ImageGallery images={mockImages} />);
       expect(screen.getAllByRole('img')).toHaveLength(mockImages.length);
     });
   });
   ```

2. **ユーティリティ関数テスト**
   ```typescript
   describe('generateBlurPlaceholder', () => {
     it('有効なブラーハッシュを生成する', async () => {
       const result = await generateBlurPlaceholder(mockImage);
       expect(result).toMatch(/^data:image\/jpeg;base64,/);
     });
   });
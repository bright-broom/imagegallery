# 変更履歴

## [1.0.2] - 2025-02-12

### 🐛 バグ修正
- Toastコンポーネントのvariant型エラーを修正
- Modalコンポーネントのエラーハンドリングを改善
- 型の安全性を向上
- null/undefinedチェックの強化

### 📝 変更したファイル
- `components/Modal.tsx`
- `utils/image/types.ts`
- `utils/image/index.ts`

### ✨ 改善点
- エラー通知の一貫性を向上（default/destructiveの適切な使い分け）
- 型定義の拡張と整理
- エラーハンドリングの体系化

### 🚀 パフォーマンス改善
- 不要な再レンダリングの防止
- エラー処理の最適化

## [1.0.1] - 2025-02-12

### 🐛 バグ修正
- react-use-keypress の型定義エラーを解決
- utils/image の downloadPhoto 関数が見つからない問題を修正
- Cloudinary の null チェックを追加して安全性を向上

### 📝 変更したファイル
- `types/react-use-keypress.d.ts` (新規作成)
- `utils/image/index.ts`
- `hooks/use-toast.ts`
- `pages/p/[photoId].tsx`

### ✨ 改善点
- 画像ダウンロード機能の実装と型安全性の向上
- Toast通知システムのパフォーマンス最適化

### 🔨 リファクタリング
- use-toast.ts の forEach を for...of に変更
- useEffect の依存配列を最適化
- [photoId].tsx のモジュールパスを整理

### 🚀 パフォーマンス改善
- 不要な依存関係の削除によるメモリ使用量の最適化
- Cloudinary 設定の効率化

### 📚 ドキュメント更新
- 変更履歴の追加
- コードベースの改善点を記録
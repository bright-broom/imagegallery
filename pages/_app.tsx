// =============================
// 📌 Next.js のカスタム App コンポーネント
// =============================

// 📌 型定義のインポート
import type { AppProps } from "next/app";

// 📌 グローバルスタイルの適用
import "@/styles/index.css";

/**
 * 📌 MyApp コンポーネント
 * - すべてのページに適用される共通レイアウト
 * - `Component` は現在のページのコンポーネント
 * - `pageProps` は各ページごとのプロパティ
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// =============================
// 📌 Next.js のカスタムドキュメント設定
// =============================
import { Head, Html, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="ja">
      <Head>
        {/* =============================
            📌 ファビコンの設定
            ============================= */}
        <link rel="icon" href="/favicon.ico" />

        {/* =============================
            📌 メタタグ（SEO & SNS 用）
            ============================= */}
        <meta name="description" content="See pictures from Next.js Conf and the After Party." />
        <meta property="og:site_name" content="nextjsconf-pics.vercel.app" />
        <meta property="og:title" content="Next.js Conf 2022 Pictures" />
        <meta property="og:description" content="See pictures from Next.js Conf and the After Party." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js Conf 2022 Pictures" />
        <meta name="twitter:description" content="See pictures from Next.js Conf and the After Party." />
      </Head>

      {/* =============================
          📌 ページの本文
          ============================= */}
      <body className="antialiased bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

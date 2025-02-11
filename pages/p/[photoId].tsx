// =============================
// 📌 必要なライブラリのインポート
// =============================

// 📌 Next.js 関連のインポート
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

// 📌 内部コンポーネントのインポート
import Carousel from "@/components/Carousel";

// 📌 画像処理関連のユーティリティ関数
import { getPhotos, generateBlurPlaceholder } from "@/utils/image";

// 📌 型定義のインポート
import type { ImageProps } from "@/utils/image/types";

// =============================
// 📌 Home コンポーネント（個別の画像ページ）
// =============================

interface PhotoPageProps {
  currentPhoto: ImageProps;
}

const PhotoPage: NextPage<PhotoPageProps> = ({ currentPhoto }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const index = Number(photoId);

  // 📌 画像 URL の生成（Cloudinary）
  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <Head>
        <title>Portfolio site</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* 📌 画像のカルーセル表示 */}
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default PhotoPage;

// =============================
// 📌 SSG（静的サイト生成）の設定
// =============================

/**
 * 📌 `getStaticProps`：指定された `photoId` に基づいて画像データを取得
 * - 画像データが見つからない場合は 404 を返す
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const allPhotos = await getPhotos();

  // `photoId` を取得し、存在しない場合は 404
  const photoId = context.params?.photoId;
  if (!photoId) {
    return { notFound: true };
  }

  // `photoId` に該当する画像を検索
  const currentPhoto = allPhotos.find((img) => img.id === Number(photoId));
  if (!currentPhoto) {
    return { notFound: true };
  }

  // 📌 ぼかしプレースホルダーの追加
  currentPhoto.blurDataUrl = await generateBlurPlaceholder(currentPhoto);

  return {
    props: {
      currentPhoto,
    },
  };
};

// =============================
// 📌 SSG（静的サイト生成）の設定   
// 📌 `getStaticPaths`：全ての `photoId` のパスを事前生成
// - すべての画像を取得し、`photoId` を元にパスを作成
//
export const getStaticPaths: GetStaticPaths = async () => {
  const photos = await getPhotos();
  const paths = photos.map((_, index) => ({
    params: { photoId: index.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

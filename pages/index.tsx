// =============================
// 📌 外部ライブラリのインポート
// =============================
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

// =============================
// 📌 内部コンポーネントのインポート
// =============================
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SharedModal from "@/components/SharedModal";
import Gallery from "@/components/Gallery";

// =============================
// 📌 ユーティリティのインポート
// =============================
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";
import { getPhotos } from "@/utils/image";
import type { ImageProps } from "@/utils/image/types";

// =============================
// 📌 Home コンポーネント（メインページ）
// =============================
interface HomeProps {
  images: ImageProps[];
}

const Home: NextPage<HomeProps> = ({ images }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  /**
   * 📌 最後に閲覧した写真の位置へスクロール
   * - `photoId` が `undefined` の場合に適用
   * - `lastViewedPhoto` の参照がある場合にスクロール実行
   */
  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Header />
      <Head>
        <title>Portfolio</title>
        <meta property="og:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
        <meta name="twitter:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* 📌 モーダル表示（画像クリック時に開く） */}
        {photoId && (
          <SharedModal
            images={images}
            index={images.findIndex((img) => img.id === Number(photoId))}
            changePhotoId={(newIndex) => {
              const newPhotoId = images[newIndex]?.id;
              if (newPhotoId !== undefined) {
                router.push(`/?photoId=${newPhotoId}`, `/p/${newPhotoId}`, { shallow: true });
              }
            }}
            closeModal={() => {
              setLastViewedPhoto(photoId as string);
              router.push("/", undefined, { shallow: true });
            }}
            navigation={true}
          />
        )}
        {/* 📌 ギャラリーコンポーネント */}
        <Gallery images={images} lastViewedPhoto={lastViewedPhoto} lastViewedPhotoRef={lastViewedPhotoRef} />
      </main>
      <Footer />
    </>
  );
};

export default Home;

// =============================
// 📌 SSG（静的サイト生成）データ取得
// =============================
export async function getStaticProps() {
  const images = await getPhotos();
  return { props: { images } };
}

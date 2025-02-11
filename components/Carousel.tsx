// =============================
// 📌 外部ライブラリのインポート
// =============================
import Image from "next/image";
import { useRouter } from "next/router";
import useKeypress from "react-use-keypress";

// =============================
// 📌 内部コンポーネントのインポート
// =============================
import SharedModal from "./SharedModal";

// =============================
// 📌 ユーティリティのインポート
// =============================
import type { ImageProps } from "@/utils/image/types";
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";

// =============================
// 📌 Carousel コンポーネント（画像のモーダル表示）
// =============================
interface CarouselProps {
  index: number;
  currentPhoto: ImageProps;
}

export default function Carousel({ index, currentPhoto }: CarouselProps) {
  const router = useRouter();
  const [, setLastViewedPhoto] = useLastViewedPhoto();

  // =============================
  // 📌 モーダルを閉じる処理
  // =============================
  function closeModal() {
    setLastViewedPhoto(index.toString());
    router.push("/", undefined, { shallow: true });
  }

  // =============================
  // 📌 画像 ID の変更（現在は未使用）
  // =============================
  function changePhotoId(newVal: number) {
    return newVal;
  }

  // =============================
  // 📌 キーボードの `Escape` でモーダルを閉じる
  // =============================
  useKeypress("Escape", closeModal);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* 📌 背景のクリックでモーダルを閉じる */}
      <button
        className="absolute inset-0 z-30 bg-black cursor-default backdrop-blur-2xl"
        onClick={closeModal}
        type="button"
        aria-label="Close modal"
        title="Close modal"
      >
        {/* 📌 ぼかし背景（blurDataUrl がある場合のみ表示） */}
        {currentPhoto.blurDataUrl && (
          <Image
            src={currentPhoto.blurDataUrl}
            className="w-full h-full pointer-events-none"
            alt="blurred background"
            fill
            priority
          />
        )}
      </button>

      {/* 📌 画像モーダルの表示 */}
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  );
}

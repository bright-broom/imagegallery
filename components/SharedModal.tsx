import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import ImageDisplay from "./SharedModal/ImageDisplay";
import NavigationButtons from "./SharedModal/NavigationButtons";
import ActionButtons from "./SharedModal/ActionButtons";
import type { ImageProps, SharedModalProps } from "@/utils/image/types";
import { range } from "@/utils/styles";

/**
 * 📌 画像共有モーダルコンポーネント
 */
export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation = false, // ✅ 修正: デフォルト値を設定
  currentPhoto,
  direction = 0, // ✅ 修正: `undefined` の可能性を排除
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  // 📌 近くの画像をフィルタリング（パフォーマンス向上）
  const filteredImages = images?.filter((img: ImageProps) => range(index - 15, index + 15).includes(img.id)) || [];

  // 📌 スワイプ操作の設定
  const handlers = useSwipeable({
    onSwipedLeft: () => images && index < images.length - 1 && changePhotoId(index + 1),
    onSwipedRight: () => index > 0 && changePhotoId(index - 1),
    trackMouse: true,
  });

  const currentImage = images ? images[index] : currentPhoto;
  if (!currentImage) return null;

  return (
    <MotionConfig transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}>
      <div className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto" {...handlers}>
        {/* 📌 メイン画像 */}
        <ImageDisplay currentImage={currentImage} index={index} direction={direction} loaded={loaded} setLoaded={setLoaded} />

        {/* 📌 ナビゲーションボタン */}
        {navigation && images && <NavigationButtons index={index} images={images} changePhotoId={changePhotoId} />}

        {/* 📌 アクションボタン */}
        <ActionButtons currentImage={currentImage} index={index} closeModal={closeModal} />
      </div>
    </MotionConfig>
  );
}

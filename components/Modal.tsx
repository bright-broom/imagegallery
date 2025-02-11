// =============================
// 📌 外部ライブラリのインポート
// =============================
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";

// =============================
// 📌 内部コンポーネントのインポート
// =============================
import SharedModal from "@/components/SharedModal";
import { useToast } from "@/hooks/use-toast";

// =============================
// 📌 型定義のインポート
// =============================
import type { ImageProps } from "@/utils/image/types";

// =============================
// 📌 モーダルのプロパティ定義
// =============================
interface ModalProps {
  images: ImageProps[];
  onClose?: () => void;
}

// =============================
// 📌 画像を表示するモーダルコンポーネント
// =============================
export default function Modal({ images, onClose }: ModalProps) {
  // 📌 モーダル背景のオーバーレイ用の `ref`
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { photoId } = router.query;
  const { toast } = useToast();

  // 📌 indexの安全な初期化
  const initialIndex = (() => {
    const id = Number(photoId);
    if (Number.isNaN(id) || id < 0 || id >= images.length) {
      return 0;
    }
    return id;
  })();

  // 📌 現在の画像インデックスと遷移方向を管理
  const [curIndex, setCurIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  // =============================
  // 📌 モーダルを閉じる処理
  // =============================
  const handleClose = useCallback(() => {
    router.push("/", undefined, { shallow: true }).catch((error) => {
      console.error("ナビゲーションエラー:", error);
      toast({
        title: "エラー",
        description: "ページ遷移に失敗しました",
        variant: "destructive",
      });
    });
    if (onClose) onClose();
  }, [router, onClose, toast]);

  // =============================
  // 📌 画像を変更する処理
  // =============================
  const changePhotoId = useCallback(
    (newVal: number) => {
      if (newVal < 0 || newVal >= images.length) {
        toast({
          title: "警告",
          description: "指定された画像は存在しません",
          variant: "default",
        });
        return;
      }

      setDirection(newVal > curIndex ? 1 : -1);
      setCurIndex(newVal);

      router
        .push({ query: { photoId: newVal } }, `/p/${newVal}`, { shallow: true })
        .catch((error) => {
          console.error("ナビゲーションエラー:", error);
          toast({
            title: "エラー",
            description: "ページ遷移に失敗しました",
            variant: "destructive",
          });
        });
    },
    [curIndex, images.length, router, toast]
  );

  // =============================
  // 📌 キーボードショートカットの登録
  // =============================
  useKeypress("ArrowRight", () => {
    if (curIndex + 1 < images.length) {
      changePhotoId(curIndex + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (curIndex > 0) {
      changePhotoId(curIndex - 1);
    }
  });

  // =============================
  // 📌 ESCキーでのモーダルクローズ
  // =============================
  useKeypress("Escape", handleClose);

  // =============================
  // 📌 画像の有効性チェック
  // =============================
  useEffect(() => {
    if (images.length === 0) {
      if (images.length === 0) {
        toast({
          title: "エラー",
          description: "表示する画像がありません",
          variant: "destructive",
        });
        handleClose();
      }
      handleClose();
    }
  }, [images.length, handleClose, toast]);

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      {/* =============================
          📌 モーダル背景 (オーバーレイ)
          ============================= */}
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* =============================
          📌 画像を表示するメインモーダル
          ============================= */}
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  );
}

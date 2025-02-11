import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { downloadPhoto } from "@/utils/image";
import Twitter from "@/components/Icons/Twitter";
import type { ActionButtonsProps } from "@/utils/image/types";

/**
 * 📌 画像のアクションボタン（ダウンロード、共有、閉じる）
 */
export default function ActionButtons({ currentImage, index, closeModal }: ActionButtonsProps) {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
      {/* 📌 フルサイズ画像を開く */}
      <a
        href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`}
        className="p-2 transition rounded-full bg-black/50 text-white/75 hover:bg-black/75 hover:text-white"
        target="_blank"
        title="Open fullsize version"
        rel="noopener noreferrer"
      >
        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
      </a>

      {/* 📌 Twitter シェア */}
      <a
        href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20pic%20from%20Next.js%20Conf!%0A%0Ahttps://nextjsconf-pics.vercel.app/p/${index}`}
        className="p-2 transition rounded-full bg-black/50 text-white/75 hover:bg-black/75 hover:text-white"
        target="_blank"
        title="Share on Twitter"
        rel="noopener noreferrer"
      >
        <Twitter className="w-5 h-5" />
      </a>

      {/* 📌 画像ダウンロード */}
      <button
        onClick={() => downloadPhoto(
          `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`,
          `${index}.jpg`
        )}
        className="p-2 transition rounded-full bg-black/50 text-white/75 hover:bg-black/75 hover:text-white"
        type="button"
        title="Download fullsize version"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
      </button>

      {/* 📌 モーダルを閉じる */}
      <button
        onClick={closeModal}
        className="p-2 transition rounded-full bg-black/50 text-white/75 hover:bg-black/75 hover:text-white"
        type="button"
        title="Close modal"
        aria-label="Close modal"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface NavigationButtonsProps {
  index: number;
  images: { id: number }[];
  changePhotoId: (id: number) => void;
}

// 📌 ナビゲーションボタンコンポーネント
export default function NavigationButtons({ index, images, changePhotoId }: NavigationButtonsProps) {
  return (
    <>
      {index > 0 && (
        <button
          className="absolute p-3 text-white transition -translate-y-1/2 rounded-full left-3 top-1/2 bg-black/50 hover:bg-black/75"
          onClick={() => changePhotoId(index - 1)}
          type="button"
          aria-label="Previous image"
          title="Previous image"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}
      {index + 1 < images.length && (
        <button
          className="absolute p-3 text-white transition -translate-y-1/2 rounded-full right-3 top-1/2 bg-black/50 hover:bg-black/75"
          onClick={() => changePhotoId(index + 1)}
          type="button"
          aria-label="Next image"
          title="Next image"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

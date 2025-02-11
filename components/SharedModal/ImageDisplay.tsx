import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { ImageProps } from "@/utils/image/types";
import { slideVariants as variants } from "@/utils/styles";

interface ImageDisplayProps {
  currentImage: ImageProps;
  index: number;
  direction: number;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

// 📌 画像表示コンポーネント
export default function ImageDisplay({ currentImage, index, direction, loaded, setLoaded }: ImageDisplayProps) {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative flex aspect-[3/2] items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div key={index} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="absolute">
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1920/${currentImage.public_id}.${currentImage.format}`}
              width={1920}
              height={1280}
              priority
              alt="Next.js Conf image"
              onLoad={() => setLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

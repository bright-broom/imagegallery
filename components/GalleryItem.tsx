import Link from "next/link";
import Image from "next/image";
import type { ImageProps } from "@/utils/image/types";

// =============================
// 📌 ギャラリーアイテムコンポーネント
// =============================
const GalleryItem = ({
  id,
  public_id,
  format,
  blurDataUrl,
  lastViewedPhoto,
  lastViewedPhotoRef,
}: ImageProps & { lastViewedPhoto: string | null; lastViewedPhotoRef: React.RefObject<HTMLAnchorElement> }) => (
  <Link
    href={`/?photoId=${id}`}
    as={`/p/${id}`}
    ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
    shallow
    className="relative block w-full mb-5 after:content group cursor-zoom-in"
  >
    <Image
      alt="Next.js Conf photo"
      className="rounded-lg brightness-90 will-change-auto group-hover:brightness-110"
      placeholder="blur"
      blurDataURL={blurDataUrl}
      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
      width={720}
      height={480}
      sizes="(max-width: 640px) 100vw,
             (max-width: 1280px) 50vw,
             (max-width: 1536px) 33vw,
             25vw"
    />
  </Link>
);

export default GalleryItem;

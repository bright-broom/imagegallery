import EventCard from "./EventCard";
import GalleryItem from "./GalleryItem";
import type { ImageProps } from "@/utils/image/types";

// =============================
// 📌 ギャラリーコンポーネント
// =============================
const Gallery = ({
  images,
  lastViewedPhoto,
  lastViewedPhotoRef,
}: {
  images: ImageProps[];
  lastViewedPhoto: string | null;
  lastViewedPhotoRef: React.RefObject<HTMLAnchorElement>;
}) => (
  <div className="gap-4 columns-1 sm:columns-2 xl:columns-3 2xl:columns-4">
    <EventCard />
    {images.map((image) => (
      <GalleryItem
        key={image.id}
        {...image}
        lastViewedPhoto={lastViewedPhoto}
        lastViewedPhotoRef={lastViewedPhotoRef}
      />
    ))}
  </div>
);

export default Gallery;

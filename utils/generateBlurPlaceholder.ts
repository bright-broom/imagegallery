import type { ImageProps } from "./types";

export default async function generateBlurPlaceholder(image: ImageProps): Promise<string> {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_64/${image.public_id}.${image.format}`
  );
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/${image.format};base64,${base64}`;
}

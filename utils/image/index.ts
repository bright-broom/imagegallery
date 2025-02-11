/**
 * 📌 画像処理関連のユーティリティ関数
 * - Cloudinary から画像を取得
 * - ぼかしプレースホルダー生成
 * - 画像のダウンロード
 */

import type { CloudinaryResource, ImageProps } from "@/utils/image/types";

// ✅ `cloudinary` の読み込みをサーバーサイドのみに限定
let cloudinary: typeof import("cloudinary").v2 | null = null;
if (typeof window === "undefined") {
  const cloudinaryModule = require("cloudinary");
  cloudinary = cloudinaryModule.v2;

  // ✅ null チェックを追加
  if (cloudinary) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
      api_key: process.env.CLOUDINARY_API_KEY || "",
      api_secret: process.env.CLOUDINARY_API_SECRET || "",
      secure: true,
    });
  }
}

/**
 * 📌 Cloudinary から画像を取得し、ぼかしプレースホルダーを適用
 * @returns 画像データの配列
 */
export async function getPhotos(): Promise<ImageProps[]> {
  if (!cloudinary) {
    throw new Error("❌ `getPhotos()` はサーバーサイドでのみ実行してください。");
  }

  try {
    const results = await cloudinary.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .max_results(400)
      .execute();

    const images: ImageProps[] = results.resources.map((image: CloudinaryResource, index: number) => ({
      id: index,
      height: image.height.toString(), // ✅ 型修正: `number` → `string`
      width: image.width.toString(), // ✅ 型修正: `number` → `string`
      public_id: image.public_id,
      format: image.format,
      blurDataUrl: "", // 初期値を空文字に設定
    }));

    // ✅ プレースホルダーを生成（並列処理）
    const blurDataUrls = await Promise.all(
      images.map(async (image) => {
        try {
          return await generateBlurPlaceholder(image);
        } catch {
          return ""; // 失敗時は空文字
        }
      })
    );

    // ✅ `blurDataURL` を適用
    return images.map((image, index) => ({
      ...image,
      blurDataUrl: blurDataUrls[index],
    }));
  } catch (error) {
    console.error("❌ Cloudinary からの画像取得に失敗:", error);
    return [];
  }
}

/**
 * 📌 画像のプレースホルダー（ぼかし）を生成
 * @param image - 画像情報
 * @returns Base64 エンコードされたぼかし画像URL
 */
export async function generateBlurPlaceholder(image: ImageProps): Promise<string> {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_64/${image.public_id}.${image.format}`
    );
    if (!response.ok) throw new Error("❌ ぼかし画像の取得に失敗");

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return `data:image/${image.format};base64,${base64}`;
  } catch (error) {
    console.error("❌ プレースホルダー生成エラー:", error);
    return ""; // エラー時は空文字を返す
  }
}

/**
 * 📌 画像をダウンロード
 * @param imageUrl - ダウンロードする画像のURL
 * @param filename - 保存するファイル名
 */
export async function downloadPhoto(imageUrl: string, filename: string): Promise<void> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("❌ 画像のダウンロードに失敗");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("❌ 画像のダウンロードエラー:", error);
    throw error;
  }
}

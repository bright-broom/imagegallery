/**
 * 📌 画像処理関連のユーティリティ関数
 * - Cloudinary から画像を取得
 * - ぼかしプレースホルダー生成
 * - 画像のダウンロード
 */

import type { CloudinaryResource, ImageProps } from "@/utils/image/types";
import { useMemo } from "react";

// カスタムエラークラスの定義
class CloudinaryError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message);
    this.name = 'CloudinaryError';
  }
}

// パフォーマンスモニタリング
const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    console.info(`⚡️ ${name} completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`❌ ${name} failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
};

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
 * 📌 画像のプレースホルダー（ぼかし）を生成
 * @param image - 画像情報
 * @returns Base64 エンコードされたぼかし画像URL
 */
export async function generateBlurPlaceholder(image: ImageProps): Promise<string> {
  return await measurePerformance("generateBlurPlaceholder", async () => {
    try {
      const response = await fetch(
        `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_64/${image.public_id}.${image.format}`
      );
      if (!response.ok) {
        throw new CloudinaryError(
          "ぼかし画像の取得に失敗しました",
          "BLUR_GENERATION_FAILED",
          response.status
        );
      }

      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return `data:image/${image.format};base64,${base64}`;
    } catch (error) {
      console.error("❌ プレースホルダー生成エラー:", error);
      return ""; // エラー時は空文字を返す
    }
  });
}

// メモ化されたプレースホルダー生成フック
export const useBlurPlaceholder = (image: ImageProps) => {
  return useMemo(() => generateBlurPlaceholder(image), [image]);
};

/**
 * 📌 Cloudinary から画像を取得し、ぼかしプレースホルダーを適用
 * @returns 画像データの配列
 */
export async function getPhotos(): Promise<ImageProps[]> {
  if (!cloudinary) {
    throw new CloudinaryError(
      "getPhotos()はサーバーサイドでのみ実行可能です",
      "SERVER_SIDE_ONLY"
    );
  }

  return await measurePerformance("getPhotos", async () => {
    try {
      if (!process.env.CLOUDINARY_FOLDER) {
        throw new CloudinaryError(
          "CLOUDINARY_FOLDERが設定されていません",
          "MISSING_CONFIG"
        );
      }

      const results = await cloudinary.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute();

      if (!results?.resources?.length) {
        console.warn("⚠️ 画像が見つかりませんでした");
        return [];
      }

      const images: ImageProps[] = results.resources.map((image: CloudinaryResource, index: number) => ({
        id: index,
        height: image.height,
        width: image.width,
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
      if (error instanceof CloudinaryError) {
        throw error;
      }
      throw new CloudinaryError(
        "画像の取得に失敗しました",
        "FETCH_FAILED",
        500
      );
    }
  });
}

/**
 * 📌 画像をダウンロード
 * @param imageUrl - ダウンロードする画像のURL
 * @param filename - 保存するファイル名
 */
export async function downloadPhoto(imageUrl: string, filename: string): Promise<void> {
  return await measurePerformance("downloadPhoto", async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new CloudinaryError(
          "画像のダウンロードに失敗しました",
          "DOWNLOAD_FAILED",
          response.status
        );
      }

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
  });
}

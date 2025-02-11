/**
 * 📌 画像関連の型定義
 */

export interface CloudinaryResource {
  height: number;
  width: number;
  public_id: string;
  format: string;
}

export interface ImageProps {
  id: number;
  height: number; // 🔹 `string` から `number` に統一
  width: number;  // 🔹 `string` から `number` に統一
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

/**
 * 📌 SharedModal の Props 定義
 */
export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation?: boolean;
  direction?: number;
}

/**
 * 📌 ActionButtons の Props 定義
 */
export interface ActionButtonsProps {
  currentImage: ImageProps;
  index: number;
  closeModal: () => void;
}

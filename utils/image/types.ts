/**
 * 📌 画像関連の型定義
 */

/**
 * Cloudinary APIのレスポンス型
 */
export interface CloudinaryResource {
  height: number;
  width: number;
  public_id: string;
  format: string;
  secure_url?: string;
  folder?: string;
  resource_type?: string;
  created_at?: string;
  bytes?: number;
  tags?: string[];
}

/**
 * アプリケーション内で使用する画像型
 */
export interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  alt?: string;
  caption?: string;
}

/**
 * SharedModalのProps型
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
 * ActionButtonsのProps型
 */
export interface ActionButtonsProps {
  currentImage: ImageProps;
  index: number;
  closeModal: () => void;
}

/**
 * 画像処理のエラー型
 */
export interface ImageProcessingError {
  code: string;
  message: string;
  status?: number;
}

/**
 * 画像の読み込み状態
 */
export interface ImageLoadingState {
  isLoading: boolean;
  error?: ImageProcessingError;
  progress?: number;
}

/**
 * 画像の表示設定
 */
export interface ImageDisplayOptions {
  quality?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  placeholder?: "blur" | "empty";
}

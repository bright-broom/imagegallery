// =============================
// 📌 アイコンの管理ファイル
// =============================
import type { HTMLAttributes } from "react";

// =============================
// 📌 アイコン用の型定義
// =============================
type IconProps = HTMLAttributes<SVGElement>;

// =============================
// 📌 アイコンコンポーネント（タイトル追加）
// =============================
export const Icons = {
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <title>Logo Icon</title> {/* ✅ 修正: title追加 */}
      <rect width="256" height="256" fill="none" />
      <line x1="208" y1="128" x2="128" y2="208" stroke="currentColor" strokeWidth="32" />
      <line x1="192" y1="40" x2="40" y2="192" stroke="currentColor" strokeWidth="32" />
    </svg>
  ),
  bridge: (props: IconProps) => (
    <svg {...props}>
      <title>Bridge Icon</title> {/* ✅ 修正: title追加 */}
      {/* アイコンのパス */}
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg {...props}>
      <title>Twitter Icon</title> {/* ✅ 修正: title追加 */}
      {/* アイコンのパス */}
    </svg>
  ),
};

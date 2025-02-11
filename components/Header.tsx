import { useState } from "react";
import Link from "next/link";

// =============================
// 📌 ヘッダーコンポーネント
// =============================
export default function Header() {
  // 📌 モバイルメニューの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* ✅ ロゴ（ホームリンク） */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Portfolio</span>
        </Link>

        {/* ✅ デスクトップ用ナビゲーションメニュー */}
        <nav className="hidden space-x-6 md:flex">
          <NavItem href="/" label="Home" />
          <NavItem href="/about" label="About" />
          <NavItem href="/contact" label="Contact" />
        </nav>

        {/* ✅ モバイル用ハンバーガーメニュー */}
        <button
          type="button"
          className="text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* ✅ モバイル用ドロワーメニュー */}
      {isOpen && (
        <div className="bg-white border-t shadow-md md:hidden">
          <nav className="flex flex-col py-2">
            <NavItem href="/" label="Home" />
            <NavItem href="/about" label="About" />
            <NavItem href="/contact" label="Contact" />
          </nav>
        </div>
      )}
    </header>
  );
}

// =============================
// 📌 ナビゲーションリンクコンポーネント
// =============================
const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 md:hover:text-black">
    {label}
  </Link>
);

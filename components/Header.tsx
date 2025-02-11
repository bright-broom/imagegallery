import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-md bg-white/70">
      <div className="container flex items-center justify-between px-3 py-3 mx-auto">
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">MyApp</span>
        </Link>

        {/* ナビゲーションメニュー（デスクトップ用） */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-black">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-black">Contact</Link>
        </nav>

        {/* ハンバーガーメニュー（モバイル用） */}
        <button
          type="button" // 修正ポイント
          className="text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* モバイル用ドロワーメニュー */}
      {isOpen && (
        <div className="bg-white border-t shadow-md md:hidden">
          <nav className="flex flex-col py-2">
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
            <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
            <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * 📌 スタイルとアニメーション関連のユーティリティ
 * このモジュールには以下の機能が含まれています：
 * - Tailwindクラスのマージ機能
 * - アニメーションバリアント定義
 * - 範囲生成ユーティリティ
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 📌 Tailwindクラスをマージする
 * @param inputs - マージするクラス名の配列
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 📌 Framerモーションのアニメーションバリアント
 * スライドアニメーション用の設定オブジェクト
 */
export const slideVariants = {
  // 開始位置（画面外）
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  
  // 中央位置（表示位置）
  center: {
    x: 0,
    opacity: 1,
  },
  
  // 終了位置（画面外）
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

/**
 * 📌 指定された範囲の数値配列を生成
 * @param startOrEnd - 開始インデックスまたは終了インデックス
 * @param maybeEnd - 終了インデックス（オプション）
 * @returns 生成された数値配列
 */
export function range(end: number): number[];
export function range(start: number, end: number): number[];
export function range(startOrEnd: number, maybeEnd?: number): number[] {
  const start = maybeEnd === undefined ? 0 : startOrEnd;
  const end = maybeEnd === undefined ? startOrEnd : maybeEnd;
  const output: number[] = [];

  for (let i = start; i < end; i += 1) {
    output.push(i);
  }

  return output;
}
import React from "react";

// ナビゲーションアイテムタイプの定義
export type NavItemType = "link" | "button" | "logout";

// アイコン型の定義
export type IconType = React.FC<{ className?: string }>;

// 基本的なナビゲーションアイテムインターフェース
export interface BaseNavItem {
  label: string;
  icon: IconType | React.ReactNode;
  type: NavItemType;
}

// リンクタイプのナビゲーションアイテム
export interface LinkNavItem extends BaseNavItem {
  type: "link";
  href: string;
}

// ボタンタイプのナビゲーションアイテム
export interface ButtonNavItem extends BaseNavItem {
  type: "button";
  onClick: () => void;
}

// ログアウトタイプのナビゲーションアイテム
export interface LogoutNavItem extends BaseNavItem {
  type: "logout";
}

// すべてのナビゲーションアイテムタイプの統合
export type NavItem = LinkNavItem | ButtonNavItem | LogoutNavItem;

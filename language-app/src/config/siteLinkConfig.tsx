import React from "react";
import { handleExportCSV } from "@/lib/handleExportCsv";
import {
  Book,
  BookOpen,
  CheckCircle,
  Download,
  Home,
  LogOut,
  Search,
} from "lucide-react";
import { LinkNavItem, NavItem } from "@/types";

// メインナビゲーション（サイドバーとフッター共通）
export const mainNavigation: LinkNavItem[] = [
  {
    type: "link",
    href: "/",
    label: "ダッシュボード",
    icon: Home,
  },
  {
    type: "link",
    href: "/word-search",
    label: "フレーズ登録",
    icon: Book,
  },
  {
    type: "link",
    href: "/quiz",
    label: "練習",
    icon: CheckCircle,
  },
];

// ダッシュボードのクイックアクション
export const quickActions: NavItem[] = [
  {
    type: "link",
    href: "/word-search",
    label: "検索",
    icon: <Search className="w-full h-full" />,
  },
  {
    type: "link",
    href: "/quiz",
    label: "練習を開始",
    icon: <BookOpen className="w-full h-full" />,
  },
  {
    type: "button",
    label: "エクスポート",
    icon: <Download className="w-full h-full" />,
    onClick: handleExportCSV,
  },
  {
    type: "logout",
    label: "ログアウト",
    icon: <LogOut className="w-full h-full" />,
  },
];

// ユーティリティアクション（設定、ログアウトなど）
export const utilityNavigation: NavItem[] = [
  {
    type: "button",
    label: "エクスポート",
    icon: Download,
    onClick: handleExportCSV,
  },
  {
    type: "logout",
    label: "ログアウト",
    icon: LogOut,
  },
];

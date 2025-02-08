import { BookOpen, LogOut, Search } from "lucide-react";

// クイックアクションのオブジェクト配列
export const quickActions = [
  {
    type: "link",
    href: "/word-search",
    label: "フレーズを検索",
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
    // ボタンの場合は href ではなく action タイプにする
    label: "ログアウト",
    icon: <LogOut className="w-full h-full" />,
  },
];

import { handleExportCSV } from "@/lib/handleExportCsv";
import { BookOpen, Download, LogOut, Search } from "lucide-react";

// クイックアクションのオブジェクト配列
export const quickActions = [
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
    // ボタンの場合は href ではなく action タイプにする
    label: "ログアウト",
    icon: <LogOut className="w-full h-full" />,
  },
];

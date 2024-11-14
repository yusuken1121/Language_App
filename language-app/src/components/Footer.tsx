"use client";
import { cn } from "@/lib/utils";
import { Book, CheckCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="sticky bottom-0 w-full h-[75px] flex items-center justify-around bg-primary mx-auto xl:hidden">
      <Link
        href="/word-search"
        className={cn(
          "flex flex-col items-center text-muted-foreground flex-1",
          pathname === "/word-search" && "text-background font-bold"
        )}
      >
        <Book className="w-6 h-6" />
        <span className="text-xs">フレーズ登録</span>
      </Link>
      <Link
        href="/quiz"
        className={cn(
          "flex flex-col items-center text-muted-foreground flex-1",
          pathname === "/quiz" && "text-background font-bold"
        )}
      >
        <CheckCircle className="w-6 h-6" />
        <span className="text-xs">クイズ</span>
      </Link>
    </footer>
  );
};

export default Footer;

"use client";
import { cn } from "@/lib/utils";
import { Book, CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="sticky bottom-0 w-full h-[75px] flex items-center justify-around bg-primary mx-auto xl:hidden">
      <Link
        href="/"
        className={cn(
          "flex flex-col items-center text-muted-foreground flex-1",
          pathname === "/" && "text-background font-bold"
        )}
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">ダッシュボード</span>
        </motion.div>
      </Link>
      <Link
        href="/word-search"
        className={cn(
          "text-muted-foreground flex-1",
          pathname === "/word-search" && "text-background font-bold"
        )}
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Book className="w-6 h-6" />
          <span className="text-xs">フレーズ登録</span>
        </motion.div>
      </Link>
      <Link
        href="/quiz"
        className={cn(
          "flex flex-col items-center text-muted-foreground flex-1",
          pathname === "/quiz" && "text-background font-bold"
        )}
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <CheckCircle className="w-6 h-6" />
          <span className="text-xs">クイズ</span>
        </motion.div>
      </Link>
    </footer>
  );
};

export default Footer;

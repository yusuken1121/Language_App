"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import { motion } from "motion/react";
import { mainNavigation } from "@/config/siteLinkConfig";

interface Props {
  className?: string;
}

const Footer = memo(function Footer({ className }: Props) {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "sticky bottom-0 w-full  flex items-center justify-around bg-primary shadow-shadow-top mx-auto xl:hidden",
        className
      )}
    >
      {mainNavigation.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon as React.FC<{ className?: string }>;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-muted-foreground flex-1",
              isActive && "text-background font-bold"
            )}
          >
            <motion.div
              className="flex flex-col items-center justify-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </motion.div>
          </Link>
        );
      })}
    </footer>
  );
});

export default Footer;

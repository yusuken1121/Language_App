"use client";
import ButtonInner from "@/components/atoms/ButtonInner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ResetBox = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <Button
      variant="outline"
      className={cn("flex items-center justify-center ", className)}
      onClick={handleReset}
      aria-label="Reset filters"
    >
      <ButtonInner icon={RotateCcw} label="リセット" />
    </Button>
  );
};

export default ResetBox;

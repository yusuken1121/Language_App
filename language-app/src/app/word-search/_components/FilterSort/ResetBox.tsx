"use client";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ResetBox = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <Button
      variant="outline"
      className="flex items-center bg-secondary justify-center w-12 h-12 rounded-full font-medium"
      onClick={handleReset}
      aria-label="Reset filters"
    >
      <RotateCcw className="w-10 h-10 text-background" />
    </Button>
  );
};

export default ResetBox;

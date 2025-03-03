"use client";

import ButtonInner from "@/components/atoms/ButtonInner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { memo } from "react";

type ResetBoxProps = {
  setOpen: (value: boolean) => void;
  className?: string;
  innerIconClassName?: string;
};

const ResetBox = memo(
  ({ setOpen, className, innerIconClassName }: ResetBoxProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleReset = React.useCallback(() => {
      router.push(pathname);
      setOpen(false);
    }, [router, pathname, setOpen]);

    return (
      <Button
        variant="outline"
        className={cn("flex items-center justify-center", className)}
        onClick={handleReset}
      >
        <ButtonInner
          icon={RotateCcw}
          label="リセット"
          innerIconClassName={innerIconClassName}
        />
      </Button>
    );
  }
);

ResetBox.displayName = "ResetBox";

export default ResetBox;

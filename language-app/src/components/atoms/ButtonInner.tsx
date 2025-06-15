import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { ButtonInnerProps } from "@/types";

const ButtonInner = memo(function ButtonInner({
  children,
  icon: Icon,
  label,
  innerIconClassName,
  textClassName,
  className,
}: ButtonInnerProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-12 font-medium gap-2",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-6 w-6 text-secondary-foreground font-medium",
            innerIconClassName
          )}
          aria-hidden="true"
        />
      )}
      {label && (
        <span className={cn("text-background text-md", textClassName)}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
});

ButtonInner.displayName = "ButtonInner";

export default ButtonInner;

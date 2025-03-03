import { cn } from "@/lib/utils";
import React, { memo, ReactNode } from "react";

type ButtonInnerProps = {
  children?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  innerIconClassName?: string;
  textClassName?: string;
  className?: string;
};

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

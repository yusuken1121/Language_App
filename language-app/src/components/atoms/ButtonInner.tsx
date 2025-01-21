import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type ButtonInnerProps = {
  children?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>; // or typeof React.Component
  label?: string;
  className?: string;
};

function ButtonInner({
  children,
  icon: Icon,
  label,
  className,
}: ButtonInnerProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-12 font-medium gap-2",
        className
      )}
    >
      {Icon && <Icon className="h-6 w-6 text-primary-background font-medium" />}
      {label && <span className="text-background text-md">{label}</span>}
      {children}
    </div>
  );
}

export default ButtonInner;

import React, { ReactNode } from "react";

type ButtonInnerProps = {
  children?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>; // or typeof React.Component
  label?: string;
};

function ButtonInner({
  children,
  icon: Icon,
  label,
}: ButtonInnerProps): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-12 font-medium gap-2">
      {Icon && <Icon className="h-6 w-6 text-background font-medium" />}
      {label && <span className="text-background text-md">{label}</span>}
      {children}
    </div>
  );
}

export default ButtonInner;

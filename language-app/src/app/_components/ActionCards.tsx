"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quickActions, IconType } from "@/config/siteLinkConfig";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

// Helper function to render icon correctly whether it's a component or React node
const renderIcon = (icon: IconType | React.ReactNode): React.ReactNode => {
  if (React.isValidElement(icon)) {
    return icon;
  }
  // If it's an IconType (React component), render it
  const IconComponent = icon as IconType;
  return <IconComponent className="w-full h-full" />;
};

export default function ActionCards({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {quickActions.map((action, index) => {
        if (action.type === "link") {
          if (!action.href) return (action.href = "");
          return (
            <Link key={index} href={action.href} passHref>
              <Card className="cursor-pointer hover:shadow-lg bg-secondary w-[125px] h-[125px] font-bold">
                <CardHeader className="hidden">
                  <CardTitle>{action.label}</CardTitle>
                </CardHeader>
                <CardContent className="relative h-full">
                  {/* Icon: absolutely centered */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {renderIcon(action.icon)}
                  </div>
                  {/* Label: absolutely positioned above the icon */}
                  {/* Adjust the bottom value according to your icon height; here we assume the icon is 24px tall */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ bottom: "calc(50% + 24px)" }}
                  >
                    <span className="text-xs">{action.label}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        } else if (action.type === "logout") {
          return (
            <SignOutButton key={index}>
              <Card className="cursor-pointer hover:shadow-lg w-[125px] h-[125px] bg-secondary font-bold">
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span className="text-xs">{action.label}</span>
                  <span>{renderIcon(action.icon)}</span>
                </CardContent>
              </Card>
            </SignOutButton>
          );
        } else if (action.type === "button") {
          return (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg w-[125px] h-[125px] bg-secondary font-bold"
            >
              <CardContent>
                <button
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-xs">{action.label}</span>
                  <span className="">{renderIcon(action.icon)}</span>
                </button>
              </CardContent>
            </Card>
          );
        }
        return null;
      })}
    </div>
  );
}

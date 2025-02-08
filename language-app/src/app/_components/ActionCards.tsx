import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quickActions } from "@/config/siteLinkConfig";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

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
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span className="text-xs">{action.label}</span>
                  <span className="">{action.icon}</span>
                </CardContent>
              </Card>
            </Link>
          );
        } else if (action.type === "button") {
          return (
            <SignOutButton key={index}>
              <Card className="cursor-pointer hover:shadow-lg w-[125px] h-[125px] bg-secondary font-bold">
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <span className="text-xs">{action.label}</span>
                  <span className="">{action.icon}</span>
                </CardContent>
              </Card>
            </SignOutButton>
          );
        }
        return null;
      })}
    </div>
  );
}

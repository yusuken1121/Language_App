"use client";
import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import { mainNavigation, utilityNavigation } from "@/config/siteLinkConfig";

export const AppSidebar = memo(function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="shadow-lg h-full">
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2 mb-5">English Learning</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon as React.FC<{ className?: string }>;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild className="w-4/5 text-lg mx-auto">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent/70 hover:text-sidebar-primary-foreground hover:font-bold mb-4",
                      isActive &&
                        "bg-sidebar-accent hover:bg-sidebar-accent/90 text-sidebar-primary-foreground hover:text-sidebar-primary-foreground font-bold"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {utilityNavigation.map((item) => {
            if (item.type === "logout") {
              const LogoutIcon = item.icon as React.FC<{ className?: string }>;
              return (
                <SidebarMenuItem key="logout">
                  <SignOutButton>
                    <SidebarMenuButton
                      asChild
                      className="w-4/5 text-lg mx-auto"
                    >
                      <button
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-background transition-all hover:text-primary hover:bg-sidebar-background"
                        aria-label={item.label}
                      >
                        <LogoutIcon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    </SidebarMenuButton>
                  </SignOutButton>
                </SidebarMenuItem>
              );
            }

            if (item.type === "button") {
              const ButtonIcon = item.icon as React.FC<{ className?: string }>;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className="w-4/5 text-lg mx-auto">
                    <button
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-background transition-all hover:text-primary hover:bg-sidebar-background"
                      onClick={item.onClick}
                      aria-label={item.label}
                    >
                      <ButtonIcon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            return null;
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
});

export const SidebarToggle = memo(function SidebarToggle() {
  return <SidebarTrigger />;
});

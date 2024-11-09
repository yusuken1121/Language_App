"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Home,
  Search,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
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
import { SignedOut, SignInButton } from "@clerk/nextjs";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Search, label: "Word Search", href: "/word-search" },
  { icon: BookOpen, label: "Quiz", href: "/quiz" },
  { icon: BarChart, label: "Progress", href: "/progress" },
];

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Sidebar className="shadow-lg h-full">
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">English Learning</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild className="mx-auto w-2/3">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent/70 hover:text-sidebar-primary-foreground hover:font-bold",
                    pathname === item.href &&
                      "bg-sidebar-accent hover:bg-sidebar-accent/90 text-sidebar-primary-foreground hover:text-sidebar-primary-foreground font-bold"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-accent"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => console.log("Logout clicked")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-[#FECF00]"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
                <SignedOut>
                  <SignInButton forceRedirectUrl="/dashboard" mode="modal" />
                </SignedOut>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarToggle() {
  return <SidebarTrigger />;
}

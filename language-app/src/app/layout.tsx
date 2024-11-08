import type { Metadata } from "next";
import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton,
} from "@clerk/nextjs";

import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, SidebarToggle } from "@/components/organisms/AppSidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex bg-background`}
        >
          <SidebarProvider>
            {/* AppSidebarが画面の高さ全体を使用するように修正 */}
            <AppSidebar />

            {/* メインコンテンツのラッパー */}
            <div className="flex flex-col flex-1 min-h-screen">
              <header className="h-16 flex items-center bg-background">
                <SidebarToggle />
              </header>
              <main className="flex-1 flex flex-col bg-background text-white">
                <div className="flex-1">{children}</div>
              </main>
            </div>
          </SidebarProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

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
import { Toaster } from "@/components/ui/sonner";

import Footer from "@/components/Footer";

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
  title: "AI日英フレーズ学習アプリ",
  description:
    "AIを駆使して、英語学習を革新的に効率化するアプリです。留学中に感じた「こんな機能があれば助かるのに」というリアルなニーズを反映し、語学学習者が直面する課題を解決するために設計しました。また、モバイルでの直感的な操作性と快適なユーザー体験を徹底的に重視しています。",
  icons: {
    icon: "/favicon.ico",
  },
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
              <header className="hidden md:flex w-full h-6 items-center bg-background mx-auto">
                <SidebarToggle />
              </header>
              <main className="flex-1 flex flex-col bg-background text-white">
                <div className="flex-1">{children}</div>
              </main>
              <Footer />
              <Toaster
                toastOptions={{
                  duration: 5000,
                }}
              />
            </div>
          </SidebarProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

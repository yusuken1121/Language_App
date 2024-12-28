import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, LogOut, Search, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";

import { apiClientFetch } from "@/config/apiClient";
import { SignOutButton } from "@clerk/nextjs";

export default async function Dashboard() {
  // SSR
  const { stats } = await apiClientFetch("dashboard");

  if (!stats) {
    console.error("Failed to fetch stats data");
    return (
      <div className="h-full flex items-center justify-center">
        データの読み込みに失敗しました。
      </div>
    );
  }

  const { total, reviewToday, completed } = stats;

  return (
    <div className="h-full flex flex-col gap-2 bg-background text-white p-6">
      <div className="grid gap-6">
        {/* 学習したフレーズ数 */}
        <Card className="bg-white text-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              学習済みのフレーズ数
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completed}/{total}
            </div>
            <Progress value={(completed / total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        {/* レビューすべきフレーズ */}
        <Card className="bg-white text-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              今日学習するフレーズ数
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewToday}</div>
            <p className="text-xs text-muted-foreground">
              今日復習が必要なフレーズ
            </p>
          </CardContent>
        </Card>

        {/* クイックアクション */}
        <div className="grid gap-6">
          <Card className="bg-white text-background">
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Link href="/word-search" passHref>
                  <Button className="w-full bg-secondary text-background hover:bg-secondary/80">
                    <Search className="mr-2 h-4 w-4" /> フレーズを検索
                  </Button>
                </Link>
                <Link href="/quiz" passHref>
                  <Button className="w-full bg-secondary text-background hover:bg-secondary/80">
                    <BookOpen className="mr-2 h-4 w-4" /> フレーズの確認を開始
                  </Button>
                </Link>
                <SignOutButton>
                  <Button className="w-full bg-secondary text-background hover:bg-secondary/80">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </SignOutButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

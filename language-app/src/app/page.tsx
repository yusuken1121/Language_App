import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";
import { apiClientFetch } from "@/config/apiClient";
import ActionCards from "./_components/ActionCards";

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

        {/* アクション */}
        <div className="grid gap-6">
          <Card className="text-background">
            <CardHeader>
              <CardTitle>アクション</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ActionCards className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-2 flex-wrap" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Search, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  // In a real app, these would be fetched from an API or state management system
  const userStats = {
    wordsLearned: 150,
    totalWords: 1000,
    quizScore: 85,
    streak: 7,
  };
  const { userId, redirectToSignIn } = await auth();

  console.log("userId⭐️", await auth());
  return (
    <div className="min-h-screen bg-[#181059] text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, User!</h1>
        <Button variant="ghost" className="text-white hover:text-[#FECF00]">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white text-[#181059]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Words Learned</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.wordsLearned}/{userStats.totalWords}
            </div>
            <Progress
              value={(userStats.wordsLearned / userStats.totalWords) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card className="bg-white text-[#181059]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quiz Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.quizScore}%</div>
            <p className="text-xs text-muted-foreground">Average score</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-[#181059]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.streak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-[#181059]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Words to Review
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Words due for review
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white text-[#181059] col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Completed daily quiz - Score: 90%</li>
              <li>Learned 5 new words</li>
              <li>Reviewed 20 words</li>
              <li>Achieved 7-day streak</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white text-[#181059]">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/word-search" passHref>
              <Button className="w-full bg-[#FECF00] text-[#181059] hover:bg-[#FECF00]/80">
                <Search className="mr-2 h-4 w-4" /> Search Words
              </Button>
            </Link>
            <Link href="/quiz" passHref>
              <Button className="w-full bg-[#FECF00] text-[#181059] hover:bg-[#FECF00]/80">
                <BookOpen className="mr-2 h-4 w-4" /> Start Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

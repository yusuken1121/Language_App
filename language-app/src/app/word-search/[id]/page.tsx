"use client";

import { Word } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Bookmark, Star, StarOff, Trash } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { BasicInfoCard } from "./_components/BasicInfoCard";
import { UsageInfoCard } from "./_components/UsageInfoCard";
import { LearningContextCard } from "./_components/LearningContextCard";
import { ProgressCard } from "./_components/ProgressCard";
import { MemoCard } from "./_components/MemoCard";
import { formatDate } from "@/lib/wordCard";
import LottieLoading from "@/components/LottieLoading";
import { cn } from "@/lib/utils";

export default function WordSearchPage() {
  const [word, setWord] = useState<Word>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const data = await fetch(`/api/words/${params.id}`, {
          cache: "no-cache",
        });
        const wordData = await data.json();

        setWord(wordData.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch word details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWord();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await fetch(`/api/words/${params.id}`, { method: "DELETE" });
      toast.success("Word deleted");
      router.push("/word-search");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete word");
    }
  };

  const handleFavorite = async () => {
    try {
      const updatedFavoriteStatus = !word?.favorite;
      await fetch(`/api/words/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: updatedFavoriteStatus }),
      });
      setWord((prev) => prev && { ...prev, favorite: updatedFavoriteStatus });
      toast.success(
        updatedFavoriteStatus
          ? "お気に入りに登録しました。"
          : "お気に入りから削除しました。"
      );
    } catch (error) {
      console.error(error);
      toast.error("お気に入り登録に失敗しました。");
    }
  };

  return (
    <div className="h-full p-6">
      {isLoading ? (
        <LottieLoading />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/word-search">
              <Button
                variant="ghost"
                className="hover:text-accent-foreground px-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> 一覧に戻る
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">{word?.wordName}</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="bg-secondary text-accent-foreground hover:bg-accent/80"
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className={`${
                  word?.favorite ? "bg-accent" : "bg-accent"
                } text-accent-foreground hover:bg-accent/80`}
                onClick={handleFavorite}
              >
                {word?.favorite ? (
                  <StarOff className="h-4 w-4" />
                ) : (
                  <Star className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Basic Information Card */}
            <BasicInfoCard
              meaning={word?.meaning || ""}
              etymology={word?.etymology || ""}
            />

            {/* Usage Information Card */}
            <UsageInfoCard
              pronunciation={word?.pronunciation || ""}
              usageArea={word?.usageArea || ""}
              formalityLevel={word?.formalityLevel || ""}
              synonym={word?.synonym || ""}
            />

            {/* Learning Context Card */}
            <LearningContextCard
              exampleSentence={word?.exampleSentence || ""}
              contextLearning={word?.contextLearning || ""}
            />

            {/* Progress Card */}
            <ProgressCard
              learningStatus={word?.learningStatus || 0}
              correctCount={word?.correctCount || 0}
              lastCorrectAt={formatDate(word?.lastCorrectAt || null)}
              nextReviewAt={formatDate(word?.nextReviewAt || null)}
            />

            {/* Memo Card */}
            <MemoCard memo={word?.memo || ""} id={params.id as string} />
          </div>
        </div>
      )}
    </div>
  );
}

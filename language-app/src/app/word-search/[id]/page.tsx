"use client";

import { Word } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, StarOff } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { BasicInfoCard } from "@/app/word-search/[id]/_components/cards/BasicInfoCard";
import { UsageInfoCard } from "@/app/word-search/[id]/_components/cards/UsageInfoCard";
import { LearningContextCard } from "@/app/word-search/[id]/_components/cards/LearningContextCard";
import { ProgressCard } from "@/app/word-search/[id]/_components/cards/ProgressCard";
import { MemoCard } from "@/app/word-search/[id]/_components/cards/MemoCard";
import { formatDate } from "@/lib/wordCard";
import LottieLoading from "@/components/LottieLoading";
import { DeleteDialog } from "@/app/word-search/[id]/_components/dialogs/DeleteDialog";
import LottieNotFound from "@/components/LottieNotFound";
import TextToSpeechButton from "@/components/TextToSpeechButton";
import { ERROR_MESSAGES } from "@/config/errorMessage";

export default function WordSearchPage() {
  const [word, setWord] = useState<Word>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

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
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchWord();
  }, [params.id]);

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
          : "お気に入りから削除しました。",
        { position: "top-center" }
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center" });
      } else {
        toast.error(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED, {
          position: "top-center",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-4/5">
        <LottieLoading />
      </div>
    );
  }

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center h-4/5">
        <div>
          <div className="text-2xl text-accent">
            そのフレーズは登録されていません
          </div>
          <LottieNotFound />
        </div>
      </div>
    );
  }

  if (word) {
    return (
      <div className="h-full p-6">
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
          <div className="flex items-center justify-between mb-8 ">
            <h1 className="flex items-center gap-2 text-3xl font-bold break-words max-w-[250px] sm:max-w-full">
              <TextToSpeechButton text={word.wordName} />
              {word?.wordName}
            </h1>
            <div className="flex items-center space-x-2">
              {/* 削除ボタン */}
              <DeleteDialog />

              {/* お気に入りボタン */}
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
              pronunciation={word?.pronunciation || ""}
            />

            {/* Usage Information Card */}
            <UsageInfoCard
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
              createdAt={formatDate(word?.lastCorrectAt || null)}
              nextReviewAt={formatDate(word?.nextReviewAt || null)}
            />

            {/* Memo Card */}
            <MemoCard memo={word?.memo || ""} id={params.id as string} />
          </div>
        </div>
      </div>
    );
  }
}

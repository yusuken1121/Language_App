"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizWord } from "@/types";

import QuizAnswer from "@/app/quiz/_components/QuizAnswer";
import Link from "next/link";
import LottieLoading from "@/components/LottieLoading";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/config/errorMessage";
import QuizStartDescription from "@/app/quiz/_components/organisms/QuizStartDescription";

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState<QuizWord | null>(null);
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set());
  const [remainingWords, setRemainingWords] = useState<QuizWord[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [triggerNextWord, setTriggerNextWord] = useState(false); // 新しいトリガーステート
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);

  // Fetch quiz words
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/quiz");
        const data: QuizWord[] = await response.json();
        setRemainingWords(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
        }
      } finally {
        setIsInitLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (triggerNextWord) {
      nextWord();
      setTriggerNextWord(false);
    }
  }, [remainingWords, triggerNextWord]);

  // Start quiz
  const startQuiz = () => {
    setQuizStarted(true);
    nextWord();
  };

  // Handle "覚えた" button
  const handleCheck = async () => {
    setIsLoading(true);
    if (currentWord) {
      setLearnedWords(new Set(learnedWords).add(currentWord.id));
      setRemainingWords(
        remainingWords.filter((word) => word.id !== currentWord.id)
      );
    }
    try {
      await fetch(`/api/quiz`, {
        method: "PUT",
        body: JSON.stringify({ id: currentWord?.id }),
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
      }
    } finally {
      setIsLoading(false);
    }
    setTriggerNextWord(true); // trigger nextWord
  };

  // Handle "答えを見る" button
  const handleExplanation = () => {
    setShowExplanation(true);
  };

  // Handle "忘れた" button
  const handleCross = () => {
    nextWord();
  };

  // Handle "後で復習" button
  const handleReviewLater = () => {
    if (currentWord) {
      setLearnedWords(new Set(learnedWords).add(currentWord.id));
      setRemainingWords((prevWords) =>
        prevWords.filter((word) => word.id !== currentWord.id)
      );
    }
    setTriggerNextWord(true); // trigger nextWord
  };

  // Show next word
  const nextWord = () => {
    setShowExplanation(false);
    if (remainingWords.length > 0) {
      const nextWordIndex = Math.floor(Math.random() * remainingWords.length);
      setCurrentWord(remainingWords[nextWordIndex]);
    } else {
      setQuizEnded(true);
    }
  };

  // init loading
  if (isInitLoading) {
    return (
      <div className="flex items-center justify-center h-4/5">
        <LottieLoading />
      </div>
    );
  }

  // Render quiz start page
  if (!quizStarted) {
    return remainingWords.length > 0 ? (
      <div className="h-full bg-background flex flex-col items-center justify-center p-4 gap-10">
        <Card className="w-full max-w-md text-center ">
          <CardHeader>
            <CardTitle className="text-2xl text-background">
              英フレーズ学習
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={startQuiz} variant="accent">
              フレーズの練習を開始
            </Button>
          </CardContent>
        </Card>

        {/* クイズの説明 */}
        <QuizStartDescription />
      </div>
    ) : (
      <div className="h-full bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center ">
          <CardHeader>
            <CardTitle className="text-2xl text-background">
              英フレーズ学習
            </CardTitle>
          </CardHeader>
          <CardContent>今日学習するフレーズはありません！</CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/word-search">
              <Button variant="accent">今日の学習を追加する</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (quizEnded) {
    return (
      <div className="h-full bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center ">
          <CardHeader>
            <CardTitle className="text-2xl text-background">
              フレーズ確認終了
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">
              今日覚えたフレーズの数: {learnedWords.size}
            </p>
            <Link href="/word-search">
              <Button variant="accent">今日の学習を追加する</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showExplanation) {
    return (
      <QuizAnswer
        currentWord={currentWord}
        nextWord={nextWord}
        handleCross={handleCross}
        handleReviewLater={handleReviewLater}
        handleCheck={handleCheck}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="h-full w-full bg-background flex items-center justify-center px-2">
      <Card className="w-full max-w-2xl ">
        <CardHeader>
          <CardTitle className="text-xl text-background">
            進捗: {learnedWords.size} /{" "}
            {learnedWords.size + remainingWords.length}
          </CardTitle>
          <Progress
            value={
              (learnedWords.size /
                (learnedWords.size + remainingWords.length)) *
              100
            }
            className="w-full"
          />
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <Card className="w-full mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl text-center text-background font-bold">
                {currentWord?.meaning}
              </h2>
            </CardContent>
          </Card>

          <div className="flex flex-col w-full lg:flex-row justify-center gap-4">
            <Button
              onClick={handleExplanation}
              variant="secondary"
              className="w-full font-bold"
            >
              答えを見る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

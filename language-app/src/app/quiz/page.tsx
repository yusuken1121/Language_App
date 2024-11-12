"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Word } from "@prisma/client";
import { Check, X } from "lucide-react";

import QuizAnswer from "./_components/QuizAnswer";

export type QuizWord = Pick<
  Word,
  | "id"
  | "wordName"
  | "meaning"
  | "exampleSentence"
  | "contextLearning"
  | "etymology"
  | "synonym"
  | "formalityLevel"
  | "pronunciation"
  | "usageArea"
  | "learningStatus"
>;
// type QuizWord = Word;

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState<QuizWord | null>(null);

  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set());
  const [remainingWords, setRemainingWords] = useState<QuizWord[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  // Fetch quiz words
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/quiz");
        const data: QuizWord[] = await response.json();

        setRemainingWords(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, []);

  // Start quiz
  const startQuiz = () => {
    setQuizStarted(true);
    nextWord();
  };

  // Handle quiz answer
  const handleCheck = async () => {
    if (currentWord) {
      setLearnedWords(new Set(learnedWords).add(currentWord.id)); // Add current word to learned words
      setRemainingWords(
        remainingWords.filter((word) => word.id !== currentWord.id)
      ); // Remove current word from remaining words
    }

    // Update learning status
    try {
      await fetch(`/api/quiz`, {
        method: "PUT",
        body: JSON.stringify({ id: currentWord?.id }),
      });
    } catch (error) {
      console.error(error);
    }

    setShowExplanation(true); // Show explanation
  };

  const handleCross = () => {
    setShowExplanation(true); // Show explanation
  };

  const nextWord = () => {
    setShowExplanation(false);
    if (remainingWords.length > 0) {
      const nextWordIndex = Math.floor(Math.random() * remainingWords.length);
      setCurrentWord(remainingWords[nextWordIndex]);
    } else {
      setQuizEnded(true);
    }
  };

  // Show quiz start
  if (!quizStarted) {
    return (
      <div className="h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-background">
              英単語学習クイズ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={startQuiz}
              className="bg-accent text-background hover:bg-accent/80"
            >
              クイズを開始
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show quiz end
  if (quizEnded) {
    return (
      <div className="h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-background">
              クイズ終了
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">
              今日覚えた単語の数: {learnedWords.size}
            </p>
            <Button
              onClick={() => {
                setQuizStarted(false);
                setQuizEnded(false);
                setLearnedWords(new Set());
                setRemainingWords([]);
              }}
              className="bg-accent text-background hover:bg-accent/80"
            >
              もう一度挑戦する
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show quiz answer
  if (showExplanation) {
    return <QuizAnswer currentWord={currentWord} nextWord={nextWord} />;
  }

  // Show quiz progress
  return (
    <div className="h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white">
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

        {/* Show question */}
        <CardContent className="flex flex-col items-center">
          <Card className="w-full mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl text-center text-background font-bold">
                {currentWord?.meaning}
              </h2>
            </CardContent>
          </Card>

          {/* Show answer buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleCross}
              className="bg-accent text-background hover:bg-accent/80 font-bold"
              size="lg"
            >
              <X className="mr-2 h-4 w-4" /> 忘れた
            </Button>
            <Button
              onClick={handleCheck}
              className="bg-secondary hover:bg-secondary/80 text-background font-bold"
              size="lg"
            >
              <Check className="mr-2 h-4 w-4" /> 覚えた
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

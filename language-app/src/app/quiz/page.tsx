"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Word } from "@prisma/client";
import { cn } from "@/lib/utils";

type QuizWord = Pick<Word, "id" | "wordName" | "meaning">;
type Quiz = {
  answer: QuizWord;
  options: QuizWord[];
};

// Function to select a random quiz question
const chooseRandomQuiz = (quizWords: QuizWord[]): Quiz => {
  const answerIndex = Math.floor(Math.random() * quizWords.length);
  const answer = quizWords[answerIndex];

  const optionsSet = new Set<QuizWord>();
  optionsSet.add(answer);

  while (optionsSet.size < 4) {
    const randomOption =
      quizWords[Math.floor(Math.random() * quizWords.length)];
    optionsSet.add(randomOption);
  }

  const options = Array.from(optionsSet);
  options.sort(() => Math.random() - 0.5);
  console.log("options🚀", options);

  return { answer, options };
};

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizWords, setQuizWords] = useState<QuizWord[]>([]);

  // Fetch quiz words from the API
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/quiz");
        const data = await response.json();
        setQuizWords(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, []);

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setShowResult(false);
    setCurrentQuiz(chooseRandomQuiz(quizWords));
  };

  // Handle the answer
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (currentQuiz && answer === currentQuiz.answer.wordName) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = useCallback(() => {
    setSelectedAnswer("");
    setCurrentQuiz(chooseRandomQuiz(quizWords));
  }, [quizWords]);

  useEffect(() => {
    if (selectedAnswer) {
      const timer = setTimeout(() => {
        if (quizWords.length > 0) {
          nextQuestion();
        } else {
          setShowResult(true);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, nextQuestion, quizWords.length]);

  if (!quizStarted) {
    return (
      <div className="h-full bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">English Vocabulary Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={startQuiz}
              className="bg-accent text-accent-foreground hover:bg-accent/80"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="h-full bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">
              {score} / {quizWords.length}
            </p>
            <Button
              onClick={startQuiz}
              className="bg-accent text-accent-foreground hover:bg-accent/80"
            >
              Retry Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card">
        <CardHeader>
          <CardTitle className="text-xl">
            Question {score + 1} of {quizWords.length}
          </CardTitle>
          <Progress
            value={(score / quizWords.length) * 100}
            className="w-full"
          />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl my-10 text-center">
            {currentQuiz?.answer.meaning}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {currentQuiz?.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.wordName)}
                className={cn(
                  "hover:opacity-80 h-[150px] break-words whitespace-normal text-background text-2xl",
                  selectedAnswer &&
                    option.wordName === currentQuiz.answer.wordName
                    ? "bg-primary"
                    : "bg-accent"
                )}
                disabled={!!selectedAnswer}
              >
                {option.wordName}
              </Button>
            ))}
          </div>
          {selectedAnswer && (
            <p className="mt-4 text-center">
              {selectedAnswer === currentQuiz?.answer.wordName
                ? "Correct!"
                : `Incorrect. The correct answer is "${currentQuiz?.answer.wordName}".`}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

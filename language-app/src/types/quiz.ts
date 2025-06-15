import { Word } from "@prisma/client";

// クイズで使用する単語の型定義
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

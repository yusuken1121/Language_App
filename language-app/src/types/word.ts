import { Word } from "@prisma/client";

// Prisma Client の Word 型を再エクスポート（便利なアクセスのため）
export type { Word } from "@prisma/client";

// 発音データの型定義
export interface PronunciationType {
  american: string;
  british: string;
}

// 基本情報カードのProps
export interface BasicInfoCardProps {
  meaning: string;
  etymology: string;
  pronunciation: string;
}

// 使用情報カードのProps
export interface UsageInfoCardProps {
  usageArea: string;
  formalityLevel: string;
  synonym: string;
}

// 学習コンテキストカードのProps
export interface LearningContextCardProps {
  exampleSentence: string;
  contextLearning: string;
}

// 進捗カードのProps
export interface ProgressCardProps {
  learningStatus: number;
  createdAt: string | null;
  nextReviewAt: string | null;
}

// メモカードのProps
export interface MemoCardProps {
  memo: string;
  id: string;
}

// 単語カードのProps
export interface WordCardProps {
  word: Word;
  className?: string;
}

// ソート種類
export type SortType = "latest" | "oldest" | "asc" | "desc";

import { z } from "zod";

// 基本となる英語フレーズのバリデーションスキーマ
const baseEnglishPhraseSchema = z
  .string()
  .min(1, { message: "フレーズを入力してください。" })
  .regex(/^[A-Za-z\s.,?!'"'`;:-]+$/, {
    message: "英字、スペース、句読点のみ入力可能です。",
  });

// wordSchema - 単一の単語・フレーズのバリデーション
export const wordSchema = z.object({
  word: baseEnglishPhraseSchema,
});

// 新規フレーズ作成用のスキーマ
export const newPhraseSchema = z.object({
  createPhrase: baseEnglishPhraseSchema,
});

// エクスポートして他の場所でも再利用可能にする
export const validations = {
  baseEnglishPhraseSchema,
};

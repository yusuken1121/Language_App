import { z } from "zod";

// wordSchema
export const wordSchema = z.object({
  word: z
    .string()
    .min(1, { message: "フレーズを入力してください。" })
    .regex(/^[A-Za-z\s.,?!'"'`;:-]+$/, {
      message: "英字、スペース、句読点のみ入力可能です。",
    }),
});

export const newPhraseSchema = z.object({
  createPhrase: z
    .string()
    .min(1, { message: "フレーズを入力してください。" })
    .regex(/^[A-Za-z\s.,?!'"'`;:-]+$/, {
      message: "英字、スペース、句読点のみ入力可能です。",
    }),
});

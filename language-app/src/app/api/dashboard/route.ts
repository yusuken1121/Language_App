export const dynamic = "force-dynamic";

import { ERROR_MESSAGES } from "@/config/errorMessage";
import { getUserId } from "@/lib/auth";
import { createErrorResponse } from "@/lib/backend/createErrorResponse";
import { getErrorMessage } from "@/lib/getErrorMessage";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
    }

    // 単語の統計を一括取得
    const [allWords, reviewWords, learnedWords] = await Promise.all([
      prisma.word.count({
        where: {
          userId,
        },
      }),

      //復習するword
      prisma.word.count({
        where: {
          userId,
          nextReviewAt: {
            lte: new Date(),
          },
        },
      }),

      // 完了済みword
      prisma.word.count({
        where: {
          userId,
          learningStatus: 99,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        total: allWords,
        reviewToday: reviewWords,
        completed: learnedWords,
      },
    });
  } catch (error) {
    console.error("Error fetching word statistics:", error);
    const errorMessage = getErrorMessage(error);
    return createErrorResponse(errorMessage, 500);
  }
}

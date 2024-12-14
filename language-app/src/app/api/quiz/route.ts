import { ERROR_MESSAGES } from "@/config/errorMessage";
import { getUserId } from "@/lib/auth";
import { createErrorResponse } from "@/lib/backend/createErrorResponse";
import { getErrorMessage } from "@/lib/getErrorMessage";
import prisma from "@/lib/prisma";
import { addDays } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
  }
  try {
    const words = await prisma.word.findMany({
      where: {
        userId: userId,
        learningStatus: {
          gte: 1, // 未学習
          lte: 2, // 学習中
        },
        nextReviewAt: {
          lte: new Date(), // 次の復習日が今日以前
        },
      },
      select: {
        id: true,
        wordName: true,
        meaning: true,
        etymology: true,
        exampleSentence: true,
        contextLearning: true,
        synonym: true,
        formalityLevel: true,
        pronunciation: true,
        usageArea: true,
        learningStatus: true,
      },
    });
    if (words.length === 0) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.QUIZ.NOT_FOUND, 404);
    }
    const randomQuiz = words
      .sort(() => Math.random() - 0.5) // ランダムな順序に並び替え
      .slice(0, 10);

    return NextResponse.json(randomQuiz);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

export async function PUT(request: Request) {
  const userId = await getUserId();
  if (!userId) {
    return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
  }
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.API.INVALID, 400);
    }

    // Fetch the word from the database
    const word = await prisma.word.findUnique({
      where: { userId: userId, id: id },
    });

    if (!word) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.QUIZ.NOT_FOUND, 404);
    }
    const { nextReviewAt, learningStatus } = word;
    let newLearningStatus;
    let newNextReviewAt;
    switch (learningStatus) {
      case 1:
        newLearningStatus = 2;
        newNextReviewAt = addDays(new Date(), 1);
        break;
      case 2:
        newLearningStatus = 3;
        newNextReviewAt = addDays(new Date(), 7);
        break;
      case 3:
        newLearningStatus = 4;
        newNextReviewAt = addDays(new Date(), 30);
        break;
      case 4:
        newLearningStatus = 99;
        break;
      default:
        newLearningStatus = learningStatus;
        newNextReviewAt = nextReviewAt;
        break;
    }
    const updatedWord = await prisma.word.update({
      where: { userId: userId, id: id },
      data: {
        learningStatus: newLearningStatus,
        nextReviewAt: newNextReviewAt,
      },
    });
    return NextResponse.json(updatedWord);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

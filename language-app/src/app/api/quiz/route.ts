import { getUserId } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    const words = await prisma.word.findMany({
      where: {
        userId: userId,
        learningStatus: {
          gte: 1, // 未学習
          lte: 2, // 学習中
        },
        // nextReviewAt: {
        //   lte: new Date(), // 次の復習日が今日以前
        // },
      },
      select: {
        id: true,
        wordName: true,
        meaning: true,
      },
    });
    if (words.length === 0) {
      return NextResponse.json({ error: "No quiz found" }, { status: 404 });
    }
    const randomQuiz = words
      .sort(() => Math.random() - 0.5) // ランダムな順序に並び替え
      .slice(0, 10);
    console.log("randomQuiz", randomQuiz);
    return NextResponse.json(randomQuiz);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { GEMINI_API_KEY } from "@/config/ENV";
import { getUserId } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Next.jsの場合に使用

// const prompt = `JSON形式で単語「{word}」に関する情報を提供してください。以下の項目を厳密なJSON形式で出力してください。

// * **etymology:** 語源（英語）
// * **exampleSentence:** 例文（英語）
// * **contextLearning:** 使用状況（英語）
// * **pronunciation:** 発音
//   * **american:** アメリカ英語の発音（国際音声記号）
//   * **british:** イギリス英語の発音（国際音声記号）
// * **usageLevel:** 使用レベル（1:formal または 2:casual）

// **出力例:**
// {
//   "etymology": "From Greek...",
//   "exampleSentence": "The etymology...",
//   "contextLearning": "Etymology is often used...",
//   "pronunciation": {
//     "american": "/ˌɛtɪˈmɑːlədʒi/",
//     "british": "/ˌɛtɪˈmɒlədʒi/"
//   },
//   "usageLevel": "1"
// }
// `;

const prompt = `JSON形式で単語「{word}」に関する情報を提供してください。以下の項目を厳密なJSON形式で出力してください。

* **etymology:** 語源（日本語）: 単語の由来
* **exampleSentence:** 例文（英語）: 単語を使った例文
* **contextLearning:** 使用状況（英語）: 単語が使用される文脈
* **pronunciation:** 発音
  * **american:** アメリカ英語の発音（国際音声記号）
  * **british:** イギリス英語の発音（国際音声記号）
* **usageLevel:** 使用レベル (1:フォーマル, 2:普通, 3:カジュアル)

**出力例:**
{
  "etymology": "ギリシャ語の～から派生", // 語源（日本語）
  "exampleSentence": "The etymology...", // 例文
  "contextLearning": "Etymology is often used...", // 使用状況
  "pronunciation": {
    "american": "/ˌɛtɪˈmɑːlədʒi/", // アメリカ英語の発音
    "british": "/ˌɛtɪˈmɒlədʒi/"  // イギリス英語の発音
  },
  "usageLevel": 1 // 使用レベル (1:フォーマル)
}
`;

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  try {
    const { searchTerm } = await request.json();
    if (!searchTerm) {
      return NextResponse.json(
        { error: "Search term is required" },
        { status: 400 }
      );
    }

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const run = async () => {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });
      const promptWithWord = prompt.replace("{word}", searchTerm);
      const result = await model.generateContent(promptWithWord);
      const response = await result.response;
      const text = response.text();
      if (!text) throw new Error("No response from the model");
      console.log("text🚀", text);
      return text;
    };

    const text = await run();
    const {
      etymology,
      exampleSentence,
      contextLearning,
      pronunciation,
      usageLevel,
    } = JSON.parse(text);

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + 1);

    const word = await prisma.word.create({
      data: {
        userId,
        wordName: searchTerm,
        etymology,
        exampleSentence,
        contextLearning,
        pronunciation: JSON.stringify(pronunciation), // JSON文字列に変換
        usageLevel: parseInt(usageLevel),
        learningSource: 1,
        learningStatus: 1,
        memo: "",
        correctCount: 0,
        lastCorrectAt: new Date(),
        nextReviewAt: nextReviewAt,
      },
    });

    return NextResponse.json({ data: word });
  } catch (error) {
    console.error("Error creating word:", error);
    return NextResponse.json(
      { error: error || "An error occurred" },
      { status: 500 }
    );
  }
}

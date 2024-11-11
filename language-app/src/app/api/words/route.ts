import { GEMINI_API_KEY } from "@/config/ENV";
import { getUserId } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Next.jsの場合に使用

const prompt = `JSON形式で単語「{word}」に関する情報を提供してください。以下の項目を厳密なJSON形式で出力してください。

* **etymology:** 語源（日本語）: 単語の由来
* **meaning:** 意味（日本語）: 単語の意味
* **exampleSentence:** 例文（英語）: 単語を使った例文
* **contextLearning:** 使用状況（日本語）: 単語が使用される文脈
* **pronunciation:** 発音
  * **american:** アメリカ英語の発音（国際音声記号）
  * **british:** イギリス英語の発音（国際音声記号）
* **synonym:** 同義語（英語）: 単語の同義語
* **formalityLevel:** 使用レベル (フォーマル, 普通, カジュアル)
* **usageArea:** 使用場所（英語）: 単語が使用される場所 (アメリカ、イギリス、オーストラリア、カナダ、世界共通、その他)
* **isExist:** 単語が存在するかどうか (true, false)

**出力例:**
{
  "etymology": "ギリシャ語の～から派生", // 語源（日本語）
  "meaning": "語源", // 意味（日本語）
  "exampleSentence": "The etymology...", // 例文
  "contextLearning": "Etymologyは何かを説明するときによく使われます。~", // 使用状況
  "pronunciation": {
    "american": "/ˌɛtɪˈmɑːlədʒi/", // アメリカ英語の発音
    "british": "/ˌɛtɪˈmɒlədʒi/"  // イギリス英語の発音
  },
  "synonym": "derivation", // 同義語
  "formalityLevel": "フォーマル", // 使用レベル 
  "usageArea": "アメリカ" // 使用場所
  "isExist": true // 単語が存在するかどうか
}
`;

const prisma = new PrismaClient();

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const words = await prisma.word.findMany({
      where: { userId },
    });

    return NextResponse.json({ data: words });
  } catch (error) {
    console.error("Error fetching words:", error);
    return NextResponse.json(
      { error: error || "An error occurred" },
      { status: 500 }
    );
  }
}

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

    const existingWord = await prisma.word.findFirst({
      where: {
        userId,
        wordName: searchTerm,
      },
    });
    if (existingWord) {
      return NextResponse.json({ error: "Already exists" }, { status: 400 });
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
      return text;
    };

    const text = await run();
    const {
      etymology,
      meaning,
      exampleSentence,
      contextLearning,
      pronunciation,
      formalityLevel,
      synonym,
      usageArea,
      isExist,
    } = JSON.parse(text);

    if (isExist === false) {
      throw new Error("Invalid word");
    }
    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + 1);

    const word = await prisma.word.create({
      data: {
        userId,
        wordName: searchTerm,
        etymology,
        meaning,
        exampleSentence,
        contextLearning,
        pronunciation: JSON.stringify(pronunciation), // JSON文字列に変換
        formalityLevel,
        usageArea,
        learningSource: 1,
        learningStatus: 1,
        isExist,
        synonym,
        favorite: false,
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

import { GEMINI_API_KEY } from "@/config/ENV";
import { ERROR_MESSAGES } from "@/config/errorMessage";
import { queryKeys } from "@/config/query";
import { getUserId } from "@/lib/auth";
import { createErrorResponse } from "@/lib/backend/createErrorResponse";
import { getErrorMessage } from "@/lib/getErrorMessage";
import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prisma } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server"; // Next.jsの場合に使用

const prompt = `以下のルールに従って、単語「{word}」に関する情報を厳密なJSON形式で出力してください。

【ルール】
1. 単語が正しく存在し、かつタイポがない場合は、以下の全項目を必ず出力してください。
   - "etymology": 語源（日本語） – 単語の由来
   - "meaning": 意味（日本語） – 単語を別の言葉で言い換えて説明（単語自体は含めない）
   - "exampleSentence": 例文（英語） – 単語を使った例文
   - "contextLearning": 使用状況（日本語） – 単語が使われる文脈の説明
   - "pronunciation": 発音情報。下記のサブ項目を含むオブジェクトとする。
       - "american": アメリカ英語の発音（国際音声記号）
       - "british": イギリス英語の発音（国際音声記号）
   - "synonym": 同義語（英語） – カンマ区切りで指定
   - "formalityLevel": 使用レベル（"フォーマル", "普通", "カジュアル"）
   - "usageArea": 使用場所（英語） – 例：アメリカ、イギリス、オーストラリア、カナダ、世界共通、その他
   - "isExist": 単語が正しく存在する場合は true

2. もし、入力された単語にタイポがある場合、またはその単語が存在しない場合は、上記の詳細情報は一切出力せず、以下の形式のみ出力してください。
{
  "isExist": false
}

【出力例】

＜単語が存在し、タイポもない場合＞
{
  "etymology": "ギリシャ語の～から派生",
  "meaning": "単語の起源や由来を研究する学問",
  "exampleSentence": "The etymology of the word...",
  "contextLearning": "この単語は何かを説明するときに使われます。",
  "pronunciation": {
    "american": "/ˌɛtɪˈmɑːlədʒi/",
    "british": "/ˌɛtɪˈmɒlədʒi/"
  },
  "synonym": "derivation, origin, root",
  "formalityLevel": "フォーマル",
  "usageArea": "アメリカ",
  "isExist": true
}

＜タイポや存在しない単語の場合＞
{
  "isExist": false
}

上記のルールに従って、単語「{word}」に関する情報を出力してください。`;

// フィルター追加方法
// Filter[1]を更新
// Filter[2]を更新
// filter[3]を更新

export async function GET(request: NextRequest) {
  // pagination query
  const searchParams = request.nextUrl.searchParams;

  // const page = Number(searchParams.get("page")) || 1;
  const page = parseInt(searchParams.get(queryKeys.PAGE) || "1", 10);

  const pageSize = 10;

  // Filter[1]
  // sort query
  const sort = searchParams.get(queryKeys.SORT) || "latest";

  // search word
  const word = searchParams.get(queryKeys.WORDSEARCH.SEARCH) || "";

  // formality level
  const formalityParam = searchParams.get(queryKeys.FILTER.FORMALITY) || "";
  const formalityFilters = formalityParam
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean); // 空の値を除外

  // favorite
  const favoriteParam = searchParams.get(queryKeys.FILTER.FAVORITE) || "";
  const favoriteFilter = favoriteParam === "true"; // true の場合のみフィルタ適用

  try {
    const userId = await getUserId();
    if (!userId) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
    }

    // pagination
    // count of words
    // Filter[2]
    const totalWords = await prisma.word.count({
      where: {
        userId,
        wordName: { contains: word.trim(), mode: "insensitive" },
        ...(formalityFilters.length > 0 && {
          formalityLevel: { in: formalityFilters },
        }),
        ...(favoriteFilter && { favorite: favoriteFilter }),
      },
    });

    // sort
    let sortOrder: Prisma.WordOrderByWithRelationInput;
    switch (sort) {
      case "latest":
        sortOrder = { createdAt: "desc" };
        break;
      case "oldest":
        sortOrder = { createdAt: "asc" };
        break;
      case "asc":
        sortOrder = { wordName: "asc" };
        break;
      case "desc":
        sortOrder = { wordName: "desc" };
        break;
      default:
        sortOrder = { createdAt: "desc" };
    }

    // filter[3]
    const words = await prisma.word.findMany({
      where: {
        userId,
        wordName: { contains: word.trim(), mode: "insensitive" },
        ...(formalityFilters.length > 0 && {
          formalityLevel: { in: formalityFilters },
        }),
        ...(favoriteFilter && { favorite: favoriteFilter }),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: sortOrder,
    });
    return NextResponse.json({
      data: words,
      totalPages: Math.ceil(totalWords / pageSize),
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

export async function POST(request: Request) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  try {
    const { searchTerm } = await request.json();
    if (!searchTerm) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.API.INVALID, 400);
    }

    const userId = await getUserId();
    if (!userId) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
    }

    const existingWord = await prisma.word.findFirst({
      where: {
        userId,
        wordName: {
          equals: searchTerm.trim(),
          mode: "insensitive", // 大文字小文字を区別しない
        },
      },
    });

    if (existingWord) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.WORDS.DUPLICATE, 500);
    }

    const run = async () => {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
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

    // AIが存在しないフレーズを返した場合
    if (isExist === false) {
      return createErrorResponse(ERROR_MESSAGES.BACKEND.WORDS.NOT_EXIST, 500);
    }

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
        nextReviewAt: new Date(),
      },
    });

    return NextResponse.json({ data: word });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

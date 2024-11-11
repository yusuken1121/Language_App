"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Word } from "@prisma/client";

interface WordsListProps {
  isWordAdded: boolean;
  setIsWordAdded: (value: boolean) => void;
}

const WordsList = ({ isWordAdded, setIsWordAdded }: WordsListProps) => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch("/api/words", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }

        const words = await response.json();
        setWordList(words.data);
      } catch (error) {
        console.error("Error fetching words:", error);
        setError("単語の取得に失敗しました");
      }
    };

    // 初回レンダリングと`isWordAdded`が`true`になったときに`fetchWords`を実行
    if (isWordAdded) {
      setIsWordAdded(false); // リストを更新した後にフラグをリセット
    }
    fetchWords();
  }, [isWordAdded, setIsWordAdded]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className="bg-white text-[#181059]">
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {wordList.map((word) => (
            <li key={word.id} className="py-4">
              <Link
                href={`/word-search/${word.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="flex justify-between">
                  <span className="font-bold">{word.wordName}</span>
                  <span className="text-sm text-gray-500">
                    {word.formalityLevel}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{word.meaning}</p>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WordsList;

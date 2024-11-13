"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Word } from "@prisma/client";
import LottieLoading from "@/components/LottieLoading";
import { cn } from "@/lib/utils";
import PaginationList from "./WordsListPagnination"; // PaginationList コンポーネントをインポート

interface WordsListProps {
  isWordAdded: boolean;
  setIsWordAdded: (value: boolean) => void;
}

const WordsList = ({ isWordAdded, setIsWordAdded }: WordsListProps) => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchWords = async (page: number) => {
      try {
        const response = await fetch(`/api/words?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }

        const words = await response.json();
        setWordList(words.data);
        setTotalPage(words.totalPages); // APIが総ページ数を返すと仮定
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching words:", error);
        setError("単語の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    if (isWordAdded) {
      setIsWordAdded(false);
    }
    fetchWords(currentPage);
  }, [isWordAdded, setIsWordAdded, currentPage]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <LottieLoading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-white text-background">
        <CardContent>
          {wordList.length === 0 ? (
            <div className="text-center text-primary">
              単語がまだ追加されていません。
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {wordList.map((word) => (
                  <li key={word.id} className="py-4">
                    <Link
                      href={`/word-search/${word.id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <span className="font-bold">{word.wordName}</span>
                        <span
                          className={cn(
                            "text-sm px-2 py-1 rounded-md font-semibold border border-gray-200",
                            word.formalityLevel === "フォーマル" &&
                              "bg-secondary text-background",
                            word.formalityLevel === "普通" &&
                              "bg-primary text-background",
                            word.formalityLevel === "カジュアル" &&
                              "bg-accent text-background"
                          )}
                        >
                          {word.formalityLevel}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {word.meaning}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
      <PaginationList
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default WordsList;

"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Word } from "@prisma/client";
import LottieLoading from "@/components/LottieLoading";
import { cn } from "@/lib/utils";
import PaginationList from "./WordsListPagnination"; // PaginationList コンポーネントをインポート
import SortBox from "./SortBox";
import { motion } from "motion/react";

type WordsListProps = {
  isWordAdded: boolean;
  setIsWordAdded: (value: boolean) => void;
};
export type SortType = "latest" | "oldest" | "asc" | "desc";

const WordsList = ({ isWordAdded, setIsWordAdded }: WordsListProps) => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // sort
  const [sort, setSort] = useState<SortType>("latest");

  useEffect(() => {
    const fetchWords = async (page: number) => {
      try {
        const response = await fetch(`/api/words?page=${page}&sort=${sort}`, {
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
  }, [isWordAdded, setIsWordAdded, currentPage, sort]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="h-4/5">
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SortBox setSort={setSort} />
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
                  <motion.li
                    key={word.id}
                    className="py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
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
                  </motion.li>
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

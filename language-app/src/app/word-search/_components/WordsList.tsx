"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Word } from "@/types";
import LottieLoading from "@/components/LottieLoading";
import { cn } from "@/lib/utils";
import PaginationList from "./WordsListPagnination"; // PaginationList コンポーネントをインポート
import { motion } from "motion/react";
import LottieError from "@/components/LottieError";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { queryKeys } from "@/config/query";
import { FilePlus2 } from "lucide-react";
import { ERROR_MESSAGES } from "@/config/errorMessage";

type WordsListProps = {
  setIsSearchLoading: (value: boolean) => void;
};
export type SortType = "latest" | "oldest" | "asc" | "desc";

const WordsList = ({ setIsSearchLoading }: WordsListProps) => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // pagination
  const [totalPage, setTotalPage] = useState(1);

  const searchParams = useSearchParams();

  // filters & sort
  const formalityParam = searchParams.get(queryKeys.FILTER.FORMALITY) || "";
  const favoriteParam = searchParams.get(queryKeys.FILTER.FAVORITE) || "";
  const searchWordParam = searchParams.get(queryKeys.WORDSEARCH.SEARCH) || "";
  const sortParam = searchParams.get(queryKeys.SORT) || "";
  const pageParams = searchParams.get(queryKeys.PAGE) || "1";

  //無限レンダリングを防止
  const formalityFilters = useMemo(() => {
    return formalityParam.split("%").filter(Boolean);
  }, [formalityParam]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setIsLoading(true);
        let url = `/api/words?`;

        // ページ
        if (pageParams) {
          url += `&page=${encodeURIComponent(pageParams)}`;
        }

        // ソート
        if (sortParam) {
          url += `&sort=${encodeURIComponent(sortParam)}`;
        }

        // フレーズ検索
        if (searchWordParam) {
          url += `&search=${encodeURIComponent(searchWordParam)}`;
        }

        // formality Level
        if (formalityFilters.length > 0) {
          url += `&${queryKeys.FILTER.FORMALITY}=${encodeURIComponent(
            formalityFilters.join(",")
          )}`;
        }

        // favorite
        if (favoriteParam) {
          url += `&${queryKeys.FILTER.FAVORITE}=${encodeURIComponent(
            favoriteParam
          )}`;
        }

        const response = await fetch(url, {
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
        setTotalPage(words.totalPages);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
        }
      } finally {
        setIsLoading(false);
        setIsSearchLoading(false);
      }
    };

    fetchWords();
  }, [searchParams]);

  // エラー時
  if (error) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          <div>
            {error}
            <LottieError />
          </div>
        </div>
      </>
    );
  }

  // ローディング中
  if (isLoading) return <LottieLoading />;

  // データが存在しない時
  if (wordList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl">
          <span className="flex items-center gap-1">
            右の <FilePlus2 /> から
          </span>
          <br />
          フレーズを追加しましょう！
          <LottieError />
        </div>
      </div>
    );
  }

  // データが存在する時
  if (wordList.length > 0) {
    return (
      <div className="flex flex-col gap-4 max-h-full">
        {wordList.map((word) => (
          <Card key={word.id} className="text-background max-w-full">
            <CardContent>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href={`/word-search/${word.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="grid grid-cols-10 auto-rows-auto">
                    <span className="col-span-7 font-bold break-words">
                      {word.wordName}
                    </span>
                    <span
                      className={cn(
                        "col-span-3 col-start-8 flex max-h-[30px] sm:min-w-[100px] items-center justify-center sm:justify-self-end text-xs px-2 py-1 rounded-md font-semibold border border-gray-200",
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
                  <p className="mt-1 text-sm text-gray-600">{word.meaning}</p>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        ))}
        <PaginationList totalPage={totalPage} />
      </div>
    );
  }
};

export default WordsList;

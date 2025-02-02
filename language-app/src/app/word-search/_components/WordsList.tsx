"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Word } from "@prisma/client";
import LottieLoading from "@/components/LottieLoading";
import { cn } from "@/lib/utils";
import PaginationList from "./WordsListPagnination"; // PaginationList コンポーネントをインポート
import SortBox from "./FilterSort/SortBox";
import { motion } from "motion/react";
import LottieNotFound from "@/components/LottieNotFound";
import LottieError from "@/components/LottieError";
import FilterBox from "./FilterSort/FilterBox";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ResetBox from "./FilterSort/ResetBox";
import { queryKeys } from "@/config/query";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const isMobile = useIsMobile();

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
        console.error("Error fetching words:", error);
        setError("フレーズの取得に失敗しました");
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
        <div className="flex flex-col items-center justify-center gap-1">
          <ResetBox />
          <p className="text-xs text-accent">リセット</p>
        </div>
        <div className="flex flex-col items-center justify-center max-h-full">
          <div>
            {error}
            <LottieError />
          </div>
        </div>
      </>
    );
  }

  // ローディング中
  if (isLoading)
    return (
      <div className="h-4/5">
        <LottieLoading />
      </div>
    );

  // データが存在しない時
  if (wordList.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-1">
          <ResetBox />
          <p className="text-xs text-accent">リセット</p>
        </div>
        <div className="flex flex-col items-center justify-center h-3/4">
          <div>
            <div className="text-2xl">
              フレーズを入力して
              <br />
              フレーズ学習を始めましょう！
            </div>
            <LottieNotFound />
          </div>
        </div>
      </>
    );
  }

  // データが存在する時
  if (wordList.length > 0) {
    return (
      <div className="flex flex-col gap-4 max-h-full">
        <Card className="bg-white text-background max-w-full">
          <CardContent>
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
                    <div className="grid grid-cols-10 auto-rows-auto">
                      <span className="col-span-7 font-bold break-words">
                        {word.wordName}
                      </span>
                      <span
                        className={cn(
                          "col-span-3 col-start-8 flex max-h-[30px] sm:min-w-[100px] items-center justify-center sm:justify-self-end text-sm px-2 py-1 rounded-md font-semibold border border-gray-200 ",
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
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <PaginationList totalPage={totalPage} />
      </div>
    );
  }
};

export default WordsList;

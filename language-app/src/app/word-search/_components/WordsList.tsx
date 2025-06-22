"use client";
import React, { useEffect } from "react";
import LottieLoading from "@/components/LottieLoading";
import PaginationList from "@/app/word-search/_components/WordsListPagnination";
import LottieError from "@/components/LottieError";
import { FilePlus2 } from "lucide-react";
import { useWords } from "@/hooks/useWords"; // 作成したカスタムフックをインポート
import { WordCard } from "@/app/word-search/_components/WordCard";
import { cn } from "@/lib/utils";

type Props = {
  setIsSearchLoading: (value: boolean) => void;
  errorClassName?: string;
  className?: string;
};

const WordsList = ({
  setIsSearchLoading,
  errorClassName,
  className,
}: Props) => {
  const { wordList, isLoading, error, totalPage } = useWords();

  // 親コンポーネントにローディング状態を伝える
  useEffect(() => {
    setIsSearchLoading(isLoading);
  }, [isLoading, setIsSearchLoading]);

  // エラー時
  if (error) {
    return (
      <div className={cn(errorClassName)}>
        <div>
          {error}
          <LottieError />
        </div>
      </div>
    );
  }

  // ローディング中
  if (isLoading)
    return (
      <div className={cn(errorClassName)}>
        <LottieLoading />
      </div>
    );

  // データが存在しない時
  if (wordList.length === 0) {
    return (
      <div className={cn(errorClassName)}>
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
  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wordList.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
      <PaginationList totalPage={totalPage} />
    </div>
  );
};

export default WordsList;

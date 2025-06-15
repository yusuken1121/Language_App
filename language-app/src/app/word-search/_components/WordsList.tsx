"use client";
import React, { useEffect } from "react";
import LottieLoading from "@/components/LottieLoading";
import PaginationList from "@/app/word-search/_components/WordsListPagnination";
import LottieError from "@/components/LottieError";
import { FilePlus2 } from "lucide-react";
import { useWords } from "@/hooks/useWords"; // 作成したカスタムフックをインポート
import { WordCard } from "@/app/word-search/_components/WordCard";

type WordsListProps = {
  setIsSearchLoading: (value: boolean) => void;
};

const WordsList = ({ setIsSearchLoading }: WordsListProps) => {
  const { wordList, isLoading, error, totalPage } = useWords();

  // 親コンポーネントにローディング状態を伝える
  useEffect(() => {
    setIsSearchLoading(isLoading);
  }, [isLoading, setIsSearchLoading]);

  // エラー時
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
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
      <div className="flex flex-col items-center justify-center h-full">
        <LottieLoading />
      </div>
    );

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
  return (
    <div className="flex flex-col gap-4">
      {wordList.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
      <PaginationList totalPage={totalPage} />
    </div>
  );
};

export default WordsList;

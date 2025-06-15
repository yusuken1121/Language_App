import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Word } from "@/types";
import { queryKeys } from "@/config/query";
import { ERROR_MESSAGES } from "@/config/errorMessage";

export const useWords = () => {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  const searchParams = useSearchParams();

  // searchParamsの変更を監視し、変更があるたびにフェッチ処理をトリガーします
  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true);
      setError(null); // 新しいリクエストの前にエラーをリセット

      try {
        // URLSearchParamsを使用してクリーンにURLを構築
        const params = new URLSearchParams();
        const formalityParam =
          searchParams.get(queryKeys.FILTER.FORMALITY) || "";
        const favoriteParam = searchParams.get(queryKeys.FILTER.FAVORITE) || "";
        const searchWordParam =
          searchParams.get(queryKeys.WORDSEARCH.SEARCH) || "";
        const sortParam = searchParams.get(queryKeys.SORT) || "";
        const pageParams = searchParams.get(queryKeys.PAGE) || "1";

        const formalityFilters = formalityParam.split("%").filter(Boolean);

        params.append("page", pageParams);
        if (sortParam) params.append("sort", sortParam);
        if (searchWordParam) params.append("search", searchWordParam);
        if (formalityFilters.length > 0) {
          params.append(queryKeys.FILTER.FORMALITY, formalityFilters.join(","));
        }
        if (favoriteParam)
          params.append(queryKeys.FILTER.FAVORITE, favoriteParam);

        const response = await fetch(`/api/words?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        });

        if (!response.ok) {
          // APIから詳細なエラーメッセージがあればそれを利用する
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Failed to fetch words");
        }

        const words = await response.json();
        setWordList(words.data);
        setTotalPage(words.totalPages);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWords();
  }, [searchParams]); // 依存配列は searchParams のみでOK

  return { wordList, isLoading, error, totalPage };
};

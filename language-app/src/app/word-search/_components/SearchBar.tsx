"use client";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/lib/createQueryString";

import { getErrorMessage } from "@/lib/getErrorMessage";
import { queryKeys } from "@/config/query";
interface SearchBarProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  setIsSearchLoading: (value: boolean) => void;
  isSearchLoading: boolean;
}

const SearchBar = ({
  searchTerm,
  isSearchLoading,
  setIsSearchLoading,
}: SearchBarProps) => {
  const [isAddLoading, setIsAddLoading] = useState(false);

  // 追加
  const router = useRouter();
  const searchParams = useSearchParams();

  const formSchema = z.object({
    word: z
      .string()
      .min(1, { message: "入力してください。" })
      .regex(/^[A-Za-z\s.,?!'"’`;:-]+$/, {
        message: "英字のみ入力可能です。",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { word: searchTerm },
  });

  const onSearch = (data: { word: string }) => {
    const word = data.word.trim();
    const query = createQueryString(
      searchParams,
      queryKeys.WORDSEARCH.SEARCH,
      word
    );
    router.push(`?${query}`, { scroll: false });
    setIsSearchLoading(true);
  };

  const onAdd = async (data: { word: string }) => {
    const word = data.word.trim();
    await handleAdd(word);
  };

  const handleAdd = async (word: string) => {
    try {
      setIsAddLoading(true);
      const response = await fetch("api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm: word }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "フレーズの追加に失敗しました");
      }
      // 再レンダリングをさせるためにクエリを更新する
      const query = createQueryString(
        searchParams,
        queryKeys.WORDSEARCH.ADD,
        word
      );
      router.push(`?${query}`, { scroll: false });
      toast.success("フレーズを追加しました", { position: "top-right" });
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("検索中にエラーが発生しました", {
        position: "top-right",
      });
    } finally {
      setIsAddLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 text-accent text-xs mb-2">
        <p>検索ボタンで入力したフレーズを含むものを抽出します。</p>
        <p>プラスボタンでAIが意味や関連情報を調べてリストに追加</p>
      </div>
      <form className="flex gap-2 mb-6">
        <div className="flex flex-col gap-2 w-full">
          <Input
            {...register("word")}
            placeholder="フレーズを検索・追加"
            type="text"
            className="w-full bg-white text-background"
          />
          <div className="h-4">
            {errors.word && (
              <p className="text-red-500">{errors.word.message as string}</p>
            )}
          </div>
        </div>
        <Button
          type="button"
          onClick={handleSubmit(onSearch)}
          className="bg-secondary text-accent-foreground hover:bg-secondary/80"
          disabled={isSearchLoading}
        >
          {isSearchLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          onClick={handleSubmit(onAdd)}
          className="bg-primary text-accent-foreground hover:bg-accent/80"
          disabled={isAddLoading}
        >
          {isAddLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;

"use client";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface SearchBarProps {
  setIsWordAdded: (value: boolean) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  setIsSearchLoading: (value: boolean) => void;
  isSearchLoading: boolean;
}

const SearchBar = ({
  setIsWordAdded,
  searchTerm,
  setSearchTerm,
  isSearchLoading,
  setIsSearchLoading,
}: SearchBarProps) => {
  // const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const formSchema = z.object({
    word: z
      .string()
      .min(1, { message: "word is required" })
      .regex(/^[A-Za-z\s.,?!'";:-]+$/, {
        message: "英字のみ入力可能です。",
      })
      .refine((value) => value.trim() !== "", {
        message: "入力してください。",
      }),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { word: searchTerm },
  });

  const onSubmit = async (data: { word: string }) => {
    const action = document.activeElement?.getAttribute("name");
    const word = data.word.trim();

    if (action === "search") {
      setIsSearchLoading(true);
      setSearchTerm(word);
      setIsWordAdded(false);
    } else if (action === "add") {
      await handleAdd(word);
    }
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
        throw new Error(errorData.error || "単語の追加に失敗しました");
      }
      toast.success("単語を追加しました", { position: "top-right" });
      setIsWordAdded(true);
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("検索中にエラーが発生しました", { position: "top-right" });
    } finally {
      setIsAddLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Word Search</h1>

      <div className="flex flex-col gap-1 mb-2">
        <p className="text-sm text-accent">
          [プラスボタン]でAIが意味や関連情報を調べてリストに追加
        </p>
        <p className="text-sm text-accent">
          [検索ボタン]で入力したフレーズを含むものを抽出
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <div className="flex flex-col gap-2 w-full">
          <Input
            {...register("word")}
            placeholder="フレーズを検索・追加"
            type="text"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-accent text-background"
          />
          <div className="h-4">
            {errors.word && (
              <p className="text-red-500">{errors.word.message as string}</p>
            )}
          </div>
        </div>
        <Button
          name="search"
          className="bg-secondary text-accent-foreground hover:bg-accent/80"
          disabled={isSearchLoading}
        >
          {isSearchLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
        <Button
          name="add"
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

"use client";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface SearchBarProps {
  setIsWordAdded: (value: boolean) => void;
}

const SearchBar = ({ setIsWordAdded }: SearchBarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    word: z
      .string()
      .min(1, { message: "word is required" })
      .regex(/^[A-Za-z\s.,?!'";:-]+$/, {
        message: "Only English letters and common punctuation are allowed",
      })
      .refine((value) => value.trim() !== "", {
        message: "word is required",
      }),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const searchTerm = watch("word");
  const searchWord = async (searchTerm: string) => {
    const response = await fetch(`/api/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchTerm }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch data");
    }
    return await response.json();
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      await searchWord(searchTerm);
      toast.success("単語を追加しました", { position: "top-right" });
      setIsWordAdded(true);
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("検索中にエラーが発生しました", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Word Search</h1>

      <form onSubmit={handleSubmit(handleSearch)} className="flex gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full">
          <Input
            {...register("word")}
            placeholder="Search for a word"
            type="text"
            value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-accent text-background"
          />
          <div className="h-4">
            {errors.word && (
              <p className="text-accent">{errors.word.message as string}</p>
            )}
          </div>
        </div>
        <Button
          className="bg-primary text-accent-foreground hover:bg-accent/80"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          単語を検索
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;

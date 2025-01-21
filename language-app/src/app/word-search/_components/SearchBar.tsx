"use client";

import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/lib/createQueryString";
import { queryKeys } from "@/config/query";
import FilterBox from "./FilterSort/FilterBox";
import { CreateWordForm } from "./CreateWord/CreateWordForm";
import { wordSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface SearchBarProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  setIsSearchLoading: (value: boolean) => void;
  isSearchLoading: boolean;
}

export default function SearchBar({
  searchTerm,
  isSearchLoading,
  setIsSearchLoading,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(wordSchema),
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

  return (
    <Card className="w-full bg-primary border-none shadow-lg pt-2 pb-3 rounded-none">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        {/* Search Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)}>
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      {/* フィルターとソート */}
                      <FilterBox className="border-none" />

                      {/* 登録ずみのフレーズの検索窓 */}
                      <div className="relative flex-1">
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="登録済みフレーズを検索"
                            className="bg-background pr-10 rounded-full"
                          />
                          <FormMessage className="absolute -bottom-7" />
                        </div>
                        <Button
                          type="submit"
                          variant="secondary"
                          className="absolute right-0 top-0 rounded-full "
                          disabled={isSearchLoading}
                        >
                          {isSearchLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Search className="h-3 w-3" />
                          )}
                        </Button>
                      </div>

                      {/* フレーズの登録 */}
                      <CreateWordForm searchTerm={searchTerm} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

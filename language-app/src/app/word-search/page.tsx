"use client";
import React, { Suspense, useState } from "react";
import WordsList from "@/app/word-search/_components/WordsList";
import SearchBar from "@/app/word-search/_components/SearchBar";
import { Chatbot } from "@/app/word-search/_components/Chatbot/Chatbot";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WordSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  return (
    <Suspense>
      <div className="grid grid-rows-[auto_1fr] h-[calc(100vh-75px)]">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchLoading={setIsSearchLoading}
          isSearchLoading={isSearchLoading}
          className="h-[64px] z-10"
        />

        <ScrollArea className="h-[calc(100vh-75px-64px)] px-6 pb-6">
          <WordsList
            setIsSearchLoading={setIsSearchLoading}
            errorClassName="h-full flex items-center justify-center"
            className="flex flex-col gap-4"
          />

          <Chatbot />
        </ScrollArea>
      </div>
    </Suspense>
  );
}

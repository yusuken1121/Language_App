"use client";
import React, { Suspense, useState } from "react";
import WordsList from "./_components/WordsList";
import SearchBar from "./_components/SearchBar";
import { Chatbot } from "./_components/Chatbot/Chatbot";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WordSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  return (
    <Suspense>
      <div className="grid grid-rows-[auto_1fr] h-full">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchLoading={setIsSearchLoading}
          isSearchLoading={isSearchLoading}
          className="h-[64px]"
        />

        <ScrollArea className="h-[calc(100vh-64px)] px-6 pb-6">
          <WordsList setIsSearchLoading={setIsSearchLoading} />
          <Chatbot />
        </ScrollArea>
      </div>
    </Suspense>
  );
}

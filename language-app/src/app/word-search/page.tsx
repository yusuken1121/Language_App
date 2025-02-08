"use client";
import React, { Suspense, useState } from "react";
import WordsList from "./_components/WordsList";
import SearchBar from "./_components/SearchBar";
import { Chatbot } from "./_components/Chatbot/Chatbot";

export default function WordSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  return (
    <Suspense>
      <div className="flex flex-col h-full">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchLoading={setIsSearchLoading}
          isSearchLoading={isSearchLoading}
        />

        <div className="flex-1 p-6">
          <WordsList setIsSearchLoading={setIsSearchLoading} />
          <Chatbot />
        </div>
      </div>
    </Suspense>
  );
}

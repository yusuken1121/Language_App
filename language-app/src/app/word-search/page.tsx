"use client";
import React, { Suspense, useEffect, useState } from "react";
import WordsList from "./_components/WordsList";
import SearchBar from "./_components/SearchBar";
import { Chatbot } from "./_components/Chatbot/Chatbot";

export default function WordSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  return (
    <Suspense>
      <div className="h-full p-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchLoading={setIsSearchLoading}
          isSearchLoading={isSearchLoading}
        />
        <WordsList setIsSearchLoading={setIsSearchLoading} />
        <Chatbot />
      </div>
    </Suspense>
  );
}

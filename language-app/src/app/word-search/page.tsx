"use client";
import React, { Suspense, useEffect, useState } from "react";
import WordsList from "./_components/WordsList";
import SearchBar from "./_components/SearchBar";

export default function WordSearch() {
  const [isWordAdded, setIsWordAdded] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  return (
    <Suspense>
      <div className="h-full p-6">
        <SearchBar
          setIsWordAdded={setIsWordAdded}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchLoading={setIsSearchLoading}
          isSearchLoading={isSearchLoading}
        />
        <WordsList
          isWordAdded={isWordAdded}
          searchTerm={searchTerm}
          setIsWordAdded={setIsWordAdded}
          setIsSearchLoading={setIsSearchLoading}
        />
      </div>
    </Suspense>
  );
}

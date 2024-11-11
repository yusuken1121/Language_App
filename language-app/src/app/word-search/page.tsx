"use client";
import React, { useState } from "react";
import WordsList from "./_components/WordsList";
import SearchBar from "./_components/SearchBar";

export default function WordSearch() {
  const [isWordAdded, setIsWordAdded] = useState(false);
  return (
    <div className="h-full p-6">
      <SearchBar setIsWordAdded={setIsWordAdded} />
      <WordsList isWordAdded={isWordAdded} setIsWordAdded={setIsWordAdded} />
    </div>
  );
}

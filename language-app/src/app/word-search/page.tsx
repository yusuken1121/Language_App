"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

// Mock word list data
const wordListData = [
  {
    id: 1,
    word: "Serendipity",
    definition:
      "The occurrence of events by chance in a happy or beneficial way",
    usage: "Formal",
  },
  {
    id: 2,
    word: "Eloquent",
    definition: "Fluent or persuasive in speaking or writing",
    usage: "Formal",
  },
  {
    id: 3,
    word: "Awesome",
    definition: "Extremely impressive or daunting; inspiring great admiration",
    usage: "Casual",
  },
  // Add more words as needed
];

export default function WordSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wordList, setWordList] = useState(wordListData);

  const searchWord = async (searchTerm: string) => {
    const response = await fetch(`/api/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchTerm }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  };

  const handleSearch = async () => {
    try {
      const data = await searchWord(searchTerm);
      console.log(data);

      const filteredWords = wordListData.filter((word) =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setWordList(filteredWords);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="h-ful p-6">
      <h1 className="text-2xl font-bold mb-6">Word Search</h1>

      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search for a word"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button
          onClick={handleSearch}
          className="bg-accent text-accent-foreground hover:bg-accent/80"
        >
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <Card className="bg-white text-[#181059]">
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {wordList.map((word) => (
              <li key={word.id} className="py-4">
                <Link
                  href={`/word/${word.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <span className="font-bold">{word.word}</span>
                    <span className="text-sm text-gray-500">{word.usage}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {word.definition}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

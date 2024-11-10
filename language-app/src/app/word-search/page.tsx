"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import SearchBar from "./_components/SearchBar";

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
  const [wordList, setWordList] = useState(wordListData);

  return (
    <div className="h-ful p-6">
      <SearchBar />

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

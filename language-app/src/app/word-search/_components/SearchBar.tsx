"use client";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.error("Error during search:", error);
      toast("検索中にエラーが発生しました", { className: "text-white" }); // Display the error in toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Word Search</h1>

      <form className="flex gap-4 mb-6">
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

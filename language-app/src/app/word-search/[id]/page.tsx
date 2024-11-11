"use client";

import { Word } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Book,
  Bookmark,
  BookOpen,
  Clock,
  GraduationCap,
  Trash,
  Volume2,
} from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardHeader } from "@/components/ui/card";
import ReactQuillComponent from "./_components/ReactQuill";
import { toast } from "sonner";

export default function WordSearchPage() {
  const [word, setWord] = useState<Word>();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const data = await fetch(`/api/words/${params.id}`);
        const wordData = await data.json();

        setWord(wordData.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch word details");
      }
    };
    fetchWord();
  }, [params.id]);

  const formatDate = (date: Date | null) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString();
  };

  const getLearningStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "未学習";
      case 2:
        return "学習中";
      case 3:
        return "学習済";
      default:
        return "未学習";
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/words/${params.id}`, { method: "DELETE" });
      toast.success("Word deleted");
      router.push("/word-search");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete word");
    }
  };

  const handleFavorite = async () => {
    try {
      const updatedFavoriteStatus = !word?.favorite;
      await fetch(`/api/words/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: updatedFavoriteStatus }),
      });
      setWord((prev) => prev && { ...prev, favorite: updatedFavoriteStatus });
      toast.success(
        updatedFavoriteStatus ? "Added to favorites" : "Removed from favorites"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update favorite status");
    }
  };

  return (
    <div className="h-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/word-search">
            <Button variant="ghost" className="hover:text-accent-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Word List
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{word?.wordName}</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-secondary text-accent-foreground hover:bg-accent/80"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button
              variant="outline"
              className={`${
                word?.favorite ? "bg-accent" : "bg-accent"
              } text-accent-foreground hover:bg-accent/80`}
              onClick={handleFavorite}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              {word?.favorite ? "Unfavorite" : "Favorite"}
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information Card */}
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Meaning</h3>
                <p>{word?.meaning || "No meaning provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Etymology</h3>
                <p>{word?.etymology || "No etymology provided"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Information Card */}
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Volume2 className="h-6 w-6" />
              <CardTitle>Usage Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Pronunciation</h3>
                <p>{word?.pronunciation || "No pronunciation provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Usage Area</h3>
                <p>{word?.usageArea || "No usage area specified"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Formality Level</h3>
                <p>{word?.formalityLevel || "No formality level specified"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Synonym</h3>
                <p>{word?.synonym || "No synonym provided"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Context Card */}
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <CardTitle>Learning Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Example Sentence</h3>
                <p>{word?.exampleSentence || "No example sentence provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Context</h3>
                <p>{word?.contextLearning || "No context provided"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Clock className="h-6 w-6" />
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Learning Status</h3>
                <p>{getLearningStatusText(word?.learningStatus || 0)}</p>
              </div>
              <div>
                <h3 className="font-semibold">Correct Answers</h3>
                <p>{word?.correctCount || 0} times</p>
              </div>
              <div>
                <h3 className="font-semibold">Last Correct Answer</h3>
                <p>{formatDate(word?.lastCorrectAt || null)}</p>
              </div>
              <div>
                <h3 className="font-semibold">Next Review</h3>
                <p>{formatDate(word?.nextReviewAt || null)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white text-card-foreground">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Book className="h-6 w-6" />
              <CardTitle>Memo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Personal Notes</h3>
                <ReactQuillComponent
                  id={params.id as string}
                  memo={word?.memo || ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

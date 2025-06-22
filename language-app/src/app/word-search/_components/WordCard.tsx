import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Word } from "@/types";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

export const WordCard = React.memo(({ word }: { word: Word }) => (
  <Card className="text-background max-w-full sm:aspect-square">
    <CardContent className="p-4 h-full">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="h-full"
      >
        <Link
          href={`/word-search/${word.id}`}
          className="block hover:bg-gray-50 h-full sm:flex sm:flex-col sm:items-center sm:justify-center sm:text-center"
        >
          <div className="grid grid-cols-10 auto-rows-auto sm:flex sm:flex-col sm:items-center">
            <span className="col-span-7 font-bold break-words sm:text-lg">
              {word.wordName}
            </span>
            <span
              className={cn(
                "col-span-3 col-start-8 flex max-h-[30px] sm:min-w-[100px] items-center justify-center sm:justify-self-end text-xs px-2 py-1 rounded-md font-semibold border border-gray-200",
                "sm:col-auto sm:col-start-auto sm:justify-self-auto sm:mt-2",
                word.formalityLevel === "フォーマル" &&
                  "bg-secondary text-background",
                word.formalityLevel === "普通" && "bg-primary text-background",
                word.formalityLevel === "カジュアル" &&
                  "bg-accent text-background"
              )}
            >
              {word.formalityLevel}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 sm:mt-2">{word.meaning}</p>
        </Link>
      </motion.div>
    </CardContent>
  </Card>
));
WordCard.displayName = "WordCard";

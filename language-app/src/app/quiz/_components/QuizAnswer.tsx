import { Button } from "@/components/ui/button";
import { BasicInfoCard } from "../../word-search/[id]/_components/BasicInfoCard";
import { LearningContextCard } from "../../word-search/[id]/_components/LearningContextCard";
import { UsageInfoCard } from "../../word-search/[id]/_components/UsageInfoCard";
import { QuizWord } from "../page";
import { Check, Loader2 } from "lucide-react";
import { Clock } from "lucide-react";
import { X } from "lucide-react";

const QuizAnswer = ({
  currentWord,
  nextWord,
  handleCross,
  handleReviewLater,
  handleCheck,
  isLoading,
}: {
  currentWord: QuizWord | null;
  nextWord: () => void;
  handleCross: () => void;
  handleReviewLater: () => void;
  handleCheck: () => void;
  isLoading: boolean;
}) => (
  <>
    {currentWord && (
      <div className="relative flex flex-col items-center justify-center gap-4 bg-background w-full p-4">
        {/* 追加: 忘れた, 後で復習, 覚えたボタン */}
        <div className="sticky top-0 bg-background bg-opacity-80 w-full flex items-center justify-center gap-4 p-2 pb-5 z-10 ">
          <Button
            onClick={handleCross}
            className="bg-accent text-background hover:bg-accent/80 font-bold flex-1"
          >
            <X className="mr-2 h-4 w-4" /> 忘れた
          </Button>
          <Button
            onClick={handleReviewLater}
            className="bg-primary hover:bg-primary/90 text-background font-bold flex-1"
          >
            <Clock className="mr-2 h-4 w-4" /> 後で復習
          </Button>
          <Button
            onClick={handleCheck}
            className="bg-secondary hover:bg-secondary/80 text-background font-bold flex-1"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            覚えた
          </Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <p>
            正解:{" "}
            <span className="font-bold text-3xl text-primary">
              {currentWord?.wordName}
            </span>
          </p>
        </div>
        <BasicInfoCard
          meaning={currentWord?.meaning || ""}
          etymology={currentWord?.etymology || ""}
          pronunciation={currentWord?.pronunciation || ""}
        />
        <LearningContextCard
          exampleSentence={currentWord?.exampleSentence || ""}
          contextLearning={currentWord?.contextLearning || ""}
        />
        <UsageInfoCard
          synonym={currentWord?.synonym || ""}
          formalityLevel={currentWord?.formalityLevel || ""}
          usageArea={currentWord?.usageArea || ""}
        />
      </div>
    )}
  </>
);

export default QuizAnswer;

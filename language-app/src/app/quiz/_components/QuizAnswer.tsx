import { Button } from "@/components/ui/button";
import { BasicInfoCard } from "../../word-search/[id]/_components/BasicInfoCard";
import { LearningContextCard } from "../../word-search/[id]/_components/LearningContextCard";
import { UsageInfoCard } from "../../word-search/[id]/_components/UsageInfoCard";
import { QuizWord } from "../page";
import { Check, Loader2 } from "lucide-react";
import { Clock } from "lucide-react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import QuizDescription from "./QuizDescription";
const QuizAnswer = ({
  currentWord,
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
      <div className="relative flex flex-col items-center justify-center gap-4 bg-background w-full p-2">
        {/* 追加: 忘れた, 後で復習, 覚えたボタン */}
        <div className="sticky top-0 bg-background bg-opacity-80 w-full flex items-center justify-between gap-2 p-1 pb-5 z-10 text-sm w-full">
          <Button
            onClick={handleCross}
            variant="accent"
            className="font-bold flex-1"
          >
            <X className="h-2 w-2" />
          </Button>
          <Button
            onClick={handleReviewLater}
            variant="primary"
            className="font-bold flex-1"
          >
            <Clock className="h-2 w-2" />
          </Button>
          <Button
            onClick={handleCheck}
            variant="secondary"
            className="font-bold flex-1"
          >
            {isLoading ? (
              <Loader2 className="h-2 w-2 animate-spin" />
            ) : (
              <Check className="h-2 w-2" />
            )}
          </Button>
          <QuizDescription />
        </div>
        <div className="flex items-center justify-between w-full">
          <p>
            <motion.span
              className="font-bold text-3xl text-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {currentWord?.wordName}
            </motion.span>
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

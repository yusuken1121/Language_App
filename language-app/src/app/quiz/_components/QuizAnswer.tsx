import { Button } from "@/components/ui/button";
import { BasicInfoCard } from "@/app/word-search/[id]/_components/cards/BasicInfoCard";
import { LearningContextCard } from "@/app/word-search/[id]/_components/cards/LearningContextCard";
import { UsageInfoCard } from "@/app/word-search/[id]/_components/cards/UsageInfoCard";
import { QuizWord } from "../page";
import { Check, Loader2 } from "lucide-react";
import { Clock } from "lucide-react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import QuizDescription from "@/app/quiz/_components/organisms/QuizDescriptionDialog";
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
          <QuizDescription />
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
        {/* 追加: 忘れた, 後で復習, 覚えたボタン */}
        <div className="sticky bottom-[75px] bg-background/80 bg-opacity-80 flex items-center justify-between gap-2 p-1 py-5 z-10 text-sm w-full">
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
        </div>
      </div>
    )}
  </>
);

export default QuizAnswer;

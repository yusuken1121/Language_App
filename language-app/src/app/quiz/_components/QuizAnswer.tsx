import { Button } from "@/components/ui/button";
import { BasicInfoCard } from "../../word-search/[id]/_components/BasicInfoCard";
import { LearningContextCard } from "../../word-search/[id]/_components/LearningContextCard";
import { UsageInfoCard } from "../../word-search/[id]/_components/UsageInfoCard";
import { QuizWord } from "../page";

const QuizAnswer = ({
  currentWord,
  nextWord,
}: {
  currentWord: QuizWord | null;
  nextWord: () => void;
}) => (
  <>
    {currentWord && (
      <div className="flex flex-col items-center justify-center gap-4 bg-background p-4">
        <div className="flex items-center justify-between w-full">
          <p>
            正解:{" "}
            <span className="font-bold text-2xl text-primary">
              {currentWord?.wordName}
            </span>
          </p>
          <Button
            onClick={nextWord}
            className="bg-accent text-background hover:bg-accent/80"
          >
            次の問題へ
          </Button>
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

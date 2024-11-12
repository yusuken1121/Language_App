import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearningStatusText } from "@/lib/wordCard";
import { Clock } from "lucide-react";

export function ProgressCard({
  learningStatus,
  correctCount,
  lastCorrectAt,
  nextReviewAt,
}: {
  learningStatus: number;
  correctCount: number;
  lastCorrectAt: string;
  nextReviewAt: string;
}) {
  return (
    <Card className="bg-card text-card-foreground w-full">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Clock className="h-6 w-6" />
        <CardTitle>Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Learning Status</h3>
          <p>{getLearningStatusText(learningStatus)}</p>
        </div>
        <div>
          <h3 className="font-semibold">Correct Answers</h3>
          <p>{correctCount} times</p>
        </div>
        <div>
          <h3 className="font-semibold">Last Correct Answer</h3>
          <p>{lastCorrectAt}</p>
        </div>
        <div>
          <h3 className="font-semibold">Next Review</h3>
          <p>{nextReviewAt}</p>
        </div>
      </CardContent>
    </Card>
  );
}
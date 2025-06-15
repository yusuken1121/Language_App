import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearningStatusText } from "@/lib/wordCard";
import { Clock } from "lucide-react";
import { ProgressCardProps } from "@/types";

export function ProgressCard({
  learningStatus,
  nextReviewAt,
  createdAt,
}: ProgressCardProps) {
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
          <h3 className="font-semibold">Registration Date</h3>
          <p>{createdAt}</p>
        </div>
        <div>
          <h3 className="font-semibold">Next Review</h3>
          <p>{nextReviewAt}</p>
        </div>
      </CardContent>
    </Card>
  );
}

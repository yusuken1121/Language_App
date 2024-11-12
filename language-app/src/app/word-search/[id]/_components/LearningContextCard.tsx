import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export function LearningContextCard({
  exampleSentence,
  contextLearning,
}: {
  exampleSentence: string;
  contextLearning: string;
}) {
  return (
    <Card className="bg-card text-card-foreground w-full">
      <CardHeader className="flex flex-row items-center space-x-2">
        <GraduationCap className="h-6 w-6" />
        <CardTitle>Learning Context</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Example Sentence</h3>
          <p>{exampleSentence || "No example sentence provided"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Context</h3>
          <p>{contextLearning || "No context provided"}</p>
        </div>
      </CardContent>
    </Card>
  );
}

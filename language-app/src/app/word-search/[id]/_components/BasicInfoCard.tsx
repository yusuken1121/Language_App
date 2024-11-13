import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function BasicInfoCard({
  meaning,
  etymology,
  pronunciation,
}: {
  meaning: string;
  etymology: string;
  pronunciation: string;
}) {
  type PronunciationType = {
    american: string;
    british: string;
  };
  const pronunciationData: PronunciationType = pronunciation
    ? JSON.parse(pronunciation)
    : {
        american: "No pronunciation provided",
        british: "No pronunciation provided",
      };
  return (
    <Card className="bg-card text-card-foreground w-full">
      <CardHeader className="flex flex-row items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Meaning</h3>
          <p>{meaning || "No meaning provided"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Etymology</h3>
          <p>{etymology || "No etymology provided"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Pronunciation</h3>
          <p>American: {pronunciationData.american}</p>
          <p>British: {pronunciationData.british}</p>
        </div>
      </CardContent>
    </Card>
  );
}

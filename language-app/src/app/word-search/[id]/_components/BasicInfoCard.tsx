import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function BasicInfoCard({
  meaning,
  etymology,
}: {
  meaning: string;
  etymology: string;
}) {
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
      </CardContent>
    </Card>
  );
}

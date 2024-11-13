import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

export function UsageInfoCard({
  usageArea,
  formalityLevel,
  synonym,
}: {
  usageArea: string;
  formalityLevel: string;
  synonym: string;
}) {
  return (
    <Card className="bg-card text-card-foreground w-full">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Volume2 className="h-6 w-6" />
        <CardTitle>Usage Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Usage Area</h3>
          <p>{usageArea || "No usage area specified"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Formality Level</h3>
          <p>{formalityLevel || "No formality level specified"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Synonym</h3>
          <p>{synonym || "No synonym provided"}</p>
        </div>
      </CardContent>
    </Card>
  );
}

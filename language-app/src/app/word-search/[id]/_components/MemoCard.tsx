import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import ReactQuillComponent from "./ReactQuill";

export function MemoCard({ memo, id }: { memo: string; id: string }) {
  return (
    <Card className="bg-white text-card-foreground">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Book className="h-6 w-6" />
        <CardTitle>Memo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Personal Notes</h3>
          <ReactQuillComponent id={id} memo={memo} />
        </div>
      </CardContent>
    </Card>
  );
}

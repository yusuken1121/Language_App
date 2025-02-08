import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import QuizAccordionDescription from "../molecules/QuizAccordionDescription";

const QuizStartDescription = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold">機能説明</CardTitle>
        <CardDescription className="hidden" />
      </CardHeader>
      <CardContent>
        <QuizAccordionDescription />
      </CardContent>
    </Card>
  );
};

export default QuizStartDescription;

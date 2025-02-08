import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import QuizButtonsDescription from "../atoms/QuizButtonsDescription";

const QuizAccordionDescription = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="quiz-explanation">
        <AccordionTrigger>コンセプトについて</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">出題ロジック</h3>
              <p>
                アプリは、ユーザーが学習中の単語の中から「次回復習予定日」が本日以前になっている単語を対象に、ランダムに10問を選んでクイズとして出題します。これにより、忘れかけた単語を効果的に復習できるようになっています。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                学習ステータスの更新
              </h3>
              <p>
                ユーザーがクイズに回答すると、その単語の学習状況が更新されます。具体的には、
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <span className="font-medium">ステータス1（初回学習）:</span>{" "}
                  正解するとステータス2に変更し、翌日に再復習
                </li>
                <li>
                  <span className="font-medium">ステータス2:</span>{" "}
                  正解するとステータス3に変更し、7日後に再復習
                </li>
                <li>
                  <span className="font-medium">ステータス3:</span>{" "}
                  正解するとステータス4に変更し、30日後に再復習
                </li>
                <li>
                  <span className="font-medium">ステータス4:</span>{" "}
                  正解後は次の段階（ここでは99など）へ変更され、さらに長い間隔で復習
                </li>
              </ul>
              <p className="mt-4">
                これにより、忘却曲線に沿った適切な間隔で復習が行われ、記憶の定着が促進されます。
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="quiz-explanation2">
        <AccordionTrigger>更新ボタンについて</AccordionTrigger>
        <AccordionContent>
          <QuizButtonsDescription />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default QuizAccordionDescription;

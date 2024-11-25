import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

const QuizDescription = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="font-bold text-3xl text-primary"
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <CircleHelp className="w-8 h-8 cursor-pointer" />
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-full bg-white">
        <DialogHeader>
          <DialogTitle className="mb-3">
            クイズのボタンの選択肢について
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            <div className="grid grid-cols-3 text-background items-center gap-9">
              {/* 忘れたボタン */}
              <p className="flex items-center justify-center col-span-1 bg-accent rounded-full font-bold border border-muted p-2 mr-2">
                忘れた
              </p>
              <p className="col-span-2 text-left">
                今やっているクイズにもう一度出題されます。ただし、学習状況には影響しません
              </p>

              {/* 次も復習*/}
              <p className="flex items-center justify-center col-span-1 bg-primary rounded-full font-bold border border-muted p-2 mr-2">
                後で復習
              </p>
              <p className="col-span-2 text-left">
                今やっているクイズには出題されなくなります。ただし、学習状況には影響しません
              </p>

              {/* 覚えた */}
              <p className="flex items-center justify-center col-span-1 bg-secondary rounded-full font-bold border border-muted p-2 mr-2">
                覚えた
              </p>
              <p className="col-span-2 text-left">
                今やっているクイズには出題されなくなります。さらに、学習状況が更新されます
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDescription;

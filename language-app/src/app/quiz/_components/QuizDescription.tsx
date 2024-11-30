import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, CircleHelp, Clock, X } from "lucide-react";
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
            問題のボタンの選択肢について
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            <div className="grid grid-cols-3 text-background items-center gap-9">
              {/* 忘れたボタン */}

              <Button className="bg-accent text-background hover:bg-accent font-bold flex-1 cursor-default">
                <X className="h-2 w-2" />
              </Button>

              <p className="col-span-2 text-left">
                今やっている問題にもう一度出題されます。ただし、学習状況には影響しません
              </p>

              {/* 次も復習*/}
              <Button className="bg-primary hover:bg-primary text-background font-bold flex-1 cursor-default">
                <Clock className="h-2 w-2" />
              </Button>
              <p className="col-span-2 text-left">
                今やっている問題には出題されなくなります。ただし、学習状況には影響しません
              </p>

              {/* 覚えた */}
              <Button className="bg-secondary hover:bg-secondary text-background font-bold flex-1 cursor-default">
                <Check className="h-2 w-2" />
              </Button>
              <p className="col-span-2 text-left">
                今やっている問題には出題されなくなります。さらに、学習状況が更新されます
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDescription;

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import QuizAccordionDescription from "../molecules/QuizAccordionDescription";

const QuizDescriptionDialog = () => {
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
          <DialogTitle className="mb-3">練習について</DialogTitle>
        </DialogHeader>
        <QuizAccordionDescription />
      </DialogContent>
    </Dialog>
  );
};

export default QuizDescriptionDialog;

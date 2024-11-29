import React from "react";
import { Button } from "./ui/button";
import { Volume2 } from "lucide-react";
import { textToSpeech } from "@/lib/textToSpeech";
import { motion } from "motion/react";

const TextToSpeechButton = ({ text }: { text: string }) => {
  return (
    <motion.div
      className="flex items-center justify-center z-30 w-10 h-10"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        onClick={() => textToSpeech(text)}
        className="flex items-center justify-center w-full h-full bg-accent hover:bg-accent/90 rounded-full"
        aria-label="Text to Speech"
      >
        <Volume2 className="w-6 h-6 text-background" />
      </Button>
    </motion.div>
  );
};

export default TextToSpeechButton;

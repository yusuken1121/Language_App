import React, { memo, useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Volume2 } from "lucide-react";
import { textToSpeech } from "@/lib/textToSpeech";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type TextToSpeechButtonProps = {
  text: string;
  className?: string;
};

const TextToSpeechButton = memo(function TextToSpeechButton({ 
  text, 
  className 
}: TextToSpeechButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleSpeak = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    await textToSpeech(text, () => setIsPlaying(false));
  };
  
  return (
    <motion.div
      className={cn("flex items-center justify-center z-30 w-10 h-10", className)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        onClick={handleSpeak}
        className="flex items-center justify-center w-full h-full bg-accent hover:bg-accent/90 rounded-full"
        aria-label="発音を聞く"
        title="発音を聞く"
        disabled={isPlaying}
      >
        {isPlaying ? (
          <Loader2 className="w-5 h-5 text-background animate-spin" />
        ) : (
          <Volume2 className="w-6 h-6 text-background" />
        )}
      </Button>
    </motion.div>
  );
});

export default TextToSpeechButton;

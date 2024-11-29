import { toast } from "sonner";

const synth = window.speechSynthesis;

export const textToSpeech = (text: string) => {
  if (!synth) {
    return toast.error("音声を再生できません");
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;
  synth.speak(utterance);
};

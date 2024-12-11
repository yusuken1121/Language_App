import { toast } from "sonner";

const synth = window.speechSynthesis;
/**
 * 指定されたテキストを音声として再生します。
 *
 * @param {string} text - 再生するテキスト。英語での発音が期待されます。
 * @throws {Error} 音声合成がサポートされていない場合にエラーをスローします。
 */
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

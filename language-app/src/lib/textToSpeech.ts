import { toast } from "sonner";

/**
 * 指定されたテキストを音声として再生します。
 *
 * @param {string} text - 再生するテキスト。英語での発音が期待されます。
 * @param {() => void} [onEnd] - 音声再生完了時に呼び出されるコールバック関数
 * @returns {Promise<void>} 再生処理の完了を表すPromise
 * @throws {Error} 音声合成がサポートされていない場合にエラーをスローします。
 */
export const textToSpeech = (text: string, onEnd?: () => void): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) {
        toast.error("お使いのブラウザは音声合成をサポートしていません");
        if (onEnd) onEnd();
        reject(new Error("音声合成がサポートされていません"));
        return;
      }

      // 空のテキストの場合は何もしない
      if (!text.trim()) {
        if (onEnd) onEnd();
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;

      // イベントリスナーを設定
      utterance.onend = () => {
        if (onEnd) onEnd();
        resolve();
      };

      utterance.onerror = (event) => {
        console.error("音声合成エラー:", event);
        toast.error("音声の再生中にエラーが発生しました");
        if (onEnd) onEnd();
        reject(new Error(`音声合成エラー: ${event.error}`));
      };

      // 現在再生中の音声をキャンセル
      synth.cancel();
      
      // 新しい音声を再生
      synth.speak(utterance);
    } catch (error) {
      console.error("音声合成例外:", error);
      toast.error("予期しないエラーが発生しました");
      if (onEnd) onEnd();
      reject(error);
    }
  });
};

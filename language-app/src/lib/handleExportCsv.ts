import { ERROR_MESSAGES } from "@/config/errorMessage";
import { toast } from "sonner";

export async function handleExportCSV() {
  try {
    // APIエンドポイントは先頭にスラッシュを付与
    const response = await fetch("/api/words/csv");
    if (!response.ok) {
      throw new Error("CSVのエクスポートに失敗しました。");
    }
    // JSON形式で返ってくるのでパースする
    const result = await response.json();
    const csvString = result.data;
    const fileName = "phrases.csv";

    // BOMを付与して文字化けを防ぐ（UTF-8用）
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);

    // CSV文字列からBlobを生成
    const blob = new Blob([bom, csvString], { type: "text/csv" });

    // BlobからオブジェクトURLを生成し、ダウンロード用のアンカー要素を作成
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    // 一部のブラウザではDOMに追加する必要があるため、一時的にbodyに追加してクリック
    document.body.appendChild(link);
    link.click();
    link.remove();

    // オブジェクトURLを解放
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
    }
  }
}

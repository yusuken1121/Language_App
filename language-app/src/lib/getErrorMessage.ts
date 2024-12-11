import { ERROR_MESSAGES } from "@/config/errorMessage";

/**
 * エラーメッセージを取得する関数
 *
 * @param error - 発生したエラーオブジェクト、文字列、または未知のエラー型
 *  - Error: JavaScript の標準 Error オブジェクト
 *  - string: 直接渡されたエラーメッセージ
 *  - unknown: 型が特定されていないエラー
 *
 * @returns string - エラーメッセージ文字列
 *  - Error オブジェクトの場合はそのメッセージ
 *  - 文字列の場合はそのまま返す
 *  - 不明な型の場合はデフォルトのエラーメッセージを返す
 */
export const getErrorMessage = (error: Error | unknown | string): string => {
  return error instanceof Error
    ? error.message
    : typeof error === "string"
    ? error
    : ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED;
};

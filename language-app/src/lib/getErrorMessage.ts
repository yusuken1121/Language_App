import { ERROR_MESSAGES } from "@/config/errorMessage";
import { ApiErrorResponse } from "@/types";

/**
 * エラーメッセージを取得する関数
 *
 * @param error - 発生したエラーオブジェクト、文字列、または未知のエラー型
 *  - Error: JavaScript の標準 Error オブジェクト
 *  - Response: Fetch API レスポンスオブジェクト
 *  - ApiErrorResponse: APIからのエラーレスポンス
 *  - string: 直接渡されたエラーメッセージ
 *  - unknown: 型が特定されていないエラー
 *
 * @returns string - エラーメッセージ文字列
 */
export const getErrorMessage = (error: unknown): string => {
  // Errorオブジェクトの場合
  if (error instanceof Error) {
    return error.message || ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED;
  }

  // 文字列の場合
  if (typeof error === "string") {
    return error;
  }

  // Response オブジェクトの場合 (Fetch API)
  if (error instanceof Response) {
    if (error.status === 401) {
      return ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED;
    } else if (error.status === 403) {
      return ERROR_MESSAGES.BACKEND.GENERAL.FORBIDDEN;
    } else if (error.status === 404) {
      return ERROR_MESSAGES.BACKEND.GENERAL.NOT_FOUND;
    } else if (error.status === 429) {
      return ERROR_MESSAGES.BACKEND.API.RATE_LIMIT;
    } else if (error.status >= 500) {
      return ERROR_MESSAGES.BACKEND.SERVER.INTERNAL;
    }
    return `エラーコード: ${error.status} - ${
      error.statusText || "不明なエラー"
    }`;
  }

  // APIエラーレスポンスの場合
  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiErrorResponse;

    // エラーメッセージが含まれている場合
    if (apiError.message) {
      return apiError.message;
    }

    // エラー文字列が含まれている場合
    if (apiError.error) {
      return apiError.error;
    }

    // ステータスコードが含まれている場合
    if (apiError.statusCode) {
      if (apiError.statusCode === 401) {
        return ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED;
      } else if (apiError.statusCode === 403) {
        return ERROR_MESSAGES.BACKEND.GENERAL.FORBIDDEN;
      } else if (apiError.statusCode === 404) {
        return ERROR_MESSAGES.BACKEND.GENERAL.NOT_FOUND;
      } else if (apiError.statusCode === 429) {
        return ERROR_MESSAGES.BACKEND.API.RATE_LIMIT;
      } else if (apiError.statusCode >= 500) {
        return ERROR_MESSAGES.BACKEND.SERVER.INTERNAL;
      }
    }

    // エラーコードが含まれている場合
    if (apiError.code === "NETWORK_ERROR") {
      return ERROR_MESSAGES.BACKEND.GENERAL.NETWORK;
    } else if (apiError.code === "TIMEOUT_ERROR") {
      return ERROR_MESSAGES.BACKEND.GENERAL.TIMEOUT;
    } else if (apiError.code === "DUPLICATE_ERROR") {
      return ERROR_MESSAGES.BACKEND.API.DUPLICATE;
    }
  }

  // それ以外の不明なエラー
  return ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED;
};

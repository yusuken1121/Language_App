// src/lib/errorResponse.ts
import { NextResponse } from "next/server";

/**
 * 指定されたエラーメッセージとステータスコードを使用して、
 * JSON形式のエラーレスポンスを生成します。
 *
 * @param message - エラー内容を表す文字列。レスポンスの `error` フィールドに設定されます。
 * @param status - HTTPステータスコードを指定します。例: 400, 401, 500 など。
 * @returns JSON形式のエラーレスポンスを返します。
 */
export function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

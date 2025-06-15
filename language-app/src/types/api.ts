// APIレスポンスエラー形式の型定義
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  code?: string;
}

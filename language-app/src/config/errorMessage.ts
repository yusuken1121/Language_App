// src/config/errorMessage.ts

export const ERROR_MESSAGES = {
  BACKEND: {
    GENERAL: {
      UNEXPECTED: "予期しないエラーが発生しました。",
      NETWORK: "ネットワークエラーが発生しました。接続を確認してください。",
      FORBIDDEN: "このリソースにアクセスする権限がありません。",
      NOT_FOUND: "要求されたリソースが見つかりません。",
      TIMEOUT: "リクエストがタイムアウトしました。もう一度お試しください。",
    },
    VALIDATION: {
      REQUIRED: (fieldName: string) => `${fieldName}は必須項目です。`,
      INVALID: (fieldName: string) => `${fieldName}の値が無効です。`,
    },
    AUTH: {
      UNAUTHORIZED: "認証に失敗しました。再度ログインしてください。",
      TOKEN_EXPIRED:
        "セッションの有効期限が切れています。再度ログインしてください。",
    },
    SERVER: {
      INTERNAL: "サーバーエラーが発生しました。後でもう一度お試しください。",
      MAINTENANCE: "サーバーは現在メンテナンス中です。後ほどお試しください。",
    },
    QUIZ: {
      NOT_FOUND: "フレーズが見つかりませんでした。",
    },
    WORDS: {
      DUPLICATE: "すでにそのフレーズは存在します。",
    },
    API: {
      INVALID: "無効なリクエストです。",
      RATE_LIMIT:
        "リクエストが多すぎます。しばらくしてから再度お試しください。",
      UNKNOWN_ERROR: "不明なAPIエラーが発生しました。",
      DUPLICATE: "そのデータは既に存在しています。",
    },
  },
  FRONTEND: {
    FORM: {
      EMPTY_FIELD: (fieldName: string) => `${fieldName}を入力してください。`,
      INVALID_INPUT: (fieldName: string) => `${fieldName}が無効です。`,
    },
    UI: {
      LOADING_FAILED: (componentName: string) =>
        `${componentName}の読み込みに失敗しました。`,
    },
  },
} as const;

export type ErrorMessageKeys = keyof typeof ERROR_MESSAGES;

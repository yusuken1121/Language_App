export const getErrorMessage = (error: Error | unknown | string) => {
  return error instanceof Error
    ? error.message
    : typeof error === "string"
    ? error
    : "予期せぬエラーが発生しました。";
};

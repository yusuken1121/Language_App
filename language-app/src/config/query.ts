import { toast } from "sonner";

/**
 * クエリを管理するためのオブジェクト
 * 各プロパティはアプリケーションで利用するクエリパラメータを一元管理します。
 */
export const queryKeys = {
  FILTER: {
    FORMALITY: "formality", // フォーマリティによるフィルタリング
    FAVORITE: "favorite", // お気に入りによるフィルタリング
  },
  WORDSEARCH: {
    SEARCH: "search", // 検索クエリ
    ADD: "add", // 新しい単語の追加
  },
  SORT: "sort", // ソート順を指定するクエリ
  PAGE: "page", // ページを指定するクエリ
};

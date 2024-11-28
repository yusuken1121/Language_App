export type FilterCategory = {
  label: string; // クエリに入る名前
  name: string; // Dialogの選択肢の名前
};

// フィルターのクエリ名を入れる
export const queryKeys = [
  "formality", //0
  "favorite", //1
  "search", //2
  "sort", //3
  "add", //4
  "page", //5
];

// formality level
export const filterFormality: FilterCategory[] = [
  { label: "カジュアル", name: "カジュアル" },
  { label: "普通", name: "普通" },
  { label: "フォーマル", name: "フォーマル" },
];

// favorite
export const filterFavorite: FilterCategory[] = [
  { label: "true", name: "お気に入り" },
];

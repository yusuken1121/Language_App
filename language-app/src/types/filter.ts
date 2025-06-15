// フィルターカテゴリの型定義
export interface FilterCategory {
  label: string; // クエリに入る名前
  name: string; // Dialogの選択肢の名前
}

// フィルターボタングループのProps
export interface FilterButtonGroupProps {
  queryKey: string;
  filterItems: FilterCategory[];
  selectedFilters: string[];
  onFilterChange: (queryKey: string, value: string) => void;
  className?: string;
}

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { SortType } from "../WordsList";

export const sortTypeList: { label: string; value: SortType }[] = [
  { label: "最新順", value: "latest" },
  { label: "最古順", value: "oldest" },
  { label: "昇順", value: "asc" },
  { label: "降順", value: "desc" },
];
const SortBox = ({ setSort }: { setSort: (sort: SortType) => void }) => {
  return (
    <div className="w-[150px]">
      <Select onValueChange={(value) => setSort(value as SortType)}>
        <SelectTrigger className="bg-accent text-background">
          <SelectValue placeholder="並び替え" />
        </SelectTrigger>
        <SelectContent>
          {sortTypeList.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBox;

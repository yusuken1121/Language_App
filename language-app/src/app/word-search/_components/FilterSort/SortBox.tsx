import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { SortType } from "../WordsList";
import { createQueryString } from "@/lib/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { queryKeys } from "@/config/fitlerCategory";

export const sortTypeList: { label: string; value: SortType }[] = [
  { label: "最新順", value: "latest" },
  { label: "最古順", value: "oldest" },
  { label: "昇順", value: "asc" },
  { label: "降順", value: "desc" },
];
const SortBox = () => {
  const [sort, setSort] = useState<SortType>("latest");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSort = (value: string) => {
    setSort(value as SortType);
    const newParams = createQueryString(searchParams, queryKeys[3], value);
    router.push(pathname + "?" + newParams);
  };
  return (
    <div className="w-[150px]">
      <Select onValueChange={(value) => handleSort(value)}>
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

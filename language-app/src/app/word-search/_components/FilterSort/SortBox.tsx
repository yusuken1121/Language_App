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
import { queryKeys } from "@/config/query";
import { cn } from "@/lib/utils";

export const sortTypeList: { label: string; value: SortType }[] = [
  { label: "最新順", value: "latest" },
  { label: "最古順", value: "oldest" },
  { label: "昇順", value: "asc" },
  { label: "降順", value: "desc" },
];
const SortBox = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSort = (value: string) => {
    const newParams = createQueryString(searchParams, queryKeys.SORT, value);
    router.push(pathname + "?" + newParams);
  };
  return (
    <Select onValueChange={(value) => handleSort(value)}>
      <SelectTrigger
        className={cn("bg-accent text-background", className)}
      ></SelectTrigger>
      <SelectContent>
        {sortTypeList.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortBox;

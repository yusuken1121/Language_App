import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import { cn } from "@/lib/utils";
import { SortType } from "@/types";

export const sortTypeList: { label: string; value: SortType }[] = [
  { label: "最新順", value: "latest" },
  { label: "最古順", value: "oldest" },
  { label: "昇順", value: "asc" },
  { label: "降順", value: "desc" },
];

const SortBox = ({
  className,
  currentSort,
  handleSort,
}: {
  className?: string;
  currentSort: string;
  handleSort: (value: string) => void;
}) => {
  return (
    <RadioGroup
      onValueChange={handleSort}
      value={currentSort}
      className={cn("flex flex-col space-y-1", className)}
    >
      {sortTypeList.map((item) => (
        <div key={item.value} className="flex items-center space-x-2">
          <RadioGroupItem
            value={item.value}
            id={item.value}
            className="bg-white border-background text-background "
          />
          <Label
            htmlFor={item.value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default SortBox;

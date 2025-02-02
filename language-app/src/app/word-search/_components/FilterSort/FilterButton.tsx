import { Button } from "@/components/ui/button";
import { FilterCategory } from "@/config/fitlerCategory";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

type FilterButtonProps = {
  queryKey: string;
  filterItems: FilterCategory[];
  selectedFilters: string[];
  onFilterChange: (queryKey: string, value: string) => void;
};

const FilterButton: FC<FilterButtonProps> = ({
  queryKey,
  filterItems,
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      {filterItems.map((item) => {
        const isActive = selectedFilters.includes(item.label);
        return (
          <Button
            key={item.label}
            onClick={() => onFilterChange(queryKey, item.label)}
            variant={isActive ? "default" : "outline"}
            className={cn("rounded-full")}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default FilterButton;

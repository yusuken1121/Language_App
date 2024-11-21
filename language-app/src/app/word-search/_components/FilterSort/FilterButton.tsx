import { Button } from "@/components/ui/button";
import { FilterCategory } from "@/config/fitlerCategory";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

type FilterButtonProps = {
  filterItems: FilterCategory[];
  selectedFilters: string[];
  onFilterChange: (value: string) => void;
};

const FilterButton: FC<FilterButtonProps> = ({
  filterItems,
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      {filterItems.map((item) => {
        const isActive = selectedFilters.includes(item.name);
        return (
          <Button
            key={item.label}
            onClick={() => onFilterChange(item.name)}
            className={cn(
              "bg-white text-background hover:bg-background/80 hover:text-white",
              isActive && "bg-background text-white"
            )}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default FilterButton;

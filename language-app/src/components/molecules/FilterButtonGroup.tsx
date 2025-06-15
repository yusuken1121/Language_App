import { Button } from "@/components/ui/button";
import { FilterButtonGroupProps } from "@/types";
import { cn } from "@/lib/utils";
import React, { FC, memo } from "react";

const FilterButtonGroup: FC<FilterButtonGroupProps> = memo(
  ({ queryKey, filterItems, selectedFilters, onFilterChange, className }) => {
    return (
      <div className={cn("flex items-center gap-2 flex-wrap", className)}>
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
  }
);

FilterButtonGroup.displayName = "FilterButtonGroup";

export default FilterButtonGroup;

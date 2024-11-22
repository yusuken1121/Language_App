import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  filterFavorite,
  filterFormality,
  queryKeys,
} from "@/config/fitlerCategory";
import { SlidersHorizontal } from "lucide-react";
import FilterButton from "./FilterButton";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterBox = () => {
  const [open, setOpen] = useState(false);
  const [formalityFilters, setFormalityFilters] = useState<string[]>([]);
  const [favoriteFilters, setFavoriteFilters] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 初期状態をクエリパラメータから取得
  useEffect(() => {
    const formalityParam = searchParams.get(queryKeys[0]) || "";
    const favoriteParam = searchParams.get(queryKeys[1]) || "";

    setFormalityFilters(formalityParam.split("%").filter(Boolean));
    setFavoriteFilters(favoriteParam.split("%").filter(Boolean));
  }, [searchParams]);

  const handleFilterChange = (queryKey: string, value: string) => {
    // formality
    if (queryKey === queryKeys[0]) {
      setFormalityFilters((prev) => {
        if (prev.includes(value)) {
          // valueが含まれている場合は除外
          return prev.filter((v) => v !== value);
        } else {
          // valueが含まれないときは追加a
          return [...prev, value];
        }
      });
    }

    // favorite
    if (queryKey === queryKeys[1]) {
      setFavoriteFilters((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (formalityFilters.length === 0) {
      params.delete(queryKeys[0]);
    } else {
      params.set(queryKeys[0], formalityFilters.join("%"));
    }

    if (favoriteFilters.length === 0) {
      params.delete(queryKeys[1]);
    } else {
      params.set(queryKeys[1], favoriteFilters.join("%"));
    }
    // router.push(pathname + "?" + decodeURIComponent(params.toString()));
    router.push(pathname + "?" + params.toString());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center bg-primary justify-center w-12 h-12 rounded-full font-medium "
        >
          <SlidersHorizontal className="w-10 h-10 text-background" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-accent">
        <DialogHeader>
          <DialogTitle>フィルター</DialogTitle>
          <DialogDescription>
            フィルターをしたい項目を入力し、保存ボタンを押してください。
          </DialogDescription>
        </DialogHeader>
        {/* Formality level */}
        <div className="flex flex-col gap-2">
          <p>Formality Level</p>
          <FilterButton
            queryKey={queryKeys[0]}
            filterItems={filterFormality}
            selectedFilters={formalityFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <Separator className="bg-secondary" />

        <div className="flex flex-col gap-2">
          <p>Favorite</p>
          <FilterButton
            queryKey={queryKeys[1]}
            filterItems={filterFavorite}
            selectedFilters={favoriteFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <DialogFooter className="sticky bottom-0 flex items-center justify-center w-full py-2 bg-opacity-90 z-50">
          <div className="flex gap-2 mt-2">
            <Button
              className="bg-background hover:bg-secondary/90"
              type="button"
              onClick={handleApplyFilters}
            >
              適用
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterBox;

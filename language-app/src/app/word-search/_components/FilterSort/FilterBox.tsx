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
import { filterFavorite, filterFormality } from "@/config/filterCategory";
import { SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { queryKeys } from "@/config/query";
import ResetBox from "./ResetBox";
import ButtonInner from "@/components/atoms/ButtonInner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import SortBox from "./SortBox";
import FilterButtonGroup from "@/components/molecules/FilterButtonGroup";

const FilterBox = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [formalityFilters, setFormalityFilters] = useState<string[]>([]);
  const [favoriteFilters, setFavoriteFilters] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<string>(""); // ソート用のstate
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 初期状態をクエリパラメータから取得
  useEffect(() => {
    const formalityParam = searchParams.get(queryKeys.FILTER.FORMALITY) || "";
    const favoriteParam = searchParams.get(queryKeys.FILTER.FAVORITE) || "";
    const sortParam = searchParams.get(queryKeys.SORT) || "";

    setFormalityFilters(formalityParam.split("%").filter(Boolean));
    setFavoriteFilters(favoriteParam.split("%").filter(Boolean));
    setCurrentSort(sortParam);
  }, [searchParams]);

  const handleFilterChange = (queryKey: string, value: string) => {
    if (queryKey === queryKeys.FILTER.FORMALITY) {
      setFormalityFilters((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
    }

    if (queryKey === queryKeys.FILTER.FAVORITE) {
      setFavoriteFilters((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };

  // ソート用の関数
  const handleSort = (value: string) => {
    setCurrentSort(value);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (formalityFilters.length === 0) {
      params.delete(queryKeys.FILTER.FORMALITY);
    } else {
      params.set(queryKeys.FILTER.FORMALITY, formalityFilters.join("%"));
    }

    if (favoriteFilters.length === 0) {
      params.delete(queryKeys.FILTER.FAVORITE);
    } else {
      params.set(queryKeys.FILTER.FAVORITE, favoriteFilters.join("%"));
    }

    if (!currentSort) {
      params.delete(queryKeys.SORT);
    } else {
      params.set(queryKeys.SORT, currentSort);
    }

    // page = 1 にリセット
    params.set("page", "1");

    router.push(pathname + "?" + params.toString());
    setOpen(false);
  };

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className={cn(
              "flex items-center justify-center gap-2 rounded-full",
              className
            )}
          >
            <ButtonInner icon={SlidersHorizontal} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-secondary-background h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>フィルター</DrawerTitle>
            <DrawerDescription>
              フィルターをしたい項目を入力し、保存ボタンを押してください。
            </DrawerDescription>
            <Separator />
          </DrawerHeader>

          {/* フィルターとソート */}
          <div className="flex flex-col px-5 gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Sort</p>
              <SortBox
                currentSort={currentSort}
                handleSort={handleSort}
                className="w-[180px]"
              />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <p className="font-bold">Formality Level</p>
              <FilterButtonGroup
                queryKey={queryKeys.FILTER.FORMALITY}
                filterItems={filterFormality}
                selectedFilters={formalityFilters}
                onFilterChange={handleFilterChange}
              />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <p className="font-bold">Favorite</p>
              <FilterButtonGroup
                queryKey={queryKeys.FILTER.FAVORITE}
                filterItems={filterFavorite}
                selectedFilters={favoriteFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          <DrawerFooter className="sticky bottom-0 flex items-center justify-center w-full py-2 bg-opacity-90 shadow-shadow-top z-50">
            <div className="flex gap-2 mt-2">
              <Button
                className="bg-background hover:bg-secondary/90"
                onClick={handleApplyFilters}
              >
                適用
              </Button>
              <ResetBox
                innerIconClassName="text-foreground"
                setOpen={setOpen}
              />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "flex items-center justify-center gap-2 rounded-full",
            className
          )}
        >
          <ButtonInner icon={SlidersHorizontal} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-secondary-background">
        <DialogHeader>
          <DialogTitle>フィルター</DialogTitle>
          <DialogDescription>
            フィルターをしたい項目を入力し、保存ボタンを押してください。
          </DialogDescription>
        </DialogHeader>

        {/* フィルターとソート */}
        <div className="flex flex-col gap-6">
          <p className="font-bold">Sort</p>
          <SortBox
            currentSort={currentSort}
            handleSort={handleSort}
            className="w-[180px]"
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Formality Level</p>
          <FilterButtonGroup
            queryKey={queryKeys.FILTER.FORMALITY}
            filterItems={filterFormality}
            selectedFilters={formalityFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Favorite</p>
          <FilterButtonGroup
            queryKey={queryKeys.FILTER.FAVORITE}
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
            <ResetBox innerIconClassName="text-foreground" setOpen={setOpen} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterBox;

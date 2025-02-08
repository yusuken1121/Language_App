"use client";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/config/query";
import { createQueryString } from "@/lib/createQueryString";
import { newPhraseSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus2, Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function CreateWordForm({
  dialogButtonClassName,
}: {
  dialogButtonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);

  // Create a schema for the word
  const form = useForm<z.infer<typeof newPhraseSchema>>({
    resolver: zodResolver(newPhraseSchema),
    defaultValues: { createPhrase: "" },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const onAdd = async (data: { createPhrase: string }) => {
    const createPhrase = data.createPhrase.trim();
    try {
      setIsAddLoading(true);
      const response = await fetch("api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm: createPhrase }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "フレーズの追加に失敗しました");
      }

      const query = createQueryString(
        searchParams,
        queryKeys.WORDSEARCH.ADD,
        createPhrase
      );
      router.push(`?${query}`, { scroll: false });
      toast.success("フレーズを追加しました", { position: "top-right" });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error during add:", error);
      toast.error("フレーズの追加中にエラーが発生しました", {
        position: "top-right",
      });
    } finally {
      setIsAddLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "rounded-full border-none w-fit",
            dialogButtonClassName
          )}
        >
          <FilePlus2 />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-secondary-background"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>新しいフレーズを追加</DialogTitle>
          <DialogDescription>
            わからないフレーズをAIが調べて追加します。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAdd)}>
            <FormField
              control={form.control}
              name="createPhrase"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-5">
                      <Input {...field} placeholder="新しいフレーズを入力" />
                      <FormMessage />
                      <Button
                        type="submit"
                        variant="default"
                        className=""
                        disabled={isAddLoading}
                      >
                        {isAddLoading ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <>
                            <span>追加する</span>
                            <Search className="h-3 w-3" />
                          </>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

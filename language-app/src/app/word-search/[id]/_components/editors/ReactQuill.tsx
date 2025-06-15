"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import { ERROR_MESSAGES } from "@/config/errorMessage";
const ReactQuill = dynamic(() => import("react-quill-new"));

export default function ReactQuillComponent({
  memo,
  id,
}: {
  memo: string;
  id: string;
}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSetValue = useDebouncedCallback((val) => {
    setValue(val);
  }, 300);

  useEffect(() => {
    setValue(memo);
  }, [memo]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/words/${id}`, {
        method: "PUT",
        body: JSON.stringify({ memo: value }),
      });
      toast.success("メモを更新しました。");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES.FRONTEND.GENERAL.UNEXPECTED);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-[300px] flex flex-col gap-6">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={debouncedSetValue}
        className="h-48"
      />
      <Button
        className="bg-accent text-accent-foreground hover:bg-accent/70 self-end mt-16"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Notes
      </Button>
    </div>
  );
}

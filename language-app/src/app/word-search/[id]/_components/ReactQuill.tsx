"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import React, { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

import { toast } from "sonner";

export default function ReactQuillComponent({
  memo,
  id,
}: {
  memo: string;
  id: string;
}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      console.error(error);
      toast.error("メモの更新に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-[300px] flex flex-col gap-6">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
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

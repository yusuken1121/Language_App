"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
      toast.success("Notes saved");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save notes");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-48 flex flex-col gap-4">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="h-48 mb-8"
      />
      <Button
        className="bg-accent text-accent-foreground hover:bg-accent/70"
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

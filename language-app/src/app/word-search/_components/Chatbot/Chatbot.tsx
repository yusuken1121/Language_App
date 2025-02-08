"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { Loader2, MessageCircle, SendIcon, Sparkle } from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="fixed flex items-center justify-center bottom-32 right-11 z-30 w-14 h-14 bg-secondary hover:bg-secondary/90 rounded-full p-0"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button className="flex items-center justify-center w-full h-full bg-transparent hover:bg-transparent rounded-full p-0">
            <MessageCircle className="w-8 h-8 text-white" />
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent
        className="flex flex-col w-full h-[500px] mx-auto bg-gray-50 rounded-lg shadow-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex-1 overflow-auto p-2">
          {messages.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg text-background mt-4">
                日本語で知りたいフレーズを入力してください！
              </p>
            </div>
          )}
          {/* メッセージボックス */}
          <div className="flex flex-col gap-4">
            {messages.map((message) =>
              // AIからのメッセージ
              message.role === "assistant" ? (
                <div key={message.id} className="flex items-start gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center p-2 w-6 h-6 border border-muted rounded-full bg-background">
                      <Sparkle className="h-4 w-4 rounded-full text-secondary-foreground" />
                    </div>
                    <div className="bg-secondary text-background rounded-lg p-3 max-w-[90%]">
                      <Markdown className="text-sm">{message.content}</Markdown>
                    </div>
                  </div>
                </div>
              ) : (
                // ユーザーからのメッセージ
                <div key={message.id} className="flex justify-end">
                  <div className="bg-background rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm text-secondary-foreground">
                      {message.content}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          className="bg-secondary-background px-4 py-3 flex items-center gap-2 shadow-lg"
        >
          <div className="relative flex-1">
            <Textarea
              placeholder="日本語で知りたいフレーズのみ入力してください..."
              className="bg-secondary-background border border-background focus:border-accent rounded-lg pr-12 text-background min-h-[64px]"
              rows={1}
              value={input}
              onChange={handleInputChange}
            />

            {!isLoading ? (
              <Button
                type="submit"
                size="icon"
                disabled={!input || isLoading}
                className="absolute flex items-center justify-center bottom-3 right-3 rounded-full bg-background hover:bg-secondary"
              >
                <SendIcon className="h-4 w-4 text-secondary-foreground" />
                <span className="sr-only">送信</span>
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                disabled={!isLoading}
                onClick={stop}
                className="absolute flex items-center justify-center bottom-3 right-3 rounded-full bg-background hover:bg-background/80"
              >
                <Loader2 className="h-4 w-4 animate-spin bg-background text-secondary-foreground" />
                <span className="sr-only">送信</span>
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

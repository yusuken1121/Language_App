"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import {
  Loader2,
  MessageCircle,
  SendIcon,
  Sparkle,
  SquareIcon,
} from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "motion/react";

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
          <Button className="flex items-center justify-center w-full h-full bg-transparent rounded-full p-0">
            <MessageCircle className="w-8 h-8 text-white" />
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full h-[500px] mx-auto bg-accent rounded-lg shadow-lg">
        <div className="flex-1 overflow-auto p-2">
          {messages.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg text-background mt-4">
                日本語で知りたいフレーズを入力してください！
              </p>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {messages.map((message) =>
              message.role === "assistant" ? (
                <div
                  key={message.id}
                  className="flex items-start gap-3 text-background"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center p-2 w-6 h-6 border border-muted rounded-full bg-secondary">
                      <Sparkle className="h-4 w-4 rounded-full text-background" />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[90%]">
                      <Markdown className="text-sm text-muted-foreground">
                        {message.content}
                      </Markdown>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm text-background">{message.content}</p>
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
          className="bg-muted/50 px-4 py-3 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Textarea
              placeholder="日本語で知りたいフレーズのみ入力してください..."
              className="border border-accent focus:border-accent rounded-lg pr-12 text-background min-h-[64px]"
              rows={1}
              value={input}
              onChange={handleInputChange}
            />

            {!isLoading ? (
              <Button
                type="submit"
                size="icon"
                disabled={!input || isLoading}
                className="absolute flex items-center justify-center bottom-3 right-3 rounded-full bg-secondary hover:bg-secondary"
              >
                <SendIcon className="h-4 w-4 text-background" />
                <span className="sr-only">送信</span>
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                disabled={!isLoading}
                onClick={stop}
                className="absolute flex items-center justify-center bottom-3 right-3 rounded-full bg-secondary hover:bg-secondary"
              >
                <Loader2 className="h-4 w-4 animate-spin bg-secondary text-background" />
                <span className="sr-only">送信</span>
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

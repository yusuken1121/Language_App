import { google } from "@ai-sdk/google";
import { NextRequest } from "next/server";
import { type CoreMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { messages }: { messages: CoreMessage[] } = await req.json(); //[ { role: '', content: '' } ]

  const messagesText = messages.map((msg) => msg.content).join(", ");

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: "You are a helpful assistant for Japanese English learner",
    prompt: `日本語学習者のために英語を教えています。日本語の単語やフレーズ「${messagesText}」に関連する、一般的な英語のフレーズを3つ教えてください。最もよく使われるものから順に列挙してください。必要であれば、簡単な説明も追加してください。日本語で答えてください。`,
  });

  return result.toDataStreamResponse();
}

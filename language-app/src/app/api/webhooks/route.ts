import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined. Please set it in .env file.");
    return new Response("Server configuration error", { status: 500 });
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("Missing required Svix headers");
    return new Response("Missing headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Unauthorized request", { status: 400 });
  }

  const prisma = new PrismaClient();

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    try {
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses?.[0]?.email_address || "",
          name: `${first_name || ""} ${last_name || ""}`,
          profilePicture: image_url || null,
        },
      });
      console.log("User created successfully:", user.clerkId);
    } catch (err) {
      console.error("Error creating user in the database:", err);
      return new Response("Database error", { status: 500 });
    }
  } else {
    console.log("Unhandled event type:", eventType);
  }

  return new Response("Webhook processed", { status: 200 });
}

import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  try {
    // const token = await getToken({ template: "supabase" });

    // // Add logic here to fetch data from Supabase and return it.

    // const data = { supabaseData: "Hello World" };

    return Response.json({ data: userId });
  } catch (error) {
    return Response.json(error);
  }
}

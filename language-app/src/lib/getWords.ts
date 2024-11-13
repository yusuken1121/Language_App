import { API_URL } from "@/config/ENV";
import { auth } from "@clerk/nextjs/server";

export async function getWords() {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(`${API_URL}/api/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

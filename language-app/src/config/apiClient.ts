import { API_URL } from "@/config/ENV";
import { auth } from "@clerk/nextjs/server";

export const apiClientFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const baseURL = API_URL || "http://localhost:3000";
  const { getToken } = await auth();
  const token = await getToken();

  const { headers, ...restOptions } = options;
  const response = await fetch(`${baseURL}/api/${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

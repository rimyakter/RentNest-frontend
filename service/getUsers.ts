"use server";

import { cookies } from "next/headers";
import { IUser } from "@/lib/type";

export const getUsers = async (): Promise<IUser[]> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return [];
  }

  try {
    const res = await fetch(`${process.env.API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch users:", res.status);
      return [];
    }

    const result: { users: IUser[] } = await res.json();

    return result.users ?? [];
  } catch (error) {
    console.error("getUsers error:", error);
    return [];
  }
};

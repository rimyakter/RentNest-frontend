"use server";

import { api } from "@/lib/api";
import { IUser } from "@/lib/type";

export const getMe = async (): Promise<IUser | null> => {
  const result = await api<{ user: IUser }>("/users/me", {
    auth: true,
    cache: "no-store",
  });

  return result.ok ? result.data.user : null;
  
};

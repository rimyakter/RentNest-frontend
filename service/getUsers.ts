"use server";

import { api } from "@/lib/api";
import { IUser } from "@/lib/type";


export const getUsers = async (): Promise<IUser[]> => {
  const result = await api<{ users: IUser[] }>("/users", {
    auth: true,
    cache: "no-store",
  });

  return result.ok ? result.data.users : [];
};
"use server";

import { api } from "@/lib/api";
import { IProperty } from "@/lib/type";


export const getProperties = async (): Promise<IProperty[]> => {
  const result = await api<{ properties: IProperty[] }>("/properties", {
    cache: "no-store",
  });

  return result.ok ? result.data : [];
};
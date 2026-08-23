"use server";

import { api } from "@/lib/api";
import { ICategory } from "@/lib/type";


export const getCategories = async (): Promise<ICategory[]> => {
  const result = await api<{ categories: ICategory[] }>("/categories", {
    cache: "no-store",
  });

  return result.ok ? result.data.categories : [];
};
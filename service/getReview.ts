"use server";

import { api } from "@/lib/api";
import { IReview } from "@/lib/type";


export const getReview = async (
  id: string,
): Promise<IReview | null> => {
  const result = await api<{ review: IReview }>(
    `/reviews/${id}`,
    {
      cache: "no-store",
    },
  );

  return result.ok ? result.data.review : null;
};
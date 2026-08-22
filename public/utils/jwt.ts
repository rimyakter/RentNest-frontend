import { ITokenPayload } from "@/lib/type";
import jwt from "jsonwebtoken";

export const decodeToken = (token?: string): ITokenPayload | null => {
  if (!token) return null;

  try {
    const payload = jwt.decode(token) as ITokenPayload | null;
    const isExpired = !payload || payload.exp * 1000 < Date.now();

    return isExpired ? null : payload;
  } catch {
    return null;
  }
};

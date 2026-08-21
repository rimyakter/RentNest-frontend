export type IRole = "ADMIN" | "LANDLORD" | "TENANT";

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: IRole;
};

export type ITokenPayload = {
  id: string;
  email: string;
  role: IRole;
  iat: number;
  exp: number;
};

export type ILoginState = {
  success: boolean;
  message: string;
};

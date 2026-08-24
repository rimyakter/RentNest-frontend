export type IRole = "ADMIN" | "LANDLORD" | "TENANT";

export type IPaymentMethod = "CARD" | "MOBILE_BANKING" | "BANK_TRANSFER";

export type IPaymentProvider = "STRIPE" | "SSLCOMMERZ";

export type IPaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type IRentalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: IRole;
  createdAt?: string;
  updatedAt?: string;
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

export type ICategory = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IProperty = {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  image: string;
  available: boolean;
  ownerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  owner?: IUser;
  category?: ICategory;
  requests?: IRentalRequest[];
  reviews?: IReview[];
};

export type IRentalRequest = {
  id: string;
  propertyId: string;
  renterId: string;
  moveInDate: string;
  duration: number | null;
  message: string | null;
  status: IRentalRequestStatus;
  createdAt: string;
  updatedAt: string;

  property?: IProperty;
  renter?: IUser;
  payment?: IPayment | null;
};

export type IPayment = {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  renterId: string;
  amount: number;
  method: IPaymentMethod;
  provider: IPaymentProvider;
  status: IPaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;

  rentalRequest?: IRentalRequest;
  renter?: IUser;
};

export type IReview = {
  id: string;
  propertyId: string;
  renterId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;

  property?: IProperty;
  renter?: IUser;
};

export type IFormState = {
  success: boolean;
  message: string;
};

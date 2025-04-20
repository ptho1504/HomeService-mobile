import { FreelancerWorkModel } from "./workTypes";

export interface AdminModel {
  jwt: string;
}

export interface UserModel {
  jwt: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  dob: Date;
  phoneNumber?: string;
  reputationPoint?: string;
  status: "ACTIVE" | "PROHIBITIVE";
  role: "CUSTOMER" | "FREELANCER";
  gender: "MALE" | "FEMALE";
  createdAt: number[];
  bankAccount?: BankAccountModel | any;
  addresses: AddressModel[];
  freelancerWorkServices: FreelancerWorkModel[];
}

export interface NotificationModel {
  id: number;
  title: string;
  content: string;
  createdAt: number[];
  postId: string;
  view: boolean;
}

export interface TransactionModel {
  userId: string;
  amount: number;
  successUrl?: string;
  cancelUrl?: string;
}

export interface PaymentHistoryModel {
  id: string;
  refId: string;
  amount: number;
  createdAt: number[];
}

export interface BankAccountModel {
  accountNumber: string;
  bank: BankModel;
}

export interface BankModel {
  logo: string;
  bin: string;
  fiName: string;
}

export interface AddressModel {
  id?: string;
  customerName: string;
  phoneNumber: string;
  detail: string;
  latitude: string;
  longitude: string;
  default: boolean;
  deleted?: boolean;
  userId?: string;
}

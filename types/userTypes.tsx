import { FreelancerWorkModel } from './workTypes';

export interface AdminModel {
  jwt: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: string;
  dob: Date;
  phoneNumber?: string;
  reputationPoint?: string;
  status: 'ACTIVE' | 'PROHIBITIVE';
  role: 'CUSTOMER' | 'FREELANCER';
  gender: 'MALE' | 'FEMALE';
  createdAt: number[];
  bankAccount?: BankAccountModel;
  addresses: AddressModel[];
  freelancerWorkServices: FreelancerWorkModel[];
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
  id: string;
  customerName: string;
  phoneNumber: string;
  detail: string;
  latitude: string;
  longtitude: string;
  default: boolean;
}

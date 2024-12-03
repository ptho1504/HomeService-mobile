import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Address, BankAccount } from "@/types/types";
import { FreelancerWorkModel } from "@/types/workTypes";

export interface User {
  id?: string;
  jwt?: string;
  avatar: string;
  email: string;
  role: string;
  dob: Date;
  name: string;
  gender: string;
  status: string;
  balance: number;
  phoneNumber: string;
  reputationPoint: number;
  googleSub: string;
  addresses: Address[];
  bankAccount: BankAccount;
  freelancerWorkServices: FreelancerWorkModel[];
}

const usersApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    getUsers: build.query<User[], string>({
      query: () => `users`,
    }),
  }),
});

export const { useLazyGetUserQuery } = usersApi;

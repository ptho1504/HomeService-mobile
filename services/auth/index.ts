import { User } from "./../users/index";
import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Response } from "@/types/response";
import { Address, BankAccount } from "@/types/types";

export interface LoginRequest {
  email: string;
  password: string;
  otp: string;
}

export interface LoginResponse {
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
}

export interface SignUpRequest {
  email: string;
  password: string;
  role: string;
  otp: string;
}

export interface SignUpResponse {
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
}

export interface SendOtpRequest {
  email: string;
  role?: string;
}

export interface VerifyRequest {
  email: string;
  otp: string;
}

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Response<User>, LoginRequest>({
      query: (credentials) => ({
        url: "/api/auth/logIn",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: build.mutation<Response<User>, SignUpRequest>({
      query: (credentials) => ({
        url: "/api/auth/signUp",
        method: "POST",
        body: credentials,
      }),
    }),
    sendOtp: build.mutation<Response<{}>, SendOtpRequest>({
      query: (credentials) => ({
        url: "/api/auth/sendOtp",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: build.mutation<Response<{}>, VerifyRequest>({
      query: (credentials) => ({
        url: "/api/auth/verifyOtp",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
export default authApi;

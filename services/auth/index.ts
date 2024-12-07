import { User } from "./../users/index";
import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Response } from "@/types/response";
import { Address, BankAccount } from "@/types/types";
import { FreelancerWorkModel } from "@/types/workTypes";

export interface LoginRequest {
  email: string;
  role: "FREELANCER" | "CUSTOMER";
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
  freelancerWorkServices: FreelancerWorkModel[];
}

export interface SignUpRequest {
  email: string;
  name: string;
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

export interface VerifyJwtForUserRequest {
  jwt: string;
}

const baseUrl = "/auth";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Response<User>, LoginRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/logIn`,
        method: "POST",
        body: credentials,
      }),
    }),
    signup: build.mutation<Response<User>, SignUpRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/signUp`,
        method: "POST",
        body: credentials,
      }),
    }),
    sendOtp: build.mutation<Response<{}>, SendOtpRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/sendOtp`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: build.mutation<Response<{}>, VerifyRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/verifyOtp`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyJwtForUser: build.mutation<Response<User>, VerifyJwtForUserRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/verifyJwtForUser`,
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
  useVerifyJwtForUserMutation,
} = authApi;
export default authApi;

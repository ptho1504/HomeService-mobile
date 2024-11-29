import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";

export interface User {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
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

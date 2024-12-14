import { Config } from '@/config';
import {
  BaseQueryApi,
  BaseQueryResult,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers, api) => {
    const token = await SecureStore.getItemAsync('jwt');
    // console.log("token in base APi", token);

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
): Promise<BaseQueryResult<any>> => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }

  // if (result.error) {
  //   return result.error;
  // }

  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ['Posts', 'PostsByCustomerId', 'TakePostsByFreelancerId'],
});

import { Config } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BaseQueryApi,
  BaseQueryResult,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers, api) => {
    const token = await AsyncStorage.getItem("user");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<BaseQueryResult<any>> => {
  const result = await baseQuery(args, api, extraOptions);
  // if (result.error && result.error.status === 401) {
  // here you can deal with 401 error
  // }

  // if (result.error && result.error.data) {
  //   return result.error.data as any;
  // }

  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

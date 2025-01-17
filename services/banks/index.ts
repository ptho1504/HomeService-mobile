import { BankModel } from "@/types/userTypes";
import { API } from "../base";
import { Response } from "@/types/response";

const bankApi = API.injectEndpoints({
  endpoints: (build) => ({
    getBanks: build.query<Response<BankModel[]>, void>({
      query: () => `banks`,
    }),
  }),
});

export const { useGetBanksQuery } = bankApi;

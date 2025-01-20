import { BankModel } from "@/types/userTypes";
import { API } from "../base";
import { Response } from "@/types/response";

interface ValidationBanksRequest {
  bin: string;
  accountNumber: string;
}

const bankApi = API.injectEndpoints({
  endpoints: (build) => ({
    getBanks: build.query<Response<BankModel[]>, void>({
      query: () => `banks`,
    }),
    postBanks: build.mutation<
      Response<{
        bankAccountName?: string;
      }>,
      ValidationBanksRequest
    >({
      query: (credentials) => ({
        url: `banks/getBankAccountName`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetBanksQuery, usePostBanksMutation } = bankApi;

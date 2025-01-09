import { BankModel } from "@/types/userTypes";
import { API } from "../base";

const bankApi = API.injectEndpoints({
  endpoints: (build) => ({
    getBanks: build.query<BankModel[], void>({
      query: () => `banks`,
    }),
  }),
});

export const { useGetBanksQuery } = bankApi;

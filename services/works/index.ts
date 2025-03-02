import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Address, BankAccount } from "@/types/types";
import {
  FreelancerWorkModel,
  registerServiceModel,
  registerServiceResultModel,
  WorkModel,
  ImageModel
} from "@/types/workTypes";

import { Response } from "@/types/response";

const baseUrl = "/works";

const worksApi = API.injectEndpoints({
  endpoints: (build) => ({
    // getUser: build.query<User, string>({
    //   query: (id) => `users/${id}`,
    // }),

    // Get all service (of a freelancer)
    getAllServices: build.query<
      Response<WorkModel[]>,
      {
        id?: string;
      }
    >({
      query: ({ id }) => {
        const params = new URLSearchParams();

        if (id !== undefined) {
          params.append("freelancerId", id.toString());
        }

        // Kết hợp base URL và query string
        return `${baseUrl}?${params.toString()}`;
      },
      providesTags: (result, error, { id }) => [{ type: "Service", id }],
    }),

    registerService: build.mutation<
      Response<registerServiceResultModel>,
      {
        serviceId: string;
        freelancerId: string;
        data: Partial<registerServiceModel>;
      }
    >({
      query: ({ serviceId, freelancerId, data }) => ({
        url: `${baseUrl}/${serviceId}/freelancers/${freelancerId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    uploadImagesForRegisterService: build.mutation<
      Response<registerServiceResultModel>,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => {
        return {
          url: `${baseUrl}/freelancerWorkService/${id}/uploadImages`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetAllServicesQuery, useRegisterServiceMutation, useUploadImagesForRegisterServiceMutation } = worksApi;

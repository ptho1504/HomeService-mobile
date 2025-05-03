import { createApi } from '@reduxjs/toolkit/query';
import { API } from '../base';
import { Address, BankAccount } from '@/types/types';
import {
  FreelancerWorkModel,
  registerServiceModel,
  registerServiceResultModel,
  WorkModel,
  ImageModel,
  ServiceDetailModel,
} from '@/types/workTypes';

import { Response } from '@/types/response';

const baseUrl = '/works';

const worksApi = API.injectEndpoints({
  endpoints: build => ({
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
          params.append('freelancerId', id.toString());
        }

        // Kết hợp base URL và query string
        return `${baseUrl}?${params.toString()}`;
      },
      providesTags: (result, error, { id }) => [{ type: 'Service', id }],
    }),

    // Get service detail of a freelancer
    getServicesDetailOfFreelancer: build.query<
      Response<FreelancerWorkModel>,
      {
        workId: string;
        freelancerId: string;
      }
    >({
      query: ({ workId, freelancerId }) => {
        // Kết hợp base URL và query string
        return `${baseUrl}/${workId}/freelancers/${freelancerId}`;
      },
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
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { freelancerId }) => [
        { type: 'Service', id: freelancerId }, // Làm mới danh sách dịch vụ của freelancer
      ],
    }),

    uploadImagesForRegisterService: build.mutation<
      Response<registerServiceResultModel>,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => {
        return {
          url: `${baseUrl}/freelancerWorkService/${id}/uploadImages`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useRegisterServiceMutation,
  useUploadImagesForRegisterServiceMutation,
  useGetServicesDetailOfFreelancerQuery,
} = worksApi;

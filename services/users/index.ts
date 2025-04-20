import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Address, BankAccount, User } from "@/types/types";
import { FreelancerWorkModel } from "@/types/workTypes";
import {
  AddressModel,
  NotificationModel,
  PaymentHistoryModel,
  UserModel,
} from "@/types/userTypes";
import { Response } from "@/types/response";
import { AddressPlaces, AddressType } from "@/types/addressType";

const baseUrl = "/users";

const usersApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query<UserModel, string>({
      query: (id) => {
        // console.log("id in api", id);
        return `${baseUrl}/users/${id}`;
      },
      providesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : [],
    }),
    getUsers: build.query<
      Response<UserModel[]>,
      {
        page?: number;
        size?: number;
        role?: string;
        postId?: string;
      }
    >({
      query: ({ page, size, role, postId }) => {
        // Tạo query string từ các tham số truyền vào
        const params = new URLSearchParams();

        if (page !== undefined) {
          params.append("index", page.toString());
        }
        if (size !== undefined) {
          params.append("size", size.toString());
        }
        if (role) {
          params.append("freelancerId", role);
        }
        if (postId) {
          params.append("freelancerId", postId);
        }
        // Kết hợp base URL và query string
        return `${baseUrl}?${params.toString()}`;
      },
    }),

    getNotification: build.query<
      Response<NotificationModel[]>,
      {
        id: string;
      }
    >({
      query: ({ id }) => {
        // Kết hợp base URL và query string
        return `${baseUrl}/${id}/notifications`;
      },
    }),

    getPaymentHistories: build.query<
      Response<PaymentHistoryModel[]>,
      {
        id: string;
      }
    >({
      query: ({ id }) => {
        // Kết hợp base URL và query string
        return `${baseUrl}/${id}/paymentHistories`;
      },
    }),

    viewNotification: build.mutation<
      Response<NotificationModel>,
      { userId: string; id: string }
    >({
      query: ({ id, userId }) => {
        return {
          url: `${baseUrl}/notifications/${id}`,
          method: "PUT",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);
        const { data } = await queryFulfilled;
        dispatch(
          usersApi.util.updateQueryData(
            "getNotification",
            { id: arg.userId },
            (draft) => {
              console.log(draft.items);
              draft.items = [];
            }
          )
        );
      },
    }),

    createAddress: build.mutation<
      Response<AddressModel>,
      Partial<AddressModel>
    >({
      query: ({ userId, ...rest }) => ({
        url: `${baseUrl}/${userId}/addresses`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: (result, error, createAddress) => [
        { type: "Address", id: createAddress.userId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),

    getPlaceByInput: build.query<
      Response<AddressPlaces[]>,
      {
        input: string;
      }
    >({
      query: ({ input }) => {
        // Kết hợp base URL và query string
        return `addresses/googleMap/place?input=${input}`;
      },
    }),

    deleteAddressById: build.mutation<Response<null>, string>({
      query: (id) => {
        console.log("deleteAddressById called with id:", id);
        return {
          url: `${baseUrl}/addresses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, deleteAddressById) => [
        { type: "User" }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),
    uploadAVT: build.mutation<
      Response<string>,
      { userId: string; formData: FormData }
    >({
      query: ({ userId, formData }) => ({
        url: `${baseUrl}/${userId}/uploadAvatar`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),
    uploadUserById: build.mutation<
      Response<Partial<UserModel>>,
      {
        userId: string;
        body: Partial<UserModel> & {
          bankAccount: { bin: string; accountNumber: string };
        };
      }
    >({
      query: ({ userId, body }) => ({
        url: `${baseUrl}/${userId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetNotificationQuery,
  useViewNotificationMutation,
  useGetPaymentHistoriesQuery,
  useCreateAddressMutation,
  useGetPlaceByInputQuery,
  useDeleteAddressByIdMutation,
  useGetUserByIdQuery,
  useUploadAVTMutation,
  useUploadUserByIdMutation,
} = usersApi;

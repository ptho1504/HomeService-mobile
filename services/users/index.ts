import { createApi } from '@reduxjs/toolkit/query';
import { API } from '../base';
import { Address, BankAccount } from '@/types/types';
import { FreelancerWorkModel } from '@/types/workTypes';
import {
  NotificationModel,
  PaymentHistoryModel,
  TransactionModel,
  UserModel,
} from '@/types/userTypes';

import { Response } from '@/types/response';

const baseUrl = '/users';

const usersApi = API.injectEndpoints({
  endpoints: build => ({
    // getUser: build.query<User, string>({
    //   query: (id) => `users/${id}`,
    // }),

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
          params.append('index', page.toString());
        }
        if (size !== undefined) {
          params.append('size', size.toString());
        }
        if (role) {
          params.append('freelancerId', role);
        }
        if (postId) {
          params.append('freelancerId', postId);
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
      providesTags: (result, error, { id }) => [{ type: 'Notifications', id }],
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
      providesTags: (result, error, { id }) => [
        { type: 'PaymentHistories', id },
      ],
    }),

    viewNotification: build.mutation<
      Response<NotificationModel>,
      Partial<{ userId: string; id: string }>
    >({
      query: ({ id, userId }) => {
        return {
          url: `${baseUrl}/notifications/${id}`,
          method: 'PUT',
        };
      },
      invalidatesTags: (result, error, notification) => [
        { type: 'Notifications', id: notification.userId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),

    recharge: build.mutation<Response<string>, Partial<TransactionModel>>({
      query: (rechargeModel: TransactionModel) => {
        const { userId, ...data } = rechargeModel;
        return {
          url: `${baseUrl}/${userId}/recharge`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    withdraw: build.mutation<Response<UserModel>, Partial<TransactionModel>>({
      query: (withdrawModel: TransactionModel) => {
        const { userId, ...data } = withdrawModel;
        return {
          url: `${baseUrl}/${userId}/withdraw`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result, error, transactionModel) => [
        { type: 'PaymentHistories', id: transactionModel.userId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetNotificationQuery,
  useViewNotificationMutation,
  useGetPaymentHistoriesQuery,
  useRechargeMutation,
  useWithdrawMutation,
} = usersApi;

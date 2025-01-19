import { createApi } from '@reduxjs/toolkit/query';
import { API } from '../base';
import { Address, BankAccount } from '@/types/types';
import { FreelancerWorkModel } from '@/types/workTypes';
import {
  NotificationModel,
  PaymentHistoryModel,
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
          method: 'PUT',
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);
        const { data } = await queryFulfilled;
        dispatch(
          usersApi.util.updateQueryData(
            'getNotification',
            { id: arg.userId },
            draft => {
              console.log(draft.items);
              draft.items = [];
            },
          ),
        );
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetNotificationQuery,
  useViewNotificationMutation,
  useGetPaymentHistoriesQuery,
} = usersApi;

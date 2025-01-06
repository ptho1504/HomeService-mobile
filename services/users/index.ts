import { createApi } from '@reduxjs/toolkit/query';
import { API } from '../base';
import { Address, BankAccount } from '@/types/types';
import { FreelancerWorkModel } from '@/types/workTypes';
import { UserModel } from '@/types/userTypes';
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
  }),
});

export const { useGetUsersQuery } = usersApi;

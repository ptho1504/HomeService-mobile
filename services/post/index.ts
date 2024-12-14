import { API } from '../base';
import { Response } from '@/types/response';
import {
  CreatePostModel,
  CreateTakePostModel,
  PostModel,
  TakePostModel,
} from '@/types/postTypes';

const baseUrl = '/posts';

const postApi = API.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<
      Response<PostModel[]>,
      {
        page?: number;
        size?: number;
        freelancerId?: string;
      }
    >({
      query: ({ page, size, freelancerId }) => {
        // Tạo query string từ các tham số truyền vào
        const params = new URLSearchParams();

        if (page !== undefined) {
          params.append('index', page.toString());
        }
        if (size !== undefined) {
          params.append('size', size.toString());
        }
        if (freelancerId) {
          params.append('freelancerId', freelancerId);
        }
        // Kết hợp base URL và query string
        return `${baseUrl}?${params.toString()}`;
      },
    }),

    getPostsByCustomerId: build.query<
      Response<PostModel[]>,
      {
        id: string;
        page?: number;
        size?: number;
        workId?: string;
        packageName?: string;
      }
    >({
      query: ({ id, page, size, workId, packageName }) => {
        // Tạo query string từ các tham số truyền vào
        const params = new URLSearchParams();

        if (page !== undefined) {
          params.append('page', page.toString());
        }
        if (size !== undefined) {
          params.append('size', size.toString());
        }
        if (workId) {
          params.append('workId', workId);
        }
        if (packageName) {
          params.append('packageName', packageName);
        }
        // Kết hợp base URL và query string
        return `${baseUrl}/customers/${id}?${params.toString()}`;
      },
      providesTags: (result, error, { id }) => [
        { type: 'PostsByCustomerId', id },
      ],
    }),

    getPostsByFreelancerId: build.query<
      Response<TakePostModel[]>,
      {
        id: string;
        page?: number;
        size?: number;
        workId?: string;
        packageName?: string;
        workStatus?: string;
      }
    >({
      query: ({ id, page, size, workId, packageName, workStatus }) => {
        // Tạo query string từ các tham số truyền vào
        const params = new URLSearchParams();

        if (page !== undefined) {
          params.append('page', page.toString());
        }
        if (size !== undefined) {
          params.append('size', size.toString());
        }
        if (workId) {
          params.append('workId', workId);
        }
        if (packageName) {
          params.append('packageName', packageName);
        }
        if (workStatus) {
          params.append('workStatus', workStatus);
        }
        // Kết hợp base URL và query string
        return `${baseUrl}/freelancers/${id}?${params.toString()}`;
      },
      providesTags: (result, error, { id }) => [
        { type: 'TakePostsByFreelancerId', id },
      ],
    }),

    createPost: build.mutation<Response<PostModel>, Partial<CreatePostModel>>({
      query: (newPost: CreatePostModel) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: (result, error, newPost) => [
        { type: 'PostsByCustomerId', id: newPost.customerId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),

    takePost: build.mutation<
      Response<TakePostModel>,
      Partial<CreateTakePostModel>
    >({
      query: (createTakePost: CreateTakePostModel) => {
        const { id, ...body } = createTakePost;
        return {
          url: `${baseUrl}/${id}/takePost`,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: (result, error, takePost) => [
        { type: 'TakePostsByFreelancerId', id: takePost.freelancerId }, // Đánh dấu các cache liên quan cần làm mới
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data: newPost } = await queryFulfilled; // Lấy dữ liệu trả về từ mutation
        // Cập nhật cache cho query getPosts
        dispatch(
          postApi.util.updateQueryData(
            'getPosts',
            { freelancerId: arg.freelancerId },
            draft => {
              draft.items = draft.items.filter(
                item => item.id !== newPost.items.post.id,
              );
            },
          ),
        );
      },
    }),
  }),
});

export const {
  useGetPostsByCustomerIdQuery,
  useGetPostsByFreelancerIdQuery,
  useCreatePostMutation,
  useGetPostsQuery,
  useTakePostMutation,
} = postApi;

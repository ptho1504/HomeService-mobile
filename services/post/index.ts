import { API } from '../base';
import { Response } from '@/types/response';
import { CreatePostModel, PostModel } from '@/types/postTypes';

const baseUrl = '/posts';

const postApi = API.injectEndpoints({
  endpoints: build => ({
    getPostsByUserId: build.query<
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
        return `${baseUrl}/users/${id}?${params.toString()}`;
      },
      providesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    createPost: build.mutation<Response<PostModel>, Partial<CreatePostModel>>({
      query: (newPost: CreatePostModel) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: (result, error, newPost) => [
        { type: 'Posts', id: newPost.customerId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),
  }),
});

export const { useGetPostsByUserIdQuery, useCreatePostMutation } = postApi;

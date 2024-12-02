import { API } from '../base';
import { Response } from '@/types/response';
import { PostModel } from '@/types/postTypes';

const baseUrl = '/posts';

const postApi = API.injectEndpoints({
  endpoints: build => ({
    getPostsByUserId: build.query<Response<PostModel[]>, string>({
      query: id => `${baseUrl}/users/${id}`,
    }),
  }),
});

export const { useGetPostsByUserIdQuery } = postApi;

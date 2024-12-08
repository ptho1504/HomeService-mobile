import { CreatePostModel, PostModel } from '@/types/postTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostState {
  postForm: CreatePostModel | null;
  post: PostModel | null;
}

const initialState: PostState = {
  postForm: null,
  post: null,
};

const slice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    setPostForm(state, action: PayloadAction<CreatePostModel | null>) {
      state.postForm = action.payload;
    },
    clearPostForm(state) {
      state.postForm = null;
    },
    setPost(state, action: PayloadAction<PostModel | null>) {
      state.post = action.payload;
    },
    clearPost(state) {
      state.post = null;
    },
  },
});

export const { setPostForm, clearPostForm, setPost, clearPost } = slice.actions;

export const selectPostForm = (state: { post: PostState }) =>
  state.post.postForm;

export const selectPost = (state: { post: PostState }) => state.post.post;

const postReducer = slice.reducer;

export default postReducer;

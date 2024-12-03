import { User } from "@/services";
import { PostModel } from "@/types/postTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isLoading } from "expo-font";

interface PostState {
  post: PostModel | null;
}

const initialState: PostState = {
  post: null,
};

const slice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPost(state, action: PayloadAction<PostModel | null>) {
      state.post = action.payload;
    },
    clearPost(state) {
      state.post = null;
    },
  },
});

export const { setPost, clearPost } = slice.actions;

export const selectPost = (state: { post: PostState }) => state.post;

const authReducer = slice.reducer;

export default authReducer;

import { User } from "@/services";
import { errors } from "./../../node_modules/immer/src/utils/errors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  jwt: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  jwt: null,
  isAuthenticated: false,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.jwt = action.payload;
    },
    clearAuthState(state) {
      state.user = null;
      state.jwt = null;
      state.isAuthenticated = false;
    },
    authenticateUser(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

const authReducer = slice.reducer;

export default authReducer;

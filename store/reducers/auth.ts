import { AddressType } from "@/types/addressType";
import { AddressModel, UserModel } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserModel | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserModel | null>) {
      state.user = action.payload;
    },
    clearAuthState(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    authenticateUser(state, action) {
      state.isAuthenticated = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    updateCurrentUserWithAddress: (
      state,
      action: PayloadAction<{ user: UserModel; address: AddressModel }>
    ) => {
      if (state.user) {
        console.log("User in state user", action.payload.address);
        state.user = {
          ...action.payload.user,
          addresses: [action.payload.address, ...state.user.addresses],
        };
      } else {
        state.user = {
          ...action.payload.user,
          addresses: [action.payload.address],
        };
      }
    },
    deleteAddressById: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.filter(
          (address) => address.id !== action.payload
        );
      }
    },
  },
});

export const {
  setUser,
  clearAuthState,
  authenticateUser,
  setIsAuthenticated,
  updateCurrentUserWithAddress,
  deleteAddressById,
} = slice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

const authReducer = slice.reducer;

export default authReducer; /*  */

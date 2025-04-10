import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho service
interface ServiceState {
    id: string;
    name: string;
    image: string;
    description: string;
};

// Trạng thái ban đầu
const initialState: ServiceState = {
  id: "",
  name:  "",
  image:  "",
  description:  "",
};

// Tạo Redux slice
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    // Cập nhật thông tin cho một service
    setServiceInfo(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        image: string;
        description: string;
      }>
    ) {
      return { ...state, ...action.payload };
    },

    clearService() {
      return initialState;
    },
  },
});

// Xuất actions
export const { setServiceInfo, clearService } = serviceSlice.actions;

// Selectors tối ưu với `createSelector`
const selectSerivceState = (state: { service: ServiceState }) => state.service;

export const selectServiceInfo = createSelector([selectSerivceState], (service) => ({
    id: service.id,
    name: service.name,
    image:  service.image,
    description: service.description,
}));


// Xuất reducer để tích hợp vào Redux store
const serviceReducer = serviceSlice.reducer;
export default serviceReducer;

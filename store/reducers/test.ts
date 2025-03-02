import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho bài kiểm tra
interface TestState {
  serviceId: string | null;
  testId: string | null;
  numberOfQuestions: number | null;
  time: number | null;
  startTime: number[] | null;
  endTime: number[] | null;
  passedPoint: number | null;
  testResultId: string | null;
  numberOfCorrect: number | null;
  testPoint: number | null;
  isPassed: boolean | null;
  isRegisterDone: boolean;
}

// Trạng thái ban đầu (rỗng)
const initialState: TestState = {
  serviceId: null,
  testId: null,
  numberOfQuestions: null,
  time: null,
  startTime: null,
  endTime: null,
  passedPoint: null,
  testResultId: null,
  numberOfCorrect: null,
  testPoint: null,
  isPassed: null,
  isRegisterDone: false,
};

// Tạo Redux slice
const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    // Cập nhật dữ liệu từ giao diện 1 (Làm bài kiểm tra)
    setTestInfo(
      state,
      action: PayloadAction<{
        serviceId: string;
        testId: string;
        numberOfQuestions: number;
        time: number;
        passedPoint: number;
      }>
    ) {
      return { ...state, ...action.payload };
    },

    // Cập nhật dữ liệu từ giao diện 2 (Kết quả bài kiểm tra)
    setTestResult(
      state,
      action: PayloadAction<{
        testResultId: string;
        numberOfCorrect: number;
        testPoint: number;
        isPassed: boolean;
        startTime: number[];
        endTime: number[];
      }>
    ) {
      return { ...state, ...action.payload };
    },

    setRegisterProcess(
      state,
      action: PayloadAction<{
        isRegisterDone: boolean;
      }>
    ) {
      return { ...state, ...action.payload };
    },

    // setStartTime(
    //   state,
    //   action: PayloadAction<{
    //     startTime: number[];
    //   }>
    // ) {
    //   return { ...state, ...action.payload };
    // },

    // Xóa toàn bộ dữ liệu bài kiểm tra (dùng khi reset)
    clearTest() {
      return initialState;
    },
  },
});

// Xuất actions
export const { setTestInfo, setTestResult, setRegisterProcess, clearTest } = testSlice.actions;

// Selectors tối ưu với `createSelector`
const selectTestState = (state: { test: TestState }) => state.test;

export const selectTestInfo = createSelector([selectTestState], (test) => ({
  serviceId: test.serviceId,
  testId: test.testId,
  numberOfQuestions: test.numberOfQuestions,
  time: test.time,
  passedPoint: test.passedPoint,
}));

export const selectTestResult = createSelector([selectTestState], (test) => ({
  testResultId: test.testResultId,
  testPoint: test.testPoint,
  isPassed: test.isPassed,
  numberOfCorrect: test.numberOfCorrect,
  startTime: test.startTime,
  endTime: test.endTime,
}));

export const selectRegisterProcess = createSelector([selectTestState], (test) => ({
  isRegisterDone: test.isRegisterDone,
}));

// Xuất reducer để tích hợp vào Redux store
const testReducer = testSlice.reducer;
export default testReducer;

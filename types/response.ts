export interface Response<T> {
  returnCode: number;
  message: string;
  count: number;
  items: T;
}

export type RootParamList = {
  index: undefined; // Không có tham số
  Post: { workType: string }; // Với tham số workType
};

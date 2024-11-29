export interface Response<T> {
  returnCode: number;
  message: string;
  count: number;
  items: T;
}

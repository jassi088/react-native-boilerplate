export interface BaseResponse<T = undefined> {
  status: boolean;
  message: string;
  data?: T;
}

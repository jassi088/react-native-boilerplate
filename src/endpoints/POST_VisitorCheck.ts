import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';

export interface VisitorCheckInterface {
  id: string;
  name: string;
}

export const postVisitorCheck = async (): Promise<BaseResponse<VisitorCheckInterface[]>> => {
  return API.get<BaseResponse<VisitorCheckInterface[]>>('/v2/visitor/check');
};

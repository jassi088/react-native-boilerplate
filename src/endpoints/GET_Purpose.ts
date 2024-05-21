import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';

export interface PurposeInterface {
  id: string;
  name: string;
}

export const getPurpose = async (): Promise<BaseResponse<PurposeInterface[]>> => {
  return API.get<BaseResponse<PurposeInterface[]>>('/v2/purpose');
};

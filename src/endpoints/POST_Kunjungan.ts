import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';

export interface KunjunganInterface {
  id: string;
  name: string;
}

export const postKunjungan = async (): Promise<BaseResponse<KunjunganInterface[]>> => {
  return API.get<BaseResponse<KunjunganInterface[]>>('/v2/visitor/check');
};

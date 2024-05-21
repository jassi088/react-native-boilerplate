import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';

export interface KunjunganInterface {
  id: string;
  name: string;
}

export interface PostKunjunganInterface {
  visitor_id: string;
  id_keperluan: number;
  keperluan?: string;
  photo: string;
}

export const postKunjungan = async (body: PostKunjunganInterface): Promise<BaseResponse<KunjunganInterface[]>> => {
  return API.post<BaseResponse<KunjunganInterface[]>, PostKunjunganInterface>('/v2/visitor/check', body);
};

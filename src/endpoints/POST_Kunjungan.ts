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
  phone: string;
}

export interface BasePostKunjunganInterface {
  branch_id: string;
}

export const postKunjungan = async (body: PostKunjunganInterface): Promise<BaseResponse<KunjunganInterface[]>> => {
  console.log('body', body);

  return API.post<BaseResponse<KunjunganInterface[]>, BasePostKunjunganInterface>('/v2/visitor/check', {
    ...body,
    branch_id: 'T-001'
  });
};

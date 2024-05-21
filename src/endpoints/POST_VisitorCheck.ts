import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';

export interface VisitorCheckInterface {
  phone: string;
  photo: string;
}

interface BaseVisitorCheckInterface extends VisitorCheckInterface {
  branch_id: string;
  keperluan: string;
}

export interface ResponseVisitorCheckInterface {
  base64: string | null;
  branch_id: string;
  company: string | null;
  country_code: string | null;
  created_at: string;
  email: string;
  faceId: string | null;
  file_name: string | null;
  id: string | null;
  is_asn: number;
  name: string;
  nik: string;
  nrk: string | null;
  password: string;
  phone: string;
  photo: string;
  status: number;
  updated_at: string;
  visitorId: string;
}

export const postVisitorCheck = async (
  body: VisitorCheckInterface
): Promise<BaseResponse<ResponseVisitorCheckInterface>> => {
  const photo = await RNFS.readFile(body.photo, 'base64');

  return API.post<BaseResponse<ResponseVisitorCheckInterface>, BaseVisitorCheckInterface>('/v2/visitor/check', {
    ...body,
    branch_id: 'T-001',
    keperluan: `DUMMY_MOBILE_${dayjs().format('YYYYMMDDHHmmss')}`,
    photo
  });
};

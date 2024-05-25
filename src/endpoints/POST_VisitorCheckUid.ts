import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';

export interface VisitorCheckUidInterface {
  is_asn: boolean;
  uid: string;
  photo: string;
}

interface BaseVisitorCheckUidInterface extends VisitorCheckUidInterface {
  branch_id: string;
  keperluan: string;
}

export interface ResponseVisitorCheckUidInterface {
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

export const postVisitorCheckUid = async (
  body: VisitorCheckUidInterface
): Promise<BaseResponse<ResponseVisitorCheckUidInterface>> => {
  const photo = await RNFS.readFile(body.photo, 'base64');

  return API.post<BaseResponse<ResponseVisitorCheckUidInterface>, BaseVisitorCheckUidInterface>(
    '/v2/visitor/check-uid',
    {
      ...body,
      branch_id: 'T-001',
      keperluan: `DUMMY_MOBILE_${dayjs().format('YYYYMMDDHHmmss')}`,
      photo
    }
  );
};

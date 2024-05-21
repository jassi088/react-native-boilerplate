import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';
import RNFS from 'react-native-fs';

export interface PostRegisterInterface {
  is_asn: boolean;
  nik?: string;
  nrk?: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
}

export const postRegister = async (body: PostRegisterInterface): Promise<BaseResponse> => {
  const photo = await RNFS.readFile(body.photo, 'base64');

  const { nrk, nik, ...restBody } = body;

  const payload = {
    ...restBody,
    ...(body.is_asn === true ? { nrk: body.nrk } : {}),
    ...(body.is_asn === false ? { nik: body.nik } : {}),
    office_branch: 'T-001',
    password: '',
    photo
  };

  return API.post<
    Promise<BaseResponse>,
    PostRegisterInterface & {
      password: string;
      office_branch: string;
    }
  >('/v2/register', payload);
};

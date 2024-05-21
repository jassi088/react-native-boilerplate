import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';

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
  return API.post<
    Promise<BaseResponse>,
    PostRegisterInterface & {
      password: string;
      // office_branch: string
    }
  >('/v2/register', {
    ...body,
    // office_branch: 'T-001',
    password: '',
    photo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
  });
};

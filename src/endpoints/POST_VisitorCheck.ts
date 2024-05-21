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

export const postVisitorCheck = async (body: VisitorCheckInterface): Promise<BaseResponse<VisitorCheckInterface[]>> => {
  const photo = await RNFS.readFile(body.photo, 'base64');

  return API.post<BaseResponse<VisitorCheckInterface[]>, BaseVisitorCheckInterface>('/v2/visitor/check', {
    ...body,
    branch_id: 'T-001',
    keperluan: `DUMMY_MOBILE_${dayjs().format('YYYYMMDDHHmmss')}`,
    photo
  });
};

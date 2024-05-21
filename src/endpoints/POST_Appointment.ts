import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';

export interface AppointmentInterface {
  id: string;
  name: string;
}

export const postAppointment = async (): Promise<BaseResponse<AppointmentInterface[]>> => {
  return API.get<BaseResponse<AppointmentInterface[]>>('/v2/visitor/check');
};

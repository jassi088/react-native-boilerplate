import { BaseResponse } from '@/interfaces/BaseResponse';
import API from '@/services/API';
import dayjs from 'dayjs';

export interface AppointmentInterface {
  id: string;
  name: string;
  visitorId: string;
  employee_phone: string;
  start_on: Date;
  end_on: Date;
  keperluan: number;
  id_keperluan: number;
  catatan: string;
}

interface BaseAppointmentInterface extends AppointmentInterface {
  branch_id: string;
  visitor_type: string;
  location_id: string;
}

export const postAppointment = async (body: AppointmentInterface): Promise<BaseResponse<AppointmentInterface[]>> => {
  return API.post<BaseResponse<AppointmentInterface[]>, BaseAppointmentInterface>('/v2/visitor/check', {
    ...body,
    branch_id: 'T-001',
    visitor_type: 'guest',
    start_on: dayjs(body.start_on).format('YYYY-MM-DD HH:mm:ss') as unknown as Date,
    end_on: dayjs(body.end_on).format('YYYY-MM-DD HH:mm:ss') as unknown as Date,
    location_id: '2'
  });
};

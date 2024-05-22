import { KEPERLUAN } from '@/constants/keperluan';
import * as yup from 'yup';

export const buatJanjiSchema = yup.object().shape({
  no_hp: yup.string().required('Nomor Handphone harus diisi'),
  no_hp_tujuan: yup.string().required('Nomor Handphone tujuan harus diisi'),
  jam_mulai: yup.string().required('Jam mulai harus diisi'),
  jam_selesai: yup.string().required('Jam selesai harus diisi'),
  id_keperluan: yup.string().required('Keperluan harus diisi'),
  keperluan: yup.string().when('id_keperluan', {
    is: '5',
    then: (schema) => schema.required('Keperluan lainnya harus diisi'),
    otherwise: (schema) => schema.optional()
  }),
  photo: yup.string()
});

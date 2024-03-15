import { KEPERLUAN } from '@/constants/keperluan';
import * as yup from 'yup';

export const buatJanjiSchema = yup.object().shape({
  no_hp: yup.string().required('Nomor Handphone harus diisi'),
  no_hp_tujuan: yup.string().required('Nomor Handphone tujuan harus diisi'),
  jam_mulai: yup.string().required('Jam mulai harus diisi'),
  jam_selesai: yup.string().required('Jam selesai harus diisi'),
  keperluan: yup
    .string()
    .required('Keperluan harus diisi')
    .oneOf(
      KEPERLUAN.map((item) => item.value),
      'Keperluan tidak valid'
    ),
  keperluan_lainnya: yup.string().when('keperluan', {
    is: 'lainnya',
    then: (schema) => schema.required('Keperluan lainnya harus diisi'),
    otherwise: (schema) => schema.optional()
  })
});

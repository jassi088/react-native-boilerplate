import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung';
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  tipe_pengunjung: yup
    .string()
    .required('Tipe Pengunjung harus diisi')
    .oneOf(
      TIPE_PENGUNJUNG.map((item) => item.value),
      'Tipe Pengunjung tidak valid'
    ),
  nama: yup.string().required('Nama harus diisi'),
  no_hp: yup.string().required('Nomor Handphone harus diisi'),
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  nik: yup.string().when('tipe_pengunjung', {
    is: 'non-asn',
    then: (schema) => schema.required('NIK harus diisi'),
    otherwise: (schema) => schema.optional()
  }),
  nrk: yup.string().when('tipe_pengunjung', {
    is: 'asn',
    then: (schema) => schema.required('NRK harus diisi'),
    otherwise: (schema) => schema.optional()
  })
});

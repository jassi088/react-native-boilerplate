import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung';
import * as yup from 'yup';

export const visitorCheckSchema = yup.object().shape({
  visitorType: yup
    .string()
    .oneOf(TIPE_PENGUNJUNG.map((item) => item.value))
    .required('Anda harus memilih status ASN atau Bukan ASN'),
  uid: yup.string().required('NIK/NRK tidak boleh kosong')
});

import * as yup from 'yup';

export const visitorCheckSchema = yup.object().shape({
  no_hp: yup.string().required('Nomor Handphone harus diisi')
});

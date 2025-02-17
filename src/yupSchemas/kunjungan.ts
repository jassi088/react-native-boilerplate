import * as yup from 'yup';

export const kunjunganSchema = yup.object().shape({
  phone: yup.string().required('Nomor Handphone harus diisi'),
  id_keperluan: yup.string().required('Keperluan harus diisi'),
  keperluan: yup.string().when('id_keperluan', {
    is: '5',
    then: (schema) => schema.required('Keperluan lainnya harus diisi'),
    otherwise: (schema) => schema.optional()
  }),
  photo: yup.string(),
  visitorId: yup.string().required()
});

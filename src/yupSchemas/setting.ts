import { CAMERA_POSITION, ORIENTATION } from '@/constants/camera';
import * as yup from 'yup';

export const settingSchema = yup.object().shape({
  cameraPosition: yup
    .string()
    .required('Pilih Kamera')
    .oneOf(
      CAMERA_POSITION.map((item) => item.value),
      'Pilih Kamera'
    ),
  orientation: yup
    .string()
    .required('Pilih Rotasi Kamera')
    .oneOf(
      ORIENTATION.map((item) => item.value),
      'Pilih Kamera'
    ),
  cameraPositionQr: yup
    .string()
    .required('Pilih Kamera QRcode')
    .oneOf(
      CAMERA_POSITION.map((item) => item.value),
      'Pilih Kamera'
    ),
  orientationQr: yup
    .string()
    .required('Pilih Rotasi Kamera QRcode')
    .oneOf(
      ORIENTATION.map((item) => item.value),
      'Pilih Kamera'
    )
});

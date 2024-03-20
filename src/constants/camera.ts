import { CameraPosition, Orientation } from 'react-native-vision-camera';

export const CAMERA_POSITION: Array<{ label: string; value: CameraPosition }> = [
  {
    label: 'Front',
    value: 'front'
  },
  {
    label: 'Back',
    value: 'back'
  },
  {
    label: 'External',
    value: 'external'
  }
];

export const ORIENTATION: Array<{ label: string; value: Orientation }> = [
  {
    label: 'Portrait',
    value: 'portrait'
  },
  {
    label: 'Portrait Upside Down',
    value: 'portrait-upside-down'
  },
  {
    label: 'Landscape Left',
    value: 'landscape-left'
  },
  {
    label: 'Landscape Right',
    value: 'landscape-right'
  }
];

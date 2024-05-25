import { PhotoFile } from 'react-native-vision-camera';

export type RootStackParamList = {
  Splash: undefined;
  Register: {
    phone: string;
    photo: PhotoFile;
  };
  Home: undefined;
  Kunjungan: {
    photo: PhotoFile;
    phone: string;
    visitorId: string;
  };
  BuatJanji: {
    photo: PhotoFile;
    phone: string;
    visitorId: string;
    name: string;
  };
  Setting: undefined;
  Screensaver: undefined;
  Menu: {
    phone: string;
    photo: PhotoFile;
    visitorId: string;
    name?: string;
  };
  VisitorCheck: {
    photo: PhotoFile;
  };
};

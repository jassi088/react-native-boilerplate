import { PhotoFile } from 'react-native-vision-camera';

export type RootStackParamList = {
  Splash: undefined;
  Register: {
    is_asn: boolean;
    uid: string;
    photo: PhotoFile;
  };
  Home: undefined;
  Kunjungan: {
    is_asn: boolean;
    uid: string;
    phone: string;
    visitorId: string;
    photo: PhotoFile;
  };
  BuatJanji: {
    is_asn: boolean;
    uid: string;
    phone: string;
    visitorId: string;
    name: string;
    photo: PhotoFile;
  };
  Setting: undefined;
  Screensaver: undefined;
  Menu: {
    is_asn: boolean;
    uid: string;
    phone: string;
    visitorId: string;
    name?: string;
    photo: PhotoFile;
  };
  VisitorCheck: {
    photo: PhotoFile;
  };
};

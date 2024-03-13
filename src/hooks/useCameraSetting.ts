import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraPosition, Orientation } from 'react-native-vision-camera';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UseCameraSettingProps {
  cameraPosition: CameraPosition;
  cameraOrientation: Orientation;
  setCameraPosition: (position: CameraPosition) => void;
  setCameraOrientation: (orientation: Orientation) => void;
  qrCodeCameraPosition: CameraPosition;
  qrCodeCameraOrientation: Orientation;
  setQrCodeCameraPosition: (position: CameraPosition) => void;
  setQrCodeCameraOrientation: (orientation: Orientation) => void;
}

export const useCameraSetting = create<UseCameraSettingProps>()(
  persist(
    (set, get) => ({
      cameraPosition: 'front',
      setCameraPosition: (position) => set({ cameraPosition: position }),
      cameraOrientation: 'portrait',
      setCameraOrientation: (orientation) => set({ cameraOrientation: orientation }),
      qrCodeCameraPosition: 'back',
      setQrCodeCameraPosition: (position) => set({ qrCodeCameraPosition: position }),
      qrCodeCameraOrientation: 'portrait',
      setQrCodeCameraOrientation: (orientation) => set({ qrCodeCameraOrientation: orientation })
    }),
    {
      name: 'camera-setting',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

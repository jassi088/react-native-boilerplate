import { PixelRatio } from 'react-native';

export const getFontSizeByScale = (fontSize: number) => {
  const fontScale = PixelRatio.getFontScale();

  return fontSize * fontScale;
};

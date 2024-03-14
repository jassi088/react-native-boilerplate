import { ImageResizeMode } from 'react-native';

export type ImageStaticType = 'logo-dki';

export interface ImageStaticProps {
  name: ImageStaticType;
  size?: number;
  height?: number;
  width?: number;
  className?: string;
  resizeMode?: ImageResizeMode | undefined;
}

import { ImageSourcePropType, Image as RNImage } from "react-native"
import { ImageStaticProps, ImageStaticType } from "./index.type";

export const ImageStatic = (props: ImageStaticProps) => {
  const { name, size = 16, height, width, className, resizeMode } = props

  const imageSize = {
    height: height || size,
    width: width || size
  };

  const imageName: Record<ImageStaticType, ImageSourcePropType> = {
    'logo-dki': require('@/assets/images/logo-dki.png'),
    'flag-indonesia': require('@/assets/images/flag/indonesia.jpg'),
    'flag-usa': require('@/assets/images/flag/usa.jpg'),
  }

  return (
    <RNImage
      source={imageName[name]}
      style={imageSize}
      className={className}
      resizeMode={resizeMode}
    />
  )
}
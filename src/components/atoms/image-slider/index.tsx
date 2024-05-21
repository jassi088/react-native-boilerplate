import { ImageSourcePropType, View } from "react-native"
import { ImageSlider as RNIMageSlider } from "react-native-image-slider-banner"
import colors from "tailwindcss/colors"


const DUMMY_IMAGES = [
  'https://dcktrp.jakarta.go.id/beranda/v.2/api/image?image=https%3A%2F%2Fdcktrp.jakarta.go.id%2Fweb-dcktrp-be%2Fstorage%2Flayanan%2Fbanner%2FSlider2.jpg&height=600&quality=80',
  'https://dcktrp.jakarta.go.id/beranda/v.2/api/image?image=https%3A%2F%2Fdcktrp.jakarta.go.id%2Fweb-dcktrp-be%2Fstorage%2Flayanan%2Fbanner%2FSlider3.jpg&height=600&quality=80'
]

interface ImageSliderProps {
  height: number
}

export const ImageSlider = (props: ImageSliderProps) => {
  const { height } = props

  return (
    <View className="flex-1">
      <RNIMageSlider
        data={DUMMY_IMAGES.map((image) => ({ img: image as ImageSourcePropType }))}
        autoPlay={false}
        onItemChanged={(item) => undefined}
        closeIconColor={colors.white}
        showHeader={true}
        preview={true}
        caroselImageContainerStyle={{ height }}
        caroselImageStyle={{ resizeMode: 'cover', borderRadius: 16 }}
        indicatorContainerStyle={{ position: 'absolute', bottom: 0 }}
        activeIndicatorStyle={{ backgroundColor: colors.blue[600] }}
        inActiveIndicatorStyle={{ backgroundColor: colors.gray[400] }}
      />
    </View>
  )
}
import { ImageSourcePropType, View } from "react-native"
import { ImageSlider as RNIMageSlider } from "react-native-image-slider-banner"
import { DataType } from "react-native-image-slider-banner/src"
import colors from "tailwindcss/colors"


const DUMMY_IMAGES = [
  'https://dcktrp.jakarta.go.id/beranda/v.2/api/image?image=https%3A%2F%2Fdcktrp.jakarta.go.id%2Fweb-dcktrp-be%2Fstorage%2Ffoto%2Fpelatihan%20tukang%20bangunan%20gedung%202%20%28photoshop%20edit%29.jpg&height=400',
  'https://dcktrp.jakarta.go.id/beranda/v.2/api/image?image=https%3A%2F%2Fdcktrp.jakarta.go.id%2Fweb-dcktrp-be%2Fstorage%2Flayanan%2Fbanner%2FSlider2.jpg&height=600&quality=80',
  'https://dcktrp.jakarta.go.id/beranda/v.2/api/image?image=https%3A%2F%2Fdcktrp.jakarta.go.id%2Fweb-dcktrp-be%2Fstorage%2Flayanan%2Fbanner%2FSlider3.jpg&height=600&quality=80'
]

interface ImageSliderProps {
  height: number,
  onClick: (item: DataType, index: number) => void
}

export const ImageSliderScreenSaver = (props: ImageSliderProps) => {
  const { height, onClick } = props

  return (
    <View className="flex-1">
      <RNIMageSlider
        data={DUMMY_IMAGES.map((image) => ({ img: image as ImageSourcePropType }))}
        autoPlay={true}
        timer={5000}
        onItemChanged={(item) => undefined}
        onClick={onClick}
        closeIconColor={colors.white}
        showHeader={true}
        preview={false}
        caroselImageContainerStyle={{ height }}
        caroselImageStyle={{ resizeMode: 'cover', borderRadius: 16, height }}
        indicatorContainerStyle={{ position: 'absolute', bottom: 0 }}
        activeIndicatorStyle={{ backgroundColor: colors.blue[600] }}
        inActiveIndicatorStyle={{ backgroundColor: colors.gray[400] }}
      />
    </View>
  )
}
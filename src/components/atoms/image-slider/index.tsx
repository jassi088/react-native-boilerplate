import { ImageSourcePropType, View } from "react-native"
import { ImageSlider as RNIMageSlider } from "react-native-image-slider-banner"
import colors from "tailwindcss/colors"


const DUMMY_IMAGES = [
  'https://scontent.cdninstagram.com/v/t51.29350-15/431064147_1748139972335967_3043861345928730568_n.heic?stp=dst-jpg_e35_p1080x1080&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=0w-D81EbWwAAX9kV_Kw&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzMxNDgwNDQwNjM1NTkxMTAxMg%3D%3D.2-ccb7-5&oh=00_AfB-RUTgD5xaqpMDhEVGg1c1JmCcGLUlD5gznM1SeDM10A&oe=65F6ECBD&_nc_sid=10d13b',
  'https://scontent.cdninstagram.com/v/t51.29350-15/428119696_1118890642897033_3442008996185304771_n.heic?stp=dst-jpg_e35_p640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDIuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=-r5ZpbjvAOwAX_sRBe7&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzMwMzI1NTU3OTc3MzcwMjEzNA%3D%3D.2-ccb7-5&oh=00_AfAE9VAQEiSI-dfbA0yRuKKwje34ghO3D-d8Cv39LuuvHw&oe=65F8B618&_nc_sid=10d13b'
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
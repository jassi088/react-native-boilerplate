import { ImageSliderScreenSaver, LanguageSwitcher, Text } from "@/components/atoms"
import { HeaderTime } from "@/components/molecules"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

type CardProps = {
  label: string
  icon: JSX.Element
  onPress: () => void
}

export const Screensaver = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(["menu"])

  const [sliderHeight, setSliderHeight] = useState<number>(0)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderTime />
      <TouchableOpacity
        activeOpacity={0.9}
        className="space-y-5 p-4 flex-1"
        onPress={() => navigation.navigate('Home')}
      >
        <View
          className="flex flex-1"
          onLayout={event => {
            const { height } = event.nativeEvent.layout
            setSliderHeight(height)
          }}
        >
          <ImageSliderScreenSaver
            height={sliderHeight}
          />
        </View>
        <View>
          <Text
            label={t('common:label.clickAnywhereToStart')}
            className="text-center py-6"
            variant="extra-large"
            fontWeight="semi-bold"
            color={colors.blue[600]}
          />
        </View>
        <LanguageSwitcher />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
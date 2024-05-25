import { ImageSlider, LanguageSwitcher, Text } from "@/components/atoms"
import { HeaderTime } from "@/components/molecules"
import { RootStackParamList } from "@/routes/index.type"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from "tailwindcss/colors"

type CardProps = {
  label: string
  icon: JSX.Element
  onPress: () => void
}

export const Menu = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(["menu"])
  const { params: { phone, photo, visitorId, name } } = useRoute<RouteProp<RootStackParamList, 'Menu'>>()

  const Card = ({ label, icon, onPress }: CardProps) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex flex-col items-center justify-center border border-blue-600 rounded-md p-5 bg-gray-50 mb-5"
    >
      {icon}
      <Text label={label} textClassName="mt-2" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderTime
        onPress={() => navigation.navigate('Setting')}
      />
      <View className="p-4 flex-1">
        <View className="flex-1 justify-center space-y-5">
          <Card
            label={t('menu:visit')}
            icon={<AntDesign name="calendar" size={40} color={colors.blue[600]} />}
            onPress={() => navigation.navigate('Kunjungan', {
              phone,
              photo,
              visitorId,
            })}
          />

          <Card
            label={t('menu:appointment')}
            icon={<Entypo name="add-to-list" size={40} color={colors.blue[600]} />}
            onPress={() => navigation.navigate('BuatJanji', {
              phone,
              photo,
              visitorId,
              name: name as string
            })}
          />
        </View>
        <LanguageSwitcher />
      </View>
    </SafeAreaView>
  )
}
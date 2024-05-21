import { ImageStatic, Text } from "@/components/atoms";
import { useI18n } from "@/hooks/useI18n"
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import colors from 'tailwindcss/colors';

export const Splash = () => {
  const { init } = useI18n()
  const navigation = useNavigation()

  useEffect(() => {
    const process = async () => {
      await init()
      setTimeout(() => {
        // @ts-ignore
        navigation.replace('Home')
      }, 1500)
    }

    process()
  }, [])

  return (
    <View className="flex items-center justify-center h-screen">
      <View className="mb-10">
        <ImageStatic name="logo-dki" width={100} height={110} />
      </View>
      <ActivityIndicator size="small" color={colors.blue[500]} />
      <Text label="Loading..." className="mt-3" />
    </View>
  )
}
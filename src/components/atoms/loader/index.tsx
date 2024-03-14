import { View, ActivityIndicator } from "react-native"
import colors from "tailwindcss/colors"

type LoaderProps = {
  isVisible: boolean
}

export const Loader = (props: LoaderProps) => {
  const { isVisible } = props

  if (!isVisible) return null

  return (
    <View className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
      <View className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      <View className="bg-white w-20 h-20 rounded-xl shadow-sm flex items-center justify-center">
        <ActivityIndicator size="large" color={colors.blue[600]} />
      </View>
    </View>
  )
}
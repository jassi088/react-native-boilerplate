import { View } from "react-native"
import colors from "tailwindcss/colors"
import { Text } from "../text"

export const InputErrorMessage = ({ error }: { error: string }) => {
  return (
    <View className='mt-1'>
      <Text color={colors.red[500]} label={error} variant="small" />
    </View>
  )
}
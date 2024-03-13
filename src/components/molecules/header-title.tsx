import { View } from "react-native"
import { Text } from "../text"
import colors from "tailwindcss/colors"

export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View className='bg-slate-200 px-5 py-3'>
      <Text
        label={title}
        variant='extra-large'
        fontWeight='bold'
        color={colors.blue[600]}
      />
    </View>
  )
}
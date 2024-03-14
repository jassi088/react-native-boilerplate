import { View } from "react-native"
import colors from "tailwindcss/colors"
import { Text } from "../../atoms/text"

export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View className='bg-gray-200 px-5 py-3'>
      <Text
        label={title}
        variant='extra-large'
        fontWeight='bold'
        color={colors.blue[600]}
      />
    </View>
  )
}
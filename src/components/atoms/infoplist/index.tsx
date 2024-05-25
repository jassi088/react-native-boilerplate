import { View } from "react-native"
import { Text } from "../text"

interface InfoplistProps {
  label: string
  value: string
}

export const Infoplist = (props: InfoplistProps) => {
  const { label, value } = props

  return (
    <View className='mb-3 space-y-1'>
      <Text label={label} />
      <Text
        label={value}
        className='py-2'
        variant='large'
        fontWeight='semi-bold'
      />
    </View>
  )
}
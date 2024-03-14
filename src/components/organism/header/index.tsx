import { View } from "react-native"
import { HeaderTime, HeaderTitle } from "../../molecules"

export const Header = ({ title }: { title: string }) => {
  return (
    <View>
      <HeaderTime />
      <HeaderTitle title={title} />
    </View>
  )
}
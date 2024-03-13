import { View } from "react-native"
import { HeaderTime, HeaderTitle } from "../molecules"

const Header = ({ title }: { title: string }) => {
  return (
    <View>
      <HeaderTime />
      <HeaderTitle title={title} />
    </View>
  )
}

export default Header
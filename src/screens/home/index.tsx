import { Button } from "@/components/atoms/button"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"

export const Home = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Button variant="background" label="register" onPress={() => navigation.navigate('Register')} />
    </View>
  )
}
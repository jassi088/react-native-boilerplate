import { Button } from "@/components/atoms/button"
import { useToast } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import Toast from "react-native-toast-message"

export const Home = () => {
  const navigation = useNavigation()

  return (
    <View className="space-y-5 p-5">
      <Button containerClassName="mb-3" variant="background" label="register" onPress={() => navigation.navigate('Register')} />
      <Button containerClassName="mb-3" variant="background" label="Kunjungan" onPress={() => navigation.navigate('Kunjungan')} />
      <Button containerClassName="mb-3" variant="background" label="BuatJanji" onPress={() => navigation.navigate('BuatJanji')} />
      <Button
        containerClassName="mb-3"
        variant="background"
        label="Toast"
        onPress={() => {
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋',
          })
        }} />
    </View>
  )
}
import { Image, TouchableOpacity, View } from "react-native"

export const InputCamera = () => {
  return (
    <>
      <View className="flex items-center justify-center flex-1 h-full">
        <View className="rounded mb-12">
          <Image
            source={require('../../../assets/images/result.jpg')}
            className="w-64 h-64 rounded-md"
          />
        </View>
      </View>
      <View className="mb-6 bottom-0 left-0 right-0 mx-auto">
        <TouchableOpacity className="bg-gray-400 rounded-full w-16 h-16" />
      </View>
    </>
  )
}
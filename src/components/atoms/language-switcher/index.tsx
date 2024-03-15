import { TouchableOpacity, View } from "react-native"
import { Text } from "../text"
import { ImageStatic } from "../image-static"

export const LanguageSwitcher = () => {
  return (
    <View>
      <Text label="Pilih Bahasa:" textAlign="center" textClassName="mb-3" fontWeight="semi-bold" />
      <View className="flex flex-row items-center justify-center">
        <TouchableOpacity
          className="w-16 flex flex-col items-center justify-start h-full"
          activeOpacity={0.7}
        >
          <ImageStatic name="flag-indonesia" height={16} width={24} className="rounded-sm mb-1" />
          <Text
            label="Indonesia"
            textAlign="center"
            variant="small"
          />
        </TouchableOpacity>
        <View className="mx-3 border-l border-gray-400 h-8" />
        <TouchableOpacity
          className="w-16 flex flex-col items-center justify-start h-full"
          activeOpacity={0.7}
        >
          <ImageStatic name="flag-usa" height={16} width={24} className="rounded-sm mb-1" />

          <Text
            label="English"
            textAlign="center"
            variant="small"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
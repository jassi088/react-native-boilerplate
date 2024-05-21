import { TouchableOpacity, View } from "react-native"
import { Text } from "../text"
import { ImageStatic } from "../image-static"
import { useI18n } from "@/hooks/useI18n"
import { useTranslation } from "react-i18next"
import { cn } from "@/utils"

export const LanguageSwitcher = () => {
  const { changeLanguage } = useI18n()
  const { t, i18n } = useTranslation(['menu'])

  return (
    <View>
      <Text label={t('menu:chooseLanguage')} textAlign="center" textClassName="mb-3" fontWeight="semi-bold" />
      <View className="flex flex-row items-center justify-center">
        <TouchableOpacity
          className={cn("w-16 flex flex-col items-center justify-start h-full py-1", i18n.language === 'id' ? 'bg-slate-100' : '')}
          onPress={() => changeLanguage('id')}
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
          className={cn("w-16 flex flex-col items-center justify-start h-full py-1", i18n.language === 'en' ? 'bg-slate-100' : '')}
          onPress={() => changeLanguage('en')}
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
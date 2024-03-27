import { TouchableOpacity, View } from "react-native"
import { Text } from "../../atoms/text"
import colors from "tailwindcss/colors"
import { ImageStatic } from "../../atoms"
import { memo, useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import 'dayjs/locale/id'
import 'dayjs/locale/en'
import { useTranslation } from "react-i18next"

interface HeaderTimeProps {
  onPress?: () => void
}

export const HeaderTime = memo((props: HeaderTimeProps) => {
  const { onPress } = props
  const { i18n } = useTranslation([]);

  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")

  const getDateTime = useCallback(() => {
    setTime(dayjs().format("HH:mm"))
    setDate(dayjs().locale(i18n.language).format("dddd, DD MMMM YYYY"))
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const loop = () => {
      getDateTime()
      timeout = setTimeout(loop, 1000)
    }

    loop()

    return () => clearTimeout(timeout)
  }, [])

  return (
    <View className="bg-blue-600 p-4 flex flex-row items-center justify-between">
      <View>
        <Text
          label={time}
          color={colors.white}
          variant="extra-large"
          fontWeight="bold"
        />
        <Text
          label={date}
          color={colors.white}
          variant="large"
          fontWeight="regular"
        />

      </View>
      <TouchableOpacity disabled={onPress ? false : true} onPress={onPress}>
        <ImageStatic name="logo-dki" size={50} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
})
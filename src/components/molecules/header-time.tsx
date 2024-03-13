import { View } from "react-native"
import { Text } from "../text"
import colors from "tailwindcss/colors"
import { ImageStatic } from "../atoms"
import { memo, useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import 'dayjs/locale/id'

export const HeaderTime = memo(() => {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")

  const getDateTime = useCallback(() => {
    setTime(dayjs().format("HH:mm"))
    setDate(dayjs().locale('id').format("dddd, DD MMMM YYYY"))
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
      <ImageStatic name="logo-dki" size={50} resizeMode="contain" />
    </View>
  )
})
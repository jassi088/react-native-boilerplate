import { View } from "react-native"
import { Button } from "../../atoms/button"
import colors from "tailwindcss/colors"
import { useKeyboard } from "@react-native-community/hooks"

interface ActionButtonProps {
  primaryButtonLabel: string
  secondaryButtonLabel: string
  onPrimaryButtonPress: () => void
  onSecondaryButtonPress: () => void
}

export const ActionButton = (props: ActionButtonProps) => {
  const { primaryButtonLabel, secondaryButtonLabel, onPrimaryButtonPress, onSecondaryButtonPress } = props

  const { keyboardShown } = useKeyboard()

  if (keyboardShown) return null

  return (
    <View className="flex flex-row items-center justify-center px-5 pt-5 bg-white">
      <Button
        variant="secondary"
        label={secondaryButtonLabel}
        onPress={onSecondaryButtonPress}
        color={colors.orange[500]}
        containerClassName="flex-1"
      />
      <View className="w-4" />
      <Button
        variant="background"
        label={primaryButtonLabel}
        onPress={onPrimaryButtonPress}
        containerClassName="flex-1"
      />
    </View>
  )
}
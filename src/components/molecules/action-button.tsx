import { View } from "react-native"
import { Button } from "../button"
import colors from "tailwindcss/colors"

interface ActionButtonProps {
  primaryButtonLabel: string
  secondaryButtonLabel: string
  onPrimaryButtonPress: () => void
  onSecondaryButtonPress: () => void
}

export const ActionButton = (props: ActionButtonProps) => {
  const { primaryButtonLabel, secondaryButtonLabel, onPrimaryButtonPress, onSecondaryButtonPress } = props

  return (
    <View className="mx-auto w-[60%]">
      <Button variant="background" label={primaryButtonLabel} onPress={onPrimaryButtonPress} containerClassName="mb-4" />
      <Button variant="secondary" label={secondaryButtonLabel} onPress={onSecondaryButtonPress} color={colors.orange[500]} />
    </View>
  )
}
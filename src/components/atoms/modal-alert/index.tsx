import { Button } from "@/components/atoms/button";
import { Text } from "../text";
import { Modal, View } from "react-native"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import colors from "tailwindcss/colors";
import { ModalAlertProps, ModalAlertVariantType } from "./index.type";

const iconVariantMapper: Record<ModalAlertVariantType, string> = {
  success: 'circle-check',
  error: 'circle-xmark',
  warning: 'circle-exclamation',
  info: 'circle-info'
}

const iconColorMapper: Record<ModalAlertVariantType, string> = {
  success: colors.green[500],
  error: colors.red[500],
  warning: colors.yellow[500],
  info: colors.blue[500]
}

export const ModalAlert = (props: ModalAlertProps) => {
  const { message, onPress, isVisible, title, variant, buttonText = 'Ok' } = props

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View className='w-full absolute h-full bg-gray-800 opacity-50' />
      <View className='w-[75%] bg-white rounded-xl p-6 py-6 self-center flex items-center justify-center flex-col space-y-4 my-auto'>
        <FontAwesome6 name={iconVariantMapper[variant]} size={60} color={iconColorMapper[variant]} className='self-center' />
        <View>
          {title && (
            <Text
              label={title}
              textAlign="center"
              variant="extra-large"
              fontWeight="semi-bold"
              textClassName="mb-2"
            />
          )}
          <Text
            label={message}
            textAlign="center"
            variant="medium"
            textClassName="mb-5"
          />
        </View>
        <Button
          label={buttonText}
          variant='secondary'
          size='small'
          onPress={onPress} color={colors.gray[500]}
          fontSize="medium"
        />
      </View>
    </Modal>
  )
}
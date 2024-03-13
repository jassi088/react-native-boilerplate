import { Button } from "@/components/button";
import { Text } from "../../text";
import { Modal, View } from "react-native"
import colors from "tailwindcss/colors";
import { ModalConfirmationProps } from "./index.type";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ModalConfirmation = (props: ModalConfirmationProps) => {
  const { message, onConfirm, onCancel, isVisible, title, cancelText = 'Batal', confirmText = 'Yakin' } = props

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View className='w-full absolute h-full bg-gray-800 opacity-50' />
      <View className='w-[75%] bg-white rounded-xl self-center flex items-center justify-center flex-col my-auto'>
        <View className="bg-blue-600 w-full rounded-t-xl py-3">
          <Text
            label={title}
            textAlign="center"
            variant="extra-large"
            fontWeight="semi-bold"
            color={colors.white}
          />
        </View>
        <View className="p-6 py-6 flex items-center">
          <View>
            <Text
              label={message}
              textAlign="center"
              variant="medium"
              textClassName="mb-5"
            />
          </View>
          <View className="flex flex-row items-center">
            <Button
              label={cancelText}
              variant='secondary'
              size='small'
              onPress={onCancel}
              color={colors.gray[500]}
              fontSize="medium"
              leftIcon={<Ionicons name="close-circle-outline" size={20} color={colors.gray[500]} />}
            />
            <View className="w-2" />
            <Button
              label={confirmText}
              variant="background"
              size='small'
              onPress={onConfirm}
              color={colors.blue[500]}
              fontSize="medium"
              leftIcon={<Ionicons name="checkmark-circle-outline" size={20} color={colors.blue[200]} />}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
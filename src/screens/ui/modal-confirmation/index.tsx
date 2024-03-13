import { Modal, ScrollView, View } from 'react-native'
import React from 'react'
import { Button } from '@/components/button'
import { useNavigation } from '@react-navigation/native'
import { Text } from '@/components/text'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'tailwindcss/colors'
import AntDesign from 'react-native-vector-icons/AntDesign';



export const ModalConfirmationScreen = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
      >
        <View className='w-full absolute h-full bg-gray-500' />
        <View className='w-64 py-6 bg-white rounded-xl p-4 self-center flex items-center justify-center flex-col space-y-4 my-auto'>
          <AntDesign name="checkcircle" size={48} color={colors.green[500]} className='self-center' />
          <Text label={'Pendaftaran Kunjungan berhasil diproses'} textAlign='center' variant="extra-large" textClassName='text-center mb-3' />
          <Button label='Kembali' variant='secondary' size='small' onPress={() => undefined} color={colors.gray[500]} />
        </View>
      </Modal>
    </View>
  )
}
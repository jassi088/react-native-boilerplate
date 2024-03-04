import { ScrollView, View } from 'react-native'
import React from 'react'
import { InputText } from '@/components/form'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'tailwindcss/colors';

export const InputTextScreen = () => {
  return (
    <View className='p-4 bg-gray-50 flex flex-1'>
      <ScrollView>
        <InputText
          label='Basic Form'
          placeholder='Basic'
          onChangeText={(text) => undefined}
          value={undefined as unknown as string}
          containerClassName='mb-3'
        />
        <InputText
          label='Dengan Left Icon'
          placeholder='Isi data..'
          onChangeText={(text) => undefined}
          value={undefined as unknown as string}
          prefixIcon={<FontAwesome name="user" size={16} color={colors.blue[500]} />}
          containerClassName='mb-3'
        />
        <InputText
          label='Dengan Right Icon'
          placeholder='Isi data..'
          onChangeText={(text) => undefined}
          value={undefined as unknown as string}
          suffixIcon={<FontAwesome name="user" size={16} color={colors.blue[500]} />}
          containerClassName='mb-3'
        />
        <InputText
          label='Secure Text Entry'
          placeholder='Isi contoh secure text entry..'
          onChangeText={(text) => undefined}
          value={undefined as unknown as string}
          containerClassName='mb-3'
          isSecureTextEntry
        />
        <InputText
          label='Dengan Delete Function'
          placeholder='Isi data..'
          onChangeText={(text) => undefined}
          value={undefined as unknown as string}
          onDelete={() => undefined}
        />
      </ScrollView>
    </View>
  )
}
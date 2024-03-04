import { ScrollView, View } from 'react-native'
import React from 'react'
import { InputTime } from '@/components/form'
import dayjs from 'dayjs'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'tailwindcss/colors';

export const InputTimeScreen = () => {
  return (
    <View className='p-4 bg-gray-50 flex flex-1'>
      <ScrollView>
        <InputTime
          label='Basic Input Time'
          placeholder='Pilih waktu mulai'
          onChange={(text) => undefined}
          value={dayjs().toDate()}
          containerClassName='mb-3'
          format="HH:mm"
          prefixIcon={<FontAwesome name="calendar" size={16} color={colors.blue[500]} />}
        />
      </ScrollView>
    </View>
  )
}
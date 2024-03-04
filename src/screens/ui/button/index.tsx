import { ScrollView, View } from 'react-native'
import React from 'react'
import { Button } from '@/components/button'
import colors from 'tailwindcss/colors'

export const ButtonScreen = () => {
  return (
    <ScrollView className='space-y-3 p-3 flex-1 flex'>
      <Button containerClassName='mb-2' variant='background' label='Button Primary Blue' onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='background' label='Button Primary Red' color={colors.red[600]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='background' label='Button Primary Orange' color={colors.orange[500]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='background' label='Button Primary Green' color={colors.green[600]} onPress={() => undefined} />

      <View className='h-[1px] my-8 bg-gray-500' />

      <Button containerClassName='mb-2' variant='background' disabled label='(Disabled) Button Primary Blue' onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='background' disabled label='(Disabled) Button Primary Red' color={colors.red[600]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='background' disabled label='(Disabled) Button Primary Orange' color={colors.orange[500]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='background' disabled label='(Disabled) Button Primary Green' color={colors.green[600]} onPress={() => undefined} />

      <View className='h-[1px] my-8 bg-gray-500' />

      <Button containerClassName='mb-2' variant='secondary' label='Button Secondary Blue' onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='secondary' label='Button Secondary Red' color={colors.red[600]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='secondary' label='Button Secondary Orange' color={colors.orange[500]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='secondary' label='Button Secondary Green' color={colors.green[600]} onPress={() => undefined} />

      <View className='h-[1px] my-8 bg-gray-500' />

      <Button containerClassName='mb-2' variant='secondary' disabled label='(Disabled) Button Secondary Blue' onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='secondary' disabled label='(Disabled) Button Secondary Red' color={colors.red[600]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='secondary' disabled label='(Disabled) Button Secondary Orange' color={colors.orange[500]} onPress={() => undefined} />
      <Button containerClassName='mb-2' variant='secondary' disabled label='(Disabled) Button Secondary Green' color={colors.green[600]} onPress={() => undefined} />

      <View className='h-20'></View>
    </ScrollView>
  )
}
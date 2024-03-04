import { ScrollView, View } from 'react-native'
import React from 'react'
import { Button } from '@/components/button'
import { useNavigation } from '@react-navigation/native'



export const Home = () => {
  const navigation = useNavigation()

  return (
    <ScrollView>
      <View className='p-4'>
        <Button containerClassName="mb-2" label={'Input Text'} variant="background" onPress={() => navigation.navigate('InputText')} />
        <Button containerClassName="mb-2" label={'Input Time'} variant="background" onPress={() => navigation.navigate('InputTime')} />
        <Button containerClassName="mb-2" label={'Input Date'} variant="background" onPress={() => navigation.navigate('InputDate')} />
        <Button containerClassName="mb-2" label={'Input Camera'} variant="background" onPress={() => navigation.navigate('InputCamera')} />
        <Button containerClassName="mb-2" label={'Button'} variant="background" onPress={() => navigation.navigate('Button')} />
        <Button containerClassName="mb-2" label={'Slider'} variant="background" onPress={() => navigation.navigate('Slider')} />
        <Button containerClassName="mb-2" label={'Modal Confirmation'} variant="background" onPress={() => navigation.navigate('ModalConfirmation')} />
      </View>
    </ScrollView>
  )
}
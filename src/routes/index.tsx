import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './index.type';
import { BuatJanji, Home, Kunjungan, Register, Setting, Splash } from '@/screens';
import { ModalAlert, ModalConfirmation } from '@/components/atoms';
import { useModalAlert, useModalConfirmation, useUserInactivity } from '@/hooks';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { toastConfig } from '@/components/atoms/toast';
import { Alert } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const ScreenSaverProvider = () => {
  const navigation = useNavigation()

  const { isInactive } = useUserInactivity(() => {
    navigation.navigate('Screensaver')
  }, 10000)
  return null
}

export const Routes = () => {
  const { modalAlert } = useModalAlert()
  const { modalConfirmation } = useModalConfirmation()


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Kunjungan" component={Kunjungan} />
        <Stack.Screen name="BuatJanji" component={BuatJanji} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
      <ScreenSaverProvider />
      {modalAlert ?
        <ModalAlert {...modalAlert} isVisible={modalAlert.isVisible || false} />
        : null}
      {modalConfirmation ?
        <ModalConfirmation {...modalConfirmation} isVisible={modalConfirmation?.isVisible || false} />
        : null}
      <Toast config={toastConfig as ToastConfig} />
    </NavigationContainer>
  );
}

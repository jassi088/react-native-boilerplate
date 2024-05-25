import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './index.type';
import { BuatJanji, Home, Kunjungan, Register, Screensaver, Setting, Splash } from '@/screens';
import { ModalAlert, ModalConfirmation, Text } from '@/components/atoms';
import { useModalAlert, useModalConfirmation, useUserInactivity } from '@/hooks';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { toastConfig } from '@/components/atoms/toast';
import UserInactivity from 'react-native-user-inactivity';
import { TIMEOUT_SCREENSAVER } from '@/constants/screensaver';
import { VisitorCheck } from '@/screens/visitor-check';
import { Menu } from '@/screens/menu';

const Stack = createStackNavigator<RootStackParamList>();

const ScreenSaverProvider = ({ isActive }: { isActive: boolean }) => {
  const navigation = useNavigation()

  React.useEffect(() => {
    if (isActive === false) {
      navigation.navigate('Screensaver')
    }
  }, [isActive, navigation])

  return null
}

export const Routes = () => {
  const { modalAlert } = useModalAlert()
  const { modalConfirmation } = useModalConfirmation()

  const [isActive, setIsActive] = React.useState<boolean>(true)

  return (
    <NavigationContainer>
      <UserInactivity
        isActive={isActive}
        timeForInactivity={TIMEOUT_SCREENSAVER}
        onAction={isActive => { setIsActive(isActive); }}
        style={{ flex: 1 }}
      >
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
          <Stack.Screen name="Screensaver" component={Screensaver} />
          <Stack.Screen name="VisitorCheck" component={VisitorCheck} />
          <Stack.Screen name="Menu" component={Menu} />
        </Stack.Navigator>
        <ScreenSaverProvider isActive={isActive} />
      </UserInactivity>
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

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './index.type';
import { Home, Register } from '@/screens';
import { ModalAlert, ModalConfirmation } from '@/components/atoms';
import { useModalAlert, useModalConfirmation } from '@/hooks';

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
  const { modalAlert } = useModalAlert()
  const { modalConfirmation } = useModalConfirmation()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
      {modalAlert ?
        <ModalAlert {...modalAlert} isVisible={modalAlert?.isVisible || false} />
        : null}
      {modalConfirmation ?
        <ModalConfirmation {...modalConfirmation} isVisible={modalConfirmation?.isVisible || false} />
        : null}

    </NavigationContainer>
  );
}

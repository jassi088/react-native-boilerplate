import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { InputTimeScreen } from '@/screens/ui/input-time';
import { ButtonScreen } from '@/screens/ui/button';
import { InputDate } from '@/screens/ui/input-date';
import { InputCamera } from '@/screens/ui/input-camera';
import { Slider } from '@/screens/ui/slider';
import { Home } from '@/screens/ui/home';
import { RootStackParamList } from './index.type';
import { ModalConfirmationScreen } from '@/screens/ui/modal-confirmation';
import { InputTextScreen } from '@/screens/ui/input-text';

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="InputText" component={InputTextScreen} />
        <Stack.Screen name="InputTime" component={InputTimeScreen} />
        <Stack.Screen name="InputDate" component={InputDate} />
        <Stack.Screen name="InputCamera" component={InputCamera} />
        <Stack.Screen name="Slider" component={Slider} />
        <Stack.Screen name="Button" component={ButtonScreen} />
        <Stack.Screen name="ModalConfirmation" component={ModalConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { useKeyboard } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { AppStateEvent, NativeEventSubscription } from 'react-native';
import { AppState, AppStateStatus } from 'react-native';

export const useUserInactivity = (onInactive: () => void, timeout = 30000) => {
  const [isInactive, setIsInactive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigation = useNavigation();
  const keyboard = useKeyboard();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsInactive(false);
    timeoutRef.current = setTimeout(() => {
      setIsInactive(true);
    }, timeout);
  };

  const handleUserActivity = () => {
    resetTimeout();
  };

  useEffect(() => {
    const listener = navigation.addListener('state', () => handleUserActivity());

    return () => listener();
  }, [navigation]);

  useEffect(() => {
    handleUserActivity();
  }, [keyboard.keyboardShown]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        handleUserActivity();
      }
    };

    const events: AppStateEvent[] = ['change'];
    let subscriptions: NativeEventSubscription[] = [];
    events.forEach((event, index) => {
      subscriptions[index] = AppState.addEventListener(event, handleAppStateChange);
    });

    resetTimeout();

    return () => {
      subscriptions.forEach((subscription) => {
        subscription.remove();
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInactive) {
      onInactive();
    }
  }, [isInactive, onInactive]);

  return { isInactive };
};

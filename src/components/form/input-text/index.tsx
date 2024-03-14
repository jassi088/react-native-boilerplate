import { Text } from '@/components/text';
import React, { useEffect, useState } from 'react';
import {
  KeyboardType,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View
} from 'react-native';
import colors from 'tailwindcss/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { cn } from '@/utils';

interface InputTextInterface {
  value: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  isNumerical?: boolean;
  isTextArea?: boolean;
  placeholder?: string;
  numberOfLines?: number;
  maxLength?: number;
  isDisabled?: boolean;
  error?: string | undefined;
  isSecureTextEntry?: boolean;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  isFocus?: boolean;
  onDelete?: (() => void) | null;
  maxHeightTextArea?: number;
  label?: string;
  containerClassName?: string;
  keyboardType?: KeyboardType
}

export const InputText = (props: InputTextInterface) => {
  const {
    value,
    onBlur,
    isNumerical,
    isTextArea,
    placeholder,
    onChangeText,
    maxLength,
    numberOfLines = 10,
    isDisabled = false,
    error,
    isSecureTextEntry,
    prefixIcon,
    suffixIcon,
    onDelete,
    maxHeightTextArea,
    label,
    containerClassName,
    keyboardType,
    isFocus: isFocusProp
  } = props

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (isFocusProp !== undefined) setIsFocus(isFocusProp)
  }, [isFocusProp])

  return (
    <View className={cn('relative', containerClassName)}>
      {label &&
        <Text label={label} textClassName='mb-1' />
      }
      <View className={cn('flex flex-row text-sm border rounded-lg',
        error ? 'border-red-500' : isFocus ? 'border-blue-500' : 'border-gray-400',
        isDisabled ? 'bg-gray-200' : 'bg-white',
        isDisabled ? 'text-gray-400' : 'text-gray-700',
      )}>
        {prefixIcon && (
          <TouchableOpacity className='pl-3 flex items-center justify-center'>
            {prefixIcon}
          </TouchableOpacity>
        )}
        <TextInput
          maxLength={maxLength}
          value={value}
          onChangeText={(newText) => {
            onChangeText && onChangeText(isNumerical ? newText.replace(/[^0-9]/g, '') : newText);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setIsFocus(false);
          }}
          keyboardType={keyboardType}
          multiline={isTextArea}
          numberOfLines={isTextArea ? numberOfLines : 1}
          textAlignVertical={isTextArea ? 'top' : 'center'}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[400]}
          autoCapitalize="none"
          allowFontScaling={false}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          editable={!isDisabled}
          secureTextEntry={isSecureTextEntry ? showPassword : false}
          onFocus={() => {
            setIsFocus(true);
          }}
          style={{
            maxHeight: isTextArea ? maxHeightTextArea ?? 193 : undefined,
          }}
          className={cn('py-3 px-3 flex-1')}
        />
        {onDelete && value !== '' && (
          <TouchableOpacity
            className='pr-3 flex items-center justify-center'
            onPress={onDelete}
          >
            <AntDesign name="close" color={colors.gray[400]} size={16} />
          </TouchableOpacity>
        )}
        {suffixIcon && (
          <TouchableOpacity className='pr-3 flex items-center justify-center'>
            {suffixIcon}
          </TouchableOpacity>
        )}
        {isSecureTextEntry && (
          <TouchableOpacity className='pr-3 flex items-center justify-center'
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={16} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View className='mt-1'>
          <Text color={colors.red[500]} label={error} variant="small" />
        </View>
      )}
    </View>
  );
};


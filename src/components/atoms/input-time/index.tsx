import { Text } from '@/components/atoms/text';
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import colors from 'tailwindcss/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { cn } from '@/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputTimeInterface } from './index.type';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
import { InputErrorMessage } from '../input-error-message';

export const InputTime = (props: InputTimeInterface) => {
  const {
    value,
    placeholder,
    onChange,
    isDisabled = false,
    error,
    prefixIcon,
    suffixIcon,
    onDelete,
    label,
    containerClassName,
    format,
    is24Hour = true
  } = props

  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const openTimePicker = () => setShowTimePicker(true);
  const closeTimePicker = () => setShowTimePicker(false);

  return (
    <View className={cn('relative', containerClassName)}>
      {label &&
        <Text label={label} textClassName='mb-1' />
      }
      <View className={cn('flex flex-row bg-red-50 text-sm border rounded-lg',
        error ? 'border-red-500' : 'border-gray-400',
        isDisabled ? 'bg-gray-200' : 'bg-white',
        isDisabled ? 'text-gray-400' : 'text-gray-700',
      )}>
        {prefixIcon && (
          <TouchableOpacity className='pl-3 flex items-center justify-center'>
            {prefixIcon}
          </TouchableOpacity>
        )}
        <TouchableOpacity className='flex-1 px-3 py-3' disabled={isDisabled} onPress={openTimePicker}>
          <Text
            label={value ? dayjs(value).format(format) : placeholder}
            color={value ? colors.gray[700] : colors.gray[400]}
          />
        </TouchableOpacity>
        {onDelete && value && (
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
      </View>
      {error && (
        <InputErrorMessage error={error} />
      )}
      {showTimePicker && (
        <DateTimePicker
          mode='time'
          value={value ? dayjs(value).toDate() : dayjs().toDate()}
          onChange={(_, date) => {
            if (date) {
              onChange(date)
            }
            closeTimePicker()
          }}
          onError={(error) => Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: error.message
          })}
          is24Hour={is24Hour}
        />
      )}
    </View>
  );
};


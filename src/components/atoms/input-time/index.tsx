import { Text } from '@/components/atoms/text';
import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import colors from 'tailwindcss/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { cn } from '@/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormatType } from './index.type';
import dayjs from 'dayjs';

interface InputTimeInterface {
  value: Date | undefined;
  onChange?: (time: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  error?: string | undefined;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  isFocus?: boolean;
  onDelete?: (() => void) | null;
  maxHeightTextArea?: number;
  label?: string;
  containerClassName?: string;
  format: FormatType
}

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
    format
  } = props

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
        <View className='flex-1 px-3 py-3'>
          <Text label={dayjs(value).format(format)} />
        </View>
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
        <View className='mt-1'>
          <Text color={colors.red[500]} label={error} variant="small" />
        </View>
      )}
      <DateTimePicker
        mode='time'
        value={new Date()}
        onChange={() => undefined}
      />
    </View>
  );
};


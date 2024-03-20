import { Text } from '@/components/atoms/text';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import { cn } from '@/utils';
import { InputRadioData, InputRadioInterface } from './index.type';
import { InputErrorMessage } from '../input-error-message';
import colors from 'tailwindcss/colors';

const InputRadioList = memo((props: { value: InputRadioData, onPress: () => void, isSelected: boolean, isDisabled: boolean }) => {
  const { value, onPress, isSelected, isDisabled } = props

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
      className='flex flex-row items-center mb-2 px-2'
    >
      <View className={cn('w-4 h-4 rounded-full border-2 mr-0 flex items-center justify-center', isSelected ? 'border-blue-400' : 'border-gray-400')}>
        {isSelected &&
          <View className='w-2 h-2 rounded-full bg-blue-500' />
        }
      </View>
      <View className={cn('ml-1 py-1 rounded-md')}>
        <Text
          label={value.label as string}
          fontWeight={isSelected ? "bold" : 'regular'}
          color={isDisabled ? colors.gray[400] : colors.gray[600]}
        />
      </View>
    </TouchableOpacity>
  )
})

export const InputRadio = (props: InputRadioInterface) => {
  const {
    value,
    onChange,
    isDisabled = false,
    error,
    label,
    containerClassName,
    data,
  } = props

  const [selectedData, setSelectedData] = useState<InputRadioData | undefined>(undefined)

  useEffect(() => {
    if (value) {
      const selected = data.find(item => item.value === value)
      if (selected) {
        setSelectedData(selected)
      }
    }
  }, [value])

  return (
    <View className={cn('relative', containerClassName)}>
      {label &&
        <Text label={label} textClassName='mb-1' />
      }
      <View className='flex flex-row items-center flex-wrap'>
        {data.map((item, index) =>
          <InputRadioList
            key={index}
            value={item}
            onPress={() => {
              if (isDisabled) return

              setSelectedData(item)
              onChange(item)
            }}
            isSelected={item.value === selectedData?.value}
            isDisabled={isDisabled}
          />
        )}
      </View>
      {error && (
        <InputErrorMessage error={error} />
      )}
    </View>
  );
};


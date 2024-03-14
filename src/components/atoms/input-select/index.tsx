import { Text } from '@/components/atoms/text';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import colors from 'tailwindcss/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { cn } from '@/utils';
import { InputSelectData, InputSelectInterface } from './index.type';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView, useBottomSheetDynamicSnapPoints, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Fuse from 'fuse.js'
import { InputText } from '../input-text';
import { Button } from '@/components/atoms/button';
import { useBackHandler, useKeyboard } from '@react-native-community/hooks'
import { ScrollView } from 'react-native-gesture-handler';

const fuseOptions = {
  includeScore: true,
  keys: ['label']
}

const SelectList = memo((props: { value: InputSelectData, onPress: () => void, isSelected: boolean }) => {
  const { value, onPress, isSelected } = props

  return (
    <TouchableOpacity onPress={onPress} className={cn('px-2 py-3 rounded-md', isSelected ? 'bg-blue-50' : 'border-b border-gray-300')}>
      <Text label={value.label as string} fontWeight={isSelected ? "bold" : 'regular'} />
    </TouchableOpacity>
  )
})

export const InputSelect = (props: InputSelectInterface) => {
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
    data,
    enableSearch = true,
    onSheetChanges,
    searchPlaceholder = 'Cari..',
    saveButtonLabel = 'Pilih',
    cancelButtonLabel = 'Batal'
  } = props

  const [search, setSearch] = useState<string>('')
  const [dataFiltered, setDataFiltered] = useState<InputSelectData[]>(data)
  const [selectedData, setSelectedData] = useState<InputSelectData | undefined>(undefined)
  const [index, setIndex] = useState<number>(-1)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    onSheetChanges && onSheetChanges(index)
    setIndex(index)
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const { keyboardShown } = useKeyboard()

  useBackHandler(() => {
    if (index !== -1) {
      bottomSheetModalRef.current?.close()

      return true
    }

    return false
  })

  const fuse = useMemo(() => new Fuse(data, fuseOptions), [data])

  useEffect(() => {
    if (search) {
      const result = fuse.search(search)
      setDataFiltered(result.map(item => item.item))
    } else {
      setDataFiltered(data)
    }
  }, [search, data])

  const selectedValue = useMemo(() => data.find(item => item.value === value), [data, value])

  return (
    <View className={cn('relative', containerClassName)}>
      {label &&
        <Text label={label} textClassName='mb-1' />
      }
      <TouchableOpacity
        activeOpacity={0.7}
        className={cn('flex flex-row text-sm border rounded-lg',
          error ? 'border-red-500' : 'border-gray-400',
          isDisabled ? 'bg-gray-200' : 'bg-white',
          isDisabled ? 'text-gray-400' : 'text-gray-700',
        )}
        onPress={openModal}
      >
        {prefixIcon && (
          <TouchableOpacity className='pl-3 flex items-center justify-center'>
            {prefixIcon}
          </TouchableOpacity>
        )}
        <Text label={selectedValue ? selectedValue.label as string : placeholder} className={cn('py-3 px-3 flex-1', selectedValue ? 'text-gray-600' : 'text-gray-400')} />
        {onDelete && value !== '' && (
          <TouchableOpacity
            className='pr-3 flex items-center justify-center'
            onPress={onDelete}
          >
            <AntDesign name="close" color={colors.gray[400]} size={16} />
          </TouchableOpacity>
        )}
        {suffixIcon ? (
          <TouchableOpacity className='pr-3 flex items-center justify-center'>
            {suffixIcon}
          </TouchableOpacity>
        ) :
          <TouchableOpacity className='pr-3 flex items-center justify-center'>
            <Feather name='chevron-down' size={16} />
          </TouchableOpacity>
        }
      </TouchableOpacity>
      {error && (
        <View className='mt-1'>
          <Text color={colors.red[500]} label={error} variant="small" />
        </View>
      )}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
      >
        <BottomSheetView className='flex-1'>
          <View className='p-4'>
            <Text label={label} fontWeight='semi-bold' variant='large' textClassName='mb-4' />
            {enableSearch && (
              <InputText
                placeholder={searchPlaceholder}
                onChangeText={search => setSearch(search)}
                value={search}
                suffixIcon={<Feather name='search' size={16} />}
              />
            )}
          </View>
          <ScrollView>
            <View className='px-4'>
              {dataFiltered.map((item, index) => (
                <SelectList
                  isSelected={selectedData?.value === item.value}
                  value={item}
                  key={index}
                  onPress={() => {
                    if (selectedData?.value === item.value) {
                      setSelectedData(undefined)
                    } else {
                      setSelectedData(item)
                    }
                  }}
                />
              ))}
            </View>
          </ScrollView>
          {!keyboardShown && (
            <View className='p-4 flex flex-row items-center'>
              <Button
                variant="secondary"
                label={cancelButtonLabel}
                onPress={() => {
                  bottomSheetModalRef.current?.close()
                }}
                containerClassName='flex-1'
                color={colors.gray[600]}
              />
              <View className='w-4' />
              <Button
                variant="background"
                disabled={!selectedData}
                label={saveButtonLabel}
                onPress={() => {
                  if (selectedData) {
                    bottomSheetModalRef.current?.close()
                    onChange(selectedData)
                  }
                }}
                containerClassName='flex-1'
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};


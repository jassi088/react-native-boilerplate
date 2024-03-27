import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputSelect, InputText, InputTime } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { buatJanjiSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import { KEPERLUAN } from '@/constants/keperluan'
import Toast from 'react-native-toast-message'
import dayjs from 'dayjs'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'

type BuatJanjiPayload = yup.InferType<typeof buatJanjiSchema>

export const BuatJanji = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['visit', 'common'])

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  useBackHandler(() => {
    const isDirty = formik.dirty
    if (isDirty) {
      showModalConfirmation({
        isVisible: true,
        title: t('appointment:modalConfirmation.title'),
        message: t('appointment:modalConfirmation.description'),
        onConfirm: () => {
          closeModalConfirmation()
          navigation.goBack()
        },
        onCancel: () => closeModalConfirmation()
      })

      return true
    }

    return false
  })

  const formik = useFormik<BuatJanjiPayload>({
    initialValues: {
      no_hp: '',
      no_hp_tujuan: '',
      keperluan: '',
      keperluan_lainnya: '',
      jam_mulai: '',
      jam_selesai: ''
    },
    validationSchema: buatJanjiSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (values.no_hp === '081226696696') {
            Toast.show({
              type: 'error',
              text1: t('appointment:alert.notRegistered.title'),
              text2: t('appointment:alert.notRegistered.message')
            })
          } else {
            showModalAlert({
              isVisible: true,
              title: t('appointment:alert.success.title'),
              message: t('appointment:alert.success.message'),
              variant: 'success',
              buttonText: t('common:button.back'),
              onPress: () => {
                closeModalAlert()
                navigation.goBack()
              }
            })
          }

          resolve(true)
        }, 2000)
      })
    }
  })

  return (
    <>
      <SafeAreaView className='flex-1 bg-gray-100'>
        <Header title={t('appointment:title')} />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-4'>
              <Text
                label={t('appointment:description')}
                textClassName='mb-5'
              />
              <InputCamera />
              <InputText
                label={t('appointment:label.phone')}
                placeholder={t('appointment:placeholder.phone')}
                value={formik.values.no_hp}
                onChangeText={formik.handleChange('no_hp')}
                error={formik.errors.no_hp}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputText
                label={t('appointment:label.phoneDestination')}
                placeholder={t('appointment:placeholder.phoneDestination')}
                value={formik.values.no_hp_tujuan}
                onChangeText={formik.handleChange('no_hp_tujuan')}
                error={formik.errors.no_hp_tujuan}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputSelect
                label={t('appointment:label.needs')}
                placeholder={t('appointment:placeholder.needs')}
                value={formik.values.keperluan}
                onChange={data => formik.setFieldValue('keperluan', data.value)}
                error={formik.errors.keperluan}
                data={KEPERLUAN}
                containerClassName='mb-4'
              />
              {formik.values.keperluan === 'lainnya' && (
                <InputText
                  label={t('appointment:label.other')}
                  placeholder={t('appointment:placeholder.other')}
                  value={formik.values.keperluan_lainnya as string}
                  onChangeText={formik.handleChange('keperluan_lainnya')}
                  error={formik.errors.keperluan_lainnya}
                  containerClassName='mb-4'
                />
              )}
              <View className='flex flex-row items-center'>
                <InputTime
                  label={t('appointment:label.startHour')}
                  placeholder={t('appointment:placeholder.startHour')}
                  containerClassName='flex-1'
                  format='HH:mm'
                  value={formik.values.jam_mulai ? dayjs(formik.values.jam_mulai).toDate() : undefined}
                  onChange={value => formik.setFieldValue('jam_mulai', dayjs(value).toISOString())}
                  error={formik.errors.jam_mulai}
                />
                <View className='w-4' />
                <InputTime
                  label={t('appointment:label.endHour')}
                  placeholder={t('appointment:placeholder.endHour')}
                  containerClassName='flex-1'
                  format='HH:mm'
                  value={formik.values.jam_selesai ? dayjs(formik.values.jam_selesai).toDate() : undefined}
                  onChange={value => formik.setFieldValue('jam_selesai', dayjs(value).toISOString())}
                  error={formik.errors.jam_selesai}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View>
          <ActionButton
            primaryButtonLabel={t('appointment:button.appointment')}
            secondaryButtonLabel={t('appointment:button.back')}
            onPrimaryButtonPress={() => formik.handleSubmit()}
            onSecondaryButtonPress={() => {
              const isDirty = formik.dirty
              if (isDirty) {
                return showModalConfirmation({
                  isVisible: true,
                  title: t('appointment:modalConfirmation.title'),
                  message: t('appointment:modalConfirmation.description'),
                  onConfirm: () => {
                    closeModalConfirmation()
                    navigation.goBack()
                  },
                  onCancel: () => closeModalConfirmation()
                })
              }

              return navigation.goBack()
            }}
          />
        </View>
      </SafeAreaView>
      <Loader isVisible={formik.isSubmitting} />
    </>
  )
}
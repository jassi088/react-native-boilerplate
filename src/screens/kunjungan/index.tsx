import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { kunjunganSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import { KEPERLUAN } from '@/constants/keperluan'
import Toast from 'react-native-toast-message'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'

type KunjunganPayload = yup.InferType<typeof kunjunganSchema>

export const Kunjungan = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['visit', 'common'])

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const formik = useFormik<KunjunganPayload>({
    initialValues: {
      no_hp: '',
      keperluan: ''
    },
    validationSchema: kunjunganSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (values.no_hp === '081226696696') {
            Toast.show({
              type: 'error',
              text1: t('visit:alert.notRegistered.title'),
              text2: t('visit:alert.notRegistered.message')
            })
          } else {
            showModalAlert({
              isVisible: true,
              title: t('visit:alert.success.title'),
              message: t('visit:alert.success.message'),
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

  useBackHandler(() => {
    const isDirty = formik.dirty

    if (isDirty) {
      showModalConfirmation({
        isVisible: true,
        title: t('visit:modalConfirmation.title'),
        message: t('visit:modalConfirmation.description'),
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

  return (
    <>
      <SafeAreaView className='flex-1 bg-gray-100'>
        <Header title={t('visit:title')} />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-4'>
              <Text
                label={t('visit:description')}
                textClassName='mb-5'
              />
              <InputCamera />
              <InputText
                label={t('visit:label.phone')}
                placeholder={t('visit:placeholder.phone')}
                value={formik.values.no_hp}
                onChangeText={formik.handleChange('no_hp')}
                error={formik.errors.no_hp}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputSelect
                label={t('visit:label.needs')}
                placeholder={t('visit:placeholder.needs')}
                value={formik.values.keperluan}
                onChange={data => formik.setFieldValue('keperluan', data.value)}
                error={formik.errors.keperluan}
                data={KEPERLUAN}
              />
              {formik.values.keperluan === 'lainnya' && (
                <InputText
                  label={t('visit:label.other')}
                  placeholder={t('visit:placeholder.other')}
                  value={formik.values.keperluan_lainnya as string}
                  onChangeText={formik.handleChange('keperluan_lainnya')}
                  error={formik.errors.keperluan_lainnya}
                  containerClassName='mt-4'
                />
              )}
            </View>
          </ScrollView>
        </View>
        <View>
          <ActionButton
            primaryButtonLabel={t('visit:button.visit')}
            secondaryButtonLabel={t('visit:button.back')}
            onPrimaryButtonPress={() => formik.handleSubmit()}
            onSecondaryButtonPress={() => {
              const isDirty = formik.dirty
              if (isDirty) {
                return showModalConfirmation({
                  isVisible: true,
                  title: t('visit:modalConfirmation.title'),
                  message: t('visit:modalConfirmation.description'),
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
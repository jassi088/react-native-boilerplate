import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung'
import { useFormik } from 'formik'
import { registerSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'

type RegisterPayload = yup.InferType<typeof registerSchema>

export const Register = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['register', 'common'])

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  useBackHandler(() => {
    const isDirty = formik.dirty
    if (isDirty) {
      showModalConfirmation({
        isVisible: true,
        title: t('register:modalConfirmation.title'),
        message: t('register:modalConfirmation.description'),
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

  const formik = useFormik<RegisterPayload>({
    initialValues: {
      tipe_pengunjung: '',
      no_hp: '',
      email: '',
      nama: '',
      nik: '',
      nrk: ''
    },
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          showModalAlert({
            isVisible: true,
            title: t('register:alert.title'),
            message: t('register:alert.message'),
            variant: 'success',
            buttonText: t('common:button.back'),
            onPress: () => {
              closeModalAlert()
              navigation.goBack()
            }
          })
          resolve(true)
        }, 2000)
      })
    }
  })

  return (
    <>
      <SafeAreaView className='flex-1 bg-gray-100'>
        <Header title={t('register:title')} />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-4'>
              <Text
                label={t('register:description')}
                textClassName='mb-5'
              />
              <InputCamera />
              <InputSelect
                label={t('register:label.visitorType')}
                placeholder={t('register:placeholder.visitorType')}
                value={formik.values.tipe_pengunjung as string}
                onChange={(data) => formik.setFieldValue('tipe_pengunjung', data.value)}
                data={TIPE_PENGUNJUNG}
                error={formik.errors.tipe_pengunjung}
                containerClassName='mb-4'
              />
              {formik.values.tipe_pengunjung && (
                <View>
                  {formik.values.tipe_pengunjung === 'asn' && (
                    <InputText
                      label={t('register:label.nrk')}
                      placeholder={t('register:placeholder.nrk')}
                      value={formik.values.nrk as string}
                      onChangeText={formik.handleChange('nrk')}
                      error={formik.errors.nrk}
                      containerClassName='mb-4'
                      keyboardType="numeric"
                    />
                  )}
                  {formik.values.tipe_pengunjung === 'non-asn' && (
                    <InputText
                      label={t('register:label.nik')}
                      placeholder={t('register:placeholder.nik')}
                      value={formik.values.nik as string}
                      onChangeText={formik.handleChange('nik')}
                      error={formik.errors.nik}
                      containerClassName='mb-4'
                      keyboardType="numeric"
                    />
                  )}
                  <InputText
                    label={t('register:label.name')}
                    placeholder={t('register:placeholder.name')}
                    value={formik.values.nama}
                    onChangeText={formik.handleChange('nama')}
                    error={formik.errors.nama}
                    containerClassName='mb-4'
                  />
                  <InputText
                    label={t('register:label.phone')}
                    placeholder={t('register:placeholder.phone')}
                    value={formik.values.no_hp}
                    onChangeText={formik.handleChange('no_hp')}
                    error={formik.errors.no_hp}
                    containerClassName='mb-4'
                    keyboardType='numeric'
                  />
                  <InputText
                    label={t('register:label.email')}
                    placeholder={t('register:placeholder.email')}
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    error={formik.errors.email}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <View>
          <ActionButton
            primaryButtonLabel={t('register:button.register')}
            secondaryButtonLabel={t('register:button.back')}
            onPrimaryButtonPress={() => formik.handleSubmit()}
            onSecondaryButtonPress={() => {
              const isDirty = formik.dirty
              if (isDirty) {
                return showModalConfirmation({
                  isVisible: true,
                  title: t('register:modalConfirmation.title'),
                  message: t('register:modalConfirmation.description'),
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
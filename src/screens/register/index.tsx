import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung'
import { useFormik } from 'formik'
import { registerSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation, useVisitorCheck } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { useMutation } from 'react-query'
import { postRegister, PostRegisterInterface } from '@/endpoints/POST_Register'
import { BaseResponse } from '@/interfaces/BaseResponse'
import { RootStackParamList } from '@/routes/index.type'

type RegisterPayload = yup.InferType<typeof registerSchema>

export const Register = () => {
  const navigation = useNavigation()
  const { params: { photo, phone } } = useRoute<RouteProp<RootStackParamList, 'Register'>>();

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

  const { mutateAsync: mutateAsyncVisitorCheck, isLoading: isLoadingVisitorCheck } = useVisitorCheck({
    onSuccess: (response) => {
      console.log('[Register][Visitor Check] Response', response);

      if (!response.status) {
        return showModalAlert({
          variant: 'error',
          isVisible: true,
          title: t('visitorCheck:alert.notRegistered.title'),
          message: t('visitorCheck:alert.notRegistered.message'),
          onPress: () => closeModalConfirmation()
        })
      }

      navigation.navigate('Menu', {
        phone: formik.values.no_hp,
        photo,
        visitorId: response.data!.visitorId,
        name: response.data!.name
      })
    },
    onError: (error) => {
      console.log('[Register][Visitor Check] Error', error);

      return showModalAlert({
        isVisible: true,
        title: 'Gagal Memproses Data',
        message: error.message,
        variant: 'error',
        buttonText: t('common:button.back'),
        onPress: () => closeModalAlert()
      })
    }
  })


  const { mutateAsync: mutateAsyncRegister } = useMutation({
    mutationKey: ['register'],
    mutationFn: (body: PostRegisterInterface) => postRegister(body),
    onSuccess: (response) => {
      if (response.status === false) {
        return showModalAlert({
          isVisible: true,
          title: 'Gagal Register',
          message: response.message,
          variant: 'error',
          buttonText: t('common:button.back'),
          onPress: () => closeModalAlert()
        })
      }

      showModalAlert({
        isVisible: true,
        title: t('register:alert.success.title'),
        message: t('register:alert.success.message'),
        variant: 'success',
        buttonText: t('common:button.yes'),
        onPress: () => {
          closeModalAlert()
          mutateAsyncVisitorCheck({
            phone: formik.values.no_hp,
            photo: photo.path
          })
        }
      })
    },
    onError: (error: BaseResponse) => {
      return showModalAlert({
        isVisible: true,
        title: 'Gagal Register',
        message: error.message,
        variant: 'error',
        buttonText: t('common:button.back'),
        onPress: () => closeModalAlert()
      })
    }
  })

  const formik = useFormik<RegisterPayload>({
    initialValues: {
      tipe_pengunjung: '',
      no_hp: phone,
      email: '',
      nama: '',
      nik: '',
      nrk: '',
    },
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      return new Promise(async resolve => {
        try {
          await mutateAsyncRegister({
            ...values,
            phone: values.no_hp,
            name: values.nama,
            is_asn: values.tipe_pengunjung === 'asn',
            photo: photo.path,
          } as unknown as PostRegisterInterface)
        } catch (error) {
          console.log('[Register] error', error);

          Toast.show({
            type: 'error',
            text1: t('common:camera.failed'),
            text2: (error as Error).message
          })
        } finally {
          resolve(true)
        }
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
              <View className="w-full h-64 mb-8 flex items-center justify-center">
                <Image
                  source={{ uri: 'file://' + photo.path }}
                  style={{ width: 240, height: 240 }}
                  className='rounded-lg'
                />
              </View>
              <InputText
                label={t('register:label.phone')}
                placeholder={t('register:placeholder.phone')}
                value={formik.values.no_hp}
                onChangeText={formik.handleChange('no_hp')}
                error={formik.errors.no_hp}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
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
      <Loader isVisible={formik.isSubmitting || isLoadingVisitorCheck} />
    </>
  )
}
import React, { useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputCameraHandle, InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { kunjunganSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation, useRegister, useVisitorCheck } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import Toast from 'react-native-toast-message'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { postKunjungan, PostKunjunganInterface } from '@/endpoints/POST_Kunjungan'
import { BaseResponse } from '@/interfaces/BaseResponse'
import { getPurpose } from '@/endpoints/GET_Purpose'

type KunjunganPayload = yup.InferType<typeof kunjunganSchema>

export const Kunjungan = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['visit', 'common'])
  const { setNavigateAfterRegister } = useRegister()
  const inputCamera = useRef<InputCameraHandle>(null)

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const { mutateAsync: mutateAsyncVisitorCheck, isLoading: isLoadingVisitorCheck } = useVisitorCheck({
    onSuccess: (response) => {
      if (!response.status) {
        return showModalAlert({
          isVisible: true,
          message: response.message,
          variant: 'error',
          buttonText: t('common:button.back'),
          onPress: () => {
            closeModalAlert();
            setNavigateAfterRegister('Kunjungan')
            navigation.navigate('Register')
          }
        })
      }

      const { data } = response
      mutateAsyncKunjungan({
        phone: data!.phone,
        visitor_id: data!.visitorId,
        id_keperluan: Number(formik.values.id_keperluan),
        keperluan: formik.values.keperluan,
        photo: formik.values.photo
      })
    },
    onError: (error) => {
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

  const { data: dataPurpose } = useQuery({
    queryKey: ['purpose'],
    queryFn: () => getPurpose(),
  })

  const { mutateAsync: mutateAsyncKunjungan, isLoading: isLoadingKunjungan } = useMutation({
    mutationKey: ['kunjungan'],
    mutationFn: (body: PostKunjunganInterface) => postKunjungan(body),
    onSuccess: (response) => {
      console.log('respsonse', response);

      if (response.status === false) {
        return showModalAlert({
          isVisible: true,
          message: response.message,
          variant: 'error',
          buttonText: t('common:button.back'),
          onPress: () => closeModalAlert()
        })
      }

      showModalAlert({
        isVisible: true,
        message: 'Berhasil Registrasi Kunjungan',
        variant: 'success',
        buttonText: t('common:button.back'),
        onPress: () => {
          closeModalAlert()
          navigation.goBack()
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

  const formik = useFormik<KunjunganPayload>({
    initialValues: {
      no_hp: '',
      keperluan: '',
      id_keperluan: '',
      photo: ''
    },
    validationSchema: kunjunganSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      mutateAsyncVisitorCheck({
        phone: values.no_hp,
        photo: values.photo
      })
    }
  })

  const onSubmit = async () => {
    try {
      const photo = await inputCamera.current?.takePhoto()

      if (!photo?.faceDetection.isFaceDetected) {
        return Toast.show({
          type: 'error',
          text1: 'Wajah tidak terdeteksi',
          text2: 'Silahkan coba lagi'
        })
      }

      if (photo.faceDetection.totalFaceDetected > 1) {
        return Toast.show({
          type: 'error',
          text1: 'Wajah terdeteksi lebih dari satu',
          text2: 'Silahkan coba lagi'
        })
      }

      formik.setFieldValue('photo', photo.photo.path)
      formik.handleSubmit()
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Gagal untuk registrasi',
        text2: (error as Error).message || 'Terjadi kesaalahan'
      })
    }
  }

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
              <View className="w-full h-72 mb-12">
                <InputCamera ref={inputCamera} />
              </View>
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
                value={formik.values.id_keperluan}
                onChange={data => {
                  formik.setFieldValue('id_keperluan', String(data.value))
                  if (data.value !== 5) {
                    formik.setFieldValue('keperluan', String(data.label))
                  }
                }}
                error={formik.errors.id_keperluan}
                data={dataPurpose?.data ? dataPurpose?.data.map(item => ({
                  label: item.name,
                  value: String(item.id)
                })) : []}
              />
              {formik.values.id_keperluan === '5' && (
                <InputText
                  label={t('visit:label.other')}
                  placeholder={t('visit:placeholder.other')}
                  value={formik.values.keperluan as string}
                  onChangeText={formik.handleChange('keperluan')}
                  error={formik.errors.keperluan}
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
            onPrimaryButtonPress={onSubmit}
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
      <Loader isVisible={isLoadingVisitorCheck || isLoadingKunjungan} />
    </>
  )
}
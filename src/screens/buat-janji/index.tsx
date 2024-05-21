import React, { useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputCameraHandle, InputSelect, InputText, InputTime } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { buatJanjiSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation, useRegister, useVisitorCheck } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import Toast from 'react-native-toast-message'
import dayjs from 'dayjs'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { AppointmentInterface, postAppointment } from '@/endpoints/POST_Appointment'
import { getPurpose } from '@/endpoints/GET_Purpose'
import { cn } from '@/utils'
import { BaseResponse } from '@/interfaces/BaseResponse'

type BuatJanjiPayload = yup.InferType<typeof buatJanjiSchema>

export const BuatJanji = () => {
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
      mutateAsyncAppointment({
        phone: data!.phone,
        photo: formik.values.photo,
        name: data!.name,
        visitorId: data!.visitorId,
        employee_phone: formik.values.no_hp_tujuan,
        start_on: dayjs(formik.values.jam_mulai).toDate(),
        end_on: dayjs(formik.values.jam_selesai).toDate(),
        id_keperluan: Number(formik.values.id_keperluan),
        keperluan: formik.values.keperluan as string,
        catatan: 'DUMMY'
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

  const { mutateAsync: mutateAsyncAppointment, isLoading: isLoadingAppointment } = useMutation({
    mutationKey: ['appointment'],
    mutationFn: (body: AppointmentInterface) => postAppointment(body),
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
      id_keperluan: '',
      keperluan: '',
      jam_mulai: '',
      jam_selesai: '',
      photo: '',
    },
    validationSchema: buatJanjiSchema,
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
              <View className="w-full h-72 mb-12">
                <InputCamera ref={inputCamera} />
              </View>
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
                  label={t('appointment:label.other')}
                  placeholder={t('appointment:placeholder.other')}
                  value={formik.values.keperluan as string}
                  onChangeText={formik.handleChange('keperluan')}
                  error={formik.errors.keperluan}
                  containerClassName='mb-4'
                />
              )}
              <View className={cn('flex flex-row items-center', 'mt-5')}>
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
            onPrimaryButtonPress={onSubmit}
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
      <Loader isVisible={isLoadingAppointment || isLoadingVisitorCheck} />
    </>
  )
}
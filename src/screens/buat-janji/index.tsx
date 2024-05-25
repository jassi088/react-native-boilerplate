import React, { useRef } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { Infoplist, InputSelect, InputText, InputTime } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { buatJanjiSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
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
import { RootStackParamList } from '@/routes/index.type'

type BuatJanjiPayload = yup.InferType<typeof buatJanjiSchema>

export const BuatJanji = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['visit', 'common'])
  const { params: { phone, photo, visitorId, name, is_asn, uid } } = useRoute<RouteProp<RootStackParamList, 'BuatJanji'>>();


  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const { data: dataPurpose } = useQuery({
    queryKey: ['purpose'],
    queryFn: () => getPurpose(),
  })

  const { mutateAsync: mutateAsyncAppointment, isLoading: isLoadingAppointment } = useMutation({
    mutationKey: ['appointment'],
    mutationFn: (body: AppointmentInterface) => postAppointment(body),
    onSuccess: (response) => {
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
        title: "Appointment Berhasil Dibuat",
        message: "Silahkan menunggu konfirmasi dari pihak terkait",
        variant: 'success',
        buttonText: t('common:button.back'),
        onPress: () => {
          closeModalAlert()
          // @ts-ignore
          navigation.replace('Home')
        }
      })
    },
    onError: (error: BaseResponse) => {
      console.log('[Appointment][Post Appointment] Error', error);

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
      name: name,
      phone: phone,
      employee_phone: '',
      id_keperluan: '',
      keperluan: '',
      jam_mulai: '',
      jam_selesai: '',
      photo: photo.path,
      visitorId: visitorId || ''
    },
    validationSchema: buatJanjiSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise(async resolve => {
        try {
          await mutateAsyncAppointment({
            phone: values.phone,
            photo: values.photo as string,
            name: values!.name,
            visitorId: values!.visitorId,
            employee_phone: values.employee_phone,
            start_on: dayjs(values.jam_mulai).toDate(),
            end_on: dayjs(values.jam_selesai).toDate(),
            id_keperluan: Number(values.id_keperluan),
            keperluan: values.keperluan as string,
            catatan: 'DUMMY'
          })
        } catch (error) {
          Toast.show({
            type: 'error',
            text2: (error as Error).message || 'Terjadi kesaalahan'
          })
        } finally {
          resolve(true)
        }
      })
    }
  })

  const onSubmit = async () => {
    try {

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
              <View className="w-full h-64 mb-8 flex items-center justify-center">
                <Image
                  source={{ uri: 'file://' + photo.path }}
                  style={{ width: 240, height: 240 }}
                  className='rounded-lg'
                />
              </View>
              <View className='flex flex-row items-center'>
                <View className='flex-1'>
                  <Infoplist
                    label={t('appointment:label.visitorType')}
                    value={is_asn === true ? 'ASN' : 'Non ASN'}
                  />
                </View>
                <View className='flex-1'>
                  <Infoplist
                    label={is_asn === true ? t('appointment:label.nrk') : t('appointment:label.nik')}
                    value={uid}
                  />
                </View>
              </View>
              <InputText
                label={t('appointment:label.phone')}
                placeholder={t('appointment:placeholder.phone')}
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                error={formik.errors.phone}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputText
                label={t('appointment:label.name')}
                placeholder={t('appointment:placeholder.name')}
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                error={formik.errors.name}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputText
                label={t('appointment:label.phoneDestination')}
                placeholder={t('appointment:placeholder.phoneDestination')}
                value={formik.values.employee_phone}
                onChangeText={formik.handleChange('employee_phone')}
                error={formik.errors.employee_phone}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputSelect
                label={t('visit:label.needs')}
                placeholder={t('visit:placeholder.needs')}
                value={formik.values.id_keperluan}
                onChange={data => {
                  formik.setFieldValue('id_keperluan', String(data.value))
                  if (data.value == 5) {
                    formik.setFieldValue('keperluan', String(''))
                  } else {
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
                  containerClassName='mt-4'
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
      <Loader isVisible={isLoadingAppointment || formik.isSubmitting} />
    </>
  )
}
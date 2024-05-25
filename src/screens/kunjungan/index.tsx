import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { Infoplist, InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { kunjunganSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import Toast from 'react-native-toast-message'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { postKunjungan, PostKunjunganInterface } from '@/endpoints/POST_Kunjungan'
import { BaseResponse } from '@/interfaces/BaseResponse'
import { getPurpose } from '@/endpoints/GET_Purpose'
import { RootStackParamList } from '@/routes/index.type'

type KunjunganPayload = yup.InferType<typeof kunjunganSchema>

export const Kunjungan = () => {
  const navigation = useNavigation()
  const { params: { phone, photo, visitorId, is_asn, uid } } = useRoute<RouteProp<RootStackParamList, 'Kunjungan'>>();

  const { t } = useTranslation(['visit', 'common'])

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const { data: dataPurpose } = useQuery({
    queryKey: ['purpose'],
    queryFn: () => getPurpose(),
  })

  const { mutateAsync: mutateAsyncKunjungan, isLoading: isLoadingKunjungan } = useMutation({
    mutationKey: ['kunjungan'],
    mutationFn: (body: PostKunjunganInterface) => postKunjungan(body),
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
        message: 'Kunjungan Berhasil Dibuat',
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
      console.log('[Kunjungan][Post Kunjungan] error', error);

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

  const formik = useFormik<KunjunganPayload>({
    initialValues: {
      phone: phone,
      keperluan: '',
      id_keperluan: '',
      photo: photo.path,
      visitorId: visitorId || ''
    },
    validationSchema: kunjunganSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise(async resolve => {
        try {
          mutateAsyncKunjungan({
            phone: values.phone,
            visitor_id: values.visitorId,
            id_keperluan: Number(formik.values.id_keperluan),
            keperluan: formik.values.keperluan,
            photo: formik.values.photo as string
          })
        } catch (error) {
          Toast.show({
            type: 'error',
            text2: (error as Error).message || 'Terjadi kesalahan',
          })
        } finally {
          resolve(true)
        }
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
                    label={t('visit:label.visitorType')}
                    value={is_asn === true ? 'ASN' : 'Non ASN'}
                  />
                </View>
                <View className='flex-1'>
                  <Infoplist
                    label={is_asn === true ? t('visit:label.nrk') : t('visit:label.nik')}
                    value={uid}
                  />
                </View>
              </View>
              <InputText
                label={t('visit:label.phone')}
                placeholder={t('visit:placeholder.phone')}
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                error={formik.errors.phone}
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
      <Loader isVisible={isLoadingKunjungan || formik.isSubmitting} />
    </>
  )
}
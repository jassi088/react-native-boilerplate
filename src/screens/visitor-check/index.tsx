import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation, useVisitorCheckUid } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import Toast from 'react-native-toast-message'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '@/routes/index.type'
import { visitorCheckSchema } from '@/yupSchemas/visitor-check'
import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung'

type VisitorCheckPayload = yup.InferType<typeof visitorCheckSchema>

export const VisitorCheck = () => {
  const { params: { photo } } = useRoute<RouteProp<RootStackParamList, 'VisitorCheck'>>();

  const navigation = useNavigation()
  const { t } = useTranslation(['visitorCheck', 'common'])

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const { mutateAsync: mutateAsyncVisitorCheckUid } = useVisitorCheckUid({
    onSuccess: (response) => {
      console.log('[VisitorCheck][Visitor Check] Response', response);

      if (!response.status) {
        return showModalConfirmation({
          isVisible: true,
          title: t('visitorCheck:alert.notRegistered.title'),
          message: t('visitorCheck:alert.notRegistered.message'),
          onConfirm: () => {
            closeModalConfirmation()
            formik.resetForm()
            navigation.navigate('Register', {
              is_asn: formik.values.visitorType === 'asn',
              uid: formik.values.uid,
              photo,
            })
          },
          onCancel: () => closeModalConfirmation()
        })
      }

      formik.resetForm()

      navigation.navigate('Menu', {
        is_asn: formik.values.visitorType === 'asn',
        uid: formik.values.uid,
        phone: response.data!.phone,
        visitorId: response.data!.visitorId,
        name: response.data!.name,
        photo,
      })
    },
    onError: (error) => {
      console.log('[VisitorCheck][Visitor Check] Error', error);

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
        title: t('visitorCheck:modalConfirmation.title'),
        message: t('visitorCheck:modalConfirmation.description'),
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

  const formik = useFormik<VisitorCheckPayload>({
    initialValues: {
      visitorType: '',
      uid: '',
    },
    validationSchema: visitorCheckSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise(async resolve => {
        try {
          await mutateAsyncVisitorCheckUid({
            is_asn: values.visitorType === 'asn',
            uid: values.uid,
            photo: photo.path
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

  return (
    <>
      <SafeAreaView className='flex-1 bg-gray-100'>
        <Header title={t('visitorCheck:title')} />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-4'>
              <Text
                label={t('visitorCheck:description')}
                textClassName='mb-5'
              />
              <View className="w-full h-64 mb-8 flex items-center justify-center">
                <Image
                  source={{ uri: 'file://' + photo.path }}
                  style={{ width: 240, height: 240 }}
                  className='rounded-lg'
                />
              </View>
              <InputSelect
                label={t('visitorCheck:label.visitorType')}
                placeholder={t('visitorCheck:placeholder.visitorType')}
                value={formik.values.visitorType}
                onChange={(data) => formik.setFieldValue('visitorType', data.value)}
                data={TIPE_PENGUNJUNG}
                error={formik.errors.visitorType}
                containerClassName='mb-4'
              />
              <InputText
                label={formik.values.visitorType === 'asn' ? t('visitorCheck:label.nrk') : t('visitorCheck:label.nik')}
                placeholder={formik.values.visitorType === 'asn' ? t('visitorCheck:placeholder.nrk') : t('visitorCheck:placeholder.nik')}
                value={formik.values.uid}
                onChangeText={formik.handleChange('uid')}
                error={formik.errors.uid}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
            </View>
          </ScrollView>
        </View>
        <View>
          <ActionButton
            primaryButtonLabel={t('visitorCheck:button.visitorCheck')}
            secondaryButtonLabel={t('visitorCheck:button.back')}
            onPrimaryButtonPress={() => formik.handleSubmit()}
            onSecondaryButtonPress={() => {
              const isDirty = formik.dirty
              if (isDirty) {
                return showModalConfirmation({
                  isVisible: true,
                  title: t('visitorCheck:modalConfirmation.title'),
                  message: t('visitorCheck:modalConfirmation.description'),
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
import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation, useRegister, useVisitorCheck } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import Toast from 'react-native-toast-message'
import { useBackHandler } from '@react-native-community/hooks'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '@/routes/index.type'
import { visitorCheckSchema } from '@/yupSchemas/visitor-check'

type VisitorCheckPayload = yup.InferType<typeof visitorCheckSchema>

export const VisitorCheck = () => {
  const { params: { photo } } = useRoute<RouteProp<RootStackParamList, 'VisitorCheck'>>();

  const navigation = useNavigation()
  const { t } = useTranslation(['visitorCheck', 'common'])

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const { mutateAsync: mutateAsyncVisitorCheck } = useVisitorCheck({
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
              phone: formik.values.no_hp,
              photo,
            })
          },
          onCancel: () => closeModalConfirmation()
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
      no_hp: '',
    },
    validationSchema: visitorCheckSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise(async resolve => {
        try {
          await mutateAsyncVisitorCheck({
            phone: values.no_hp,
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
              <InputText
                label={t('visitorCheck:label.phone')}
                placeholder={t('visitorCheck:placeholder.phone')}
                value={formik.values.no_hp}
                onChangeText={formik.handleChange('no_hp')}
                error={formik.errors.no_hp}
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
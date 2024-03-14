import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputSelect, InputText } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung'
import { useFormik } from 'formik'
import { kunjunganSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import { KEPERLUAN } from '@/constants/keperluan'
import Toast from 'react-native-toast-message'

type KunjunganPayload = yup.InferType<typeof kunjunganSchema>

export const Kunjungan = () => {
  const navigation = useNavigation()

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
              text1: 'Registrasi Gagal',
              text2: 'No. HP tidak terdaftar, silahkan registrasi terlebih dahulu'
            })
          } else {
            showModalAlert({
              isVisible: true,
              title: "Registrasi Berhasil",
              message: "Registrasi berhasil, Terima kasih.",
              variant: 'success',
              buttonText: 'Kembali',
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
        <Header title='Form Kunjungan' />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-5'>
              <Text label={"Mohon untuk tegak dengan wajah saat menghadap kamera"} textClassName='mb-5' />
              <InputCamera />
              <InputText
                label='No. HP'
                placeholder='Masukkan No. HP'
                value={formik.values.no_hp}
                onChangeText={formik.handleChange('no_hp')}
                error={formik.errors.no_hp}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputSelect
                label='Keperluan'
                placeholder='Pilih Keperluan'
                value={formik.values.keperluan}
                onChange={data => formik.setFieldValue('keperluan', data.value)}
                error={formik.errors.keperluan}
                data={KEPERLUAN}
              />
              {formik.values.keperluan === 'lainnya' && (
                <InputText
                  label='Keperluan (Lainnya)'
                  placeholder='Isi Keperluan'
                  value={formik.values.keperluan}
                  onChangeText={formik.handleChange('keperluan_lainnya')}
                  error={formik.errors.keperluan}
                />
              )}
            </View>
          </ScrollView>
        </View>
        <View className='pb-5'>
          <ActionButton
            primaryButtonLabel='Kunjungan'
            secondaryButtonLabel='Kembali'
            onPrimaryButtonPress={() => formik.handleSubmit()}
            onSecondaryButtonPress={() => showModalConfirmation({
              isVisible: true,
              title: "Batal Registrasi",
              message: "Apakah anda yakin ingin membatalkan registrasi?",
              onConfirm: () => {
                closeModalConfirmation()
                navigation.goBack()
              },
              onCancel: () => closeModalConfirmation()
            })}
          />
        </View>
      </SafeAreaView>
      <Loader isVisible={formik.isSubmitting} />
    </>
  )
}
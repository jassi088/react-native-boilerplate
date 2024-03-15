import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/atoms/text'
import { InputCamera, InputSelect, InputText, InputTime } from '@/components/atoms'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import { buatJanjiSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/atoms/loader'
import { Header } from '@/components/organism'
import { KEPERLUAN } from '@/constants/keperluan'
import Toast from 'react-native-toast-message'
import dayjs from 'dayjs'

type BuatJanjiPayload = yup.InferType<typeof buatJanjiSchema>

export const BuatJanji = () => {
  const navigation = useNavigation()

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const formik = useFormik<BuatJanjiPayload>({
    initialValues: {
      no_hp: '',
      no_hp_tujuan: '',
      keperluan: '',
      jam_mulai: '',
      jam_selesai: ''
    },
    validationSchema: buatJanjiSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (values.no_hp === '081226696696') {
            Toast.show({
              type: 'error',
              text1: 'Kunjungan Gagal',
              text2: 'No. HP tidak terdaftar, silahkan kunjungan terlebih dahulu'
            })
          } else {
            showModalAlert({
              isVisible: true,
              title: "Kunjungan Berhasil",
              message: "Kunjungan berhasil, Terima kasih.",
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
        <Header title='Form Buat Janji' />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-5'>
              <Text label={"Mohon untuk tegak dengan wajah saat menghadap kamera"} textClassName='mb-5' />
              <InputCamera />
              <InputText
                label='No. HP Anda'
                placeholder='Masukkan No. HP Anda'
                value={formik.values.no_hp}
                onChangeText={formik.handleChange('no_hp')}
                error={formik.errors.no_hp}
                containerClassName='mb-4'
                keyboardType='numeric'
              />
              <InputText
                label='No. HP Tujuan'
                placeholder='Masukkan No. HP Tujuan'
                value={formik.values.no_hp_tujuan}
                onChangeText={formik.handleChange('no_hp_tujuan')}
                error={formik.errors.no_hp_tujuan}
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
                containerClassName='mb-4'
              />
              {formik.values.keperluan === 'lainnya' && (
                <InputText
                  label='Keperluan (Lainnya)'
                  placeholder='Isi Keperluan'
                  value={formik.values.keperluan}
                  onChangeText={formik.handleChange('keperluan_lainnya')}
                  error={formik.errors.keperluan}
                  containerClassName='mb-4'
                />
              )}
              <View className='flex flex-row items-center'>
                <InputTime
                  label='Jam Mulai'
                  containerClassName='flex-1'
                  placeholder="Jam Mulai"
                  format='HH:mm'
                  value={formik.values.jam_mulai ? dayjs(formik.values.jam_mulai).toDate() : undefined}
                  onChange={value => formik.setFieldValue('jam_mulai', dayjs(value).toISOString())}
                  error={formik.errors.jam_mulai}
                />
                <View className='w-4' />
                <InputTime
                  label='Jam Selesai'
                  containerClassName='flex-1'
                  placeholder='Jam Selesai'
                  format='HH:mm'
                  value={formik.values.jam_selesai ? dayjs(formik.values.jam_selesai).toDate() : undefined}
                  onChange={value => formik.setFieldValue('jam_selesai', dayjs(value).toISOString())}
                  error={formik.errors.jam_selesai}
                />
              </View>
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
              title: "Batal Kunjungan",
              message: "Apakah anda yakin ingin membatalkan kunjungan?",
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
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { OrgHeader } from '@/components/organism'
import { Text } from '@/components/text'
import { InputCamera, InputSelect, InputText } from '@/components/form'
import { ActionButton } from '@/components/molecules'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TIPE_PENGUNJUNG } from '@/constants/tipe-pengunjung'
import { useFormik } from 'formik'
import { registerSchema } from '@/yupSchemas'
import * as yup from 'yup';
import { useModalAlert, useModalConfirmation } from '@/hooks'
import { Loader } from '@/components/loader'

type RegisterPayload = yup.InferType<typeof registerSchema>

export const Register = () => {
  const navigation = useNavigation()

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

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
            title: "Registrasi Berhasil",
            message: "Registrasi berhasil, Terima kasih.",
            variant: 'success',
            buttonText: 'Kembali',
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
        <OrgHeader title='Form Pendaftaran' />
        <View className='flex-1'>
          <ScrollView >
            <View className='p-5'>
              <Text label={"Mohon untuk tegak dengan wajah saat menghadap kamera"} textClassName='mb-5' />
              <InputCamera />
              <InputSelect
                label='Tipe Pengunjung'
                placeholder='Pilih Tipe Pengunjung'
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
                      label='NRK'
                      placeholder='Masukkan NRK'
                      value={formik.values.nrk as string}
                      onChangeText={formik.handleChange('nrk')}
                      error={formik.errors.nrk}
                      containerClassName='mb-4'
                      keyboardType="numeric"
                    />
                  )}
                  {formik.values.tipe_pengunjung === 'non-asn' && (
                    <InputText
                      label='NIK'
                      placeholder='Masukkan NIK'
                      value={formik.values.nik as string}
                      onChangeText={formik.handleChange('nik')}
                      error={formik.errors.nik}
                      containerClassName='mb-4'
                      keyboardType="numeric"
                    />
                  )}
                  <InputText
                    label='Nama'
                    placeholder='Masukkan nama'
                    value={formik.values.nama}
                    onChangeText={formik.handleChange('nama')}
                    error={formik.errors.nama}
                    containerClassName='mb-4'
                  />
                  <InputText
                    label='No. HP'
                    placeholder='Masukkan No. HP'
                    value={formik.values.no_hp}
                    onChangeText={formik.handleChange('no_hp')}
                    error={formik.errors.no_hp}
                    containerClassName='mb-4'
                    keyboardType='numeric'
                  />
                  <InputText
                    label='Email'
                    placeholder='Masukkan Email'
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    error={formik.errors.email}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <View className='pb-5'>
          <ActionButton
            primaryButtonLabel='Register'
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
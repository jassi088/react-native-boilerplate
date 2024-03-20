import { InputRadio, InputSelect, Text } from "@/components/atoms"
import { ActionButton, HeaderTime } from "@/components/molecules"
import { CAMERA_POSITION, ORIENTATION } from "@/constants/camera"
import { useCameraSetting, useModalConfirmation } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useFormik } from "formik"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as yup from 'yup';
import { settingSchema } from '../../yupSchemas';

type SettingPayload = yup.InferType<typeof settingSchema>

export const Setting = () => {
  const { showModalConfirmation, closeModalConfirmation } = useModalConfirmation()

  const navigation = useNavigation()

  const {
    cameraOrientation,
    cameraPosition,
    qrCodeCameraOrientation,
    qrCodeCameraPosition,
    setCameraOrientation,
    setCameraPosition,
    setQrCodeCameraOrientation,
    setQrCodeCameraPosition
  } = useCameraSetting()

  const formik = useFormik<SettingPayload>({
    initialValues: {
      cameraPosition: cameraPosition,
      orientation: cameraOrientation,
      cameraPositionQr: qrCodeCameraPosition,
      orientationQr: qrCodeCameraOrientation
    },
    validationSchema: settingSchema,
    onSubmit: (values) => {
      setCameraPosition(values.cameraPosition)
      setCameraOrientation(values.orientation)
      setQrCodeCameraPosition(values.cameraPositionQr)
      setQrCodeCameraOrientation(values.orientationQr)

      return navigation.goBack()
    }
  })

  return (
    <SafeAreaView className="flex-1">
      <HeaderTime />
      <View className="flex-1">
        <ScrollView className="p-4">
          <InputSelect
            label="Pilih Kamera"
            placeholder="Pilih Kamera"
            value={formik.values.cameraPosition}
            onChange={(data) => formik.setFieldValue("cameraPosition", data.value)}
            data={CAMERA_POSITION}
            containerClassName="mb-3"
            error={formik.errors.cameraPosition}
          />
          <InputRadio
            label="Rotasi Kamera"
            value={formik.values.orientation}
            onChange={(data) => formik.setFieldValue("orientation", data.value)}
            data={ORIENTATION}
            containerClassName="mb-3"
            error={formik.errors.orientation}
          />
          <InputSelect
            label="Pilih Kamera QRcode"
            placeholder="Pilih Kamera QRcode"
            value={formik.values.cameraPositionQr}
            onChange={(data) => formik.setFieldValue("cameraPositionQr", data.value)}
            data={CAMERA_POSITION}
            containerClassName="mb-3"
            error={formik.errors.cameraPositionQr}
          />
          <InputRadio
            label="Rotasi Kamera QRcode"
            value={formik.values.orientationQr}
            onChange={(data) => formik.setFieldValue("orientationQr", data.value)}
            data={ORIENTATION}
            containerClassName="mb-3"
            error={formik.errors.orientationQr}
          />
        </ScrollView>
      </View>
      <ActionButton
        primaryButtonLabel='Simpan'
        secondaryButtonLabel='Kembali'
        onPrimaryButtonPress={() => {
          return showModalConfirmation({
            isVisible: true,
            title: "Simpan Setting",
            message: "Apakah anda yakin ingin menyimpan setting?",
            onConfirm: () => {
              closeModalConfirmation()
              formik.handleSubmit()
            },
            onCancel: () => closeModalConfirmation()
          })
        }}
        onSecondaryButtonPress={() => {
          return showModalConfirmation({
            isVisible: true,
            title: "Batal Setting",
            message: "Apakah anda yakin ingin membatalkan setting?",
            onConfirm: () => {
              closeModalConfirmation()
              navigation.goBack()
            },
            onCancel: () => closeModalConfirmation()
          })
        }}
      />
    </SafeAreaView>
  )
}
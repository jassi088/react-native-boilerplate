import { Button } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useCameraSetting, useModalAlert } from "@/hooks"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Linking, View } from "react-native"
import Toast from "react-native-toast-message"
import { Camera, useCameraDevice, CameraDevice, useCameraPermission, CameraPermissionRequestResult, Frame, PhotoFile, useFrameProcessor } from "react-native-vision-camera"

export type InputCameraHandle = {
  takePhoto: () => Promise<{
    photo: PhotoFile
    faceDetection: {
      message: string | undefined,
      isFaceDetected: boolean
      totalFaceDetected: number
    }
  }>
}
export const InputCamera = forwardRef<InputCameraHandle>((_, ref) => {
  const [message, setMessage] = useState<undefined | {
    color: string
    message: string
  }>(undefined)

  const { t } = useTranslation(['input'])
  const cameraRef = useRef<Camera>(null)

  const { cameraPosition, cameraOrientation } = useCameraSetting()

  const { hasPermission, requestPermission } = useCameraPermission()
  const { showModalAlert, closeModalAlert } = useModalAlert()

  const device: CameraDevice | undefined = useCameraDevice(cameraPosition)

  const getPermission = async () => {
    try {
      const _hasPermission = await requestPermission()
      if (!_hasPermission) {
        showModalAlert({
          isVisible: true,
          title: "Izin Kamera Dibutuhkan",
          message: "Aplikasi membutuhkan izin kamera untuk dapat mengakses fitur ini.",
          variant: 'warning',
          onPress: () => closeModalAlert()
        })
      }
    } catch (error) {
      showModalAlert({
        isVisible: true,
        title: "Gagal Meminta Izin Kamera",
        message: (error as Error).message || "Terjadi kesalahan saat meminta izin kamera",
        variant: 'error',
        onPress: () => closeModalAlert()
      })
    }
  }

  const takePhoto = async (): Promise<{
    photo: PhotoFile
    faceDetection: {
      message: string | undefined,
      isFaceDetected: boolean
      totalFaceDetected: number
    }
  }> => {
    const photo = await cameraRef.current?.takePhoto()

    return {
      photo: photo as PhotoFile,
      faceDetection: {
        // message: message?.message || undefined,
        // isFaceDetected: message?.color === colors.green[500],
        // totalFaceDetected: message?.color === colors.green[500] ? 1 : 0,
        // TODO: FIX THIS WITH FACE DETECTION
        message: undefined,
        isFaceDetected: true,
        totalFaceDetected: 1
      }
    }
  }

  useEffect(() => {
    if (!hasPermission) getPermission()
  }, [hasPermission])

  useImperativeHandle(ref, () => ({
    takePhoto
  }), [takePhoto])


  if (!device || !hasPermission) {
    return (
      <View className="flex items-center justify-center flex-1 h-full mb-12">
        <View className="w-64 h-64 p-4 rounded-md flex items-center justify-center bg-gray-300">
          <Text
            label={t('input:camera.noPermission')}
            variant="large"
            textAlign="center"
            textClassName="mb-4"
          />
          <Button
            label={t('input:camera.openSettings')}
            variant="secondary"
            size="small"
            onPress={() => {
              Linking.openSettings()
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <View className="flex items-center justify-center flex-1 h-full">
      <View className="rounded">
        <Camera
          // @ts-ignore
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          className="w-64 h-64 rounded-md"
          orientation={cameraOrientation}
          onError={(error) => Toast.show({
            type: 'error',
            text1: 'Something went wrong on Camera!',
            text2: error.message
          })}
        />
      </View>
      {message && (
        <Text
          label={message.message}
          color={message.color}
          textAlign="center"
          className="mt-3"
          variant="large"
        />
      )}
    </View>
  )
})
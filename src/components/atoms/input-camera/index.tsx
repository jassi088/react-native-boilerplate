import { Button } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useCameraSetting, useModalAlert } from "@/hooks"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Linking, View } from "react-native"
import Toast from "react-native-toast-message"
import { Camera, useCameraDevice, CameraDevice, useCameraPermission, CameraPermissionRequestResult, Frame, PhotoFile, useFrameProcessor } from "react-native-vision-camera"
import {
  Face,
  useFaceDetector,
  FaceDetectionOptions
} from 'react-native-vision-camera-face-detector'
import { Worklets } from 'react-native-worklets-core'
import colors from "tailwindcss/colors"

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
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: 'accurate',
    minFaceSize: 0.7
  }).current

  const { detectFaces } = useFaceDetector(faceDetectionOptions)

  const [description, setDescription] = useState<undefined | {
    color: string
    message: string,
    totalFaceDetected: number
  }>(undefined)

  const { t } = useTranslation(['input'])
  const cameraRef = useRef<Camera>(null)

  const { cameraPosition, cameraOrientation } = useCameraSetting()

  const { hasPermission, requestPermission } = useCameraPermission()
  const { showModalAlert, closeModalAlert } = useModalAlert()

  const device: CameraDevice | undefined = useCameraDevice(cameraPosition)

  const handleDetectedFaces = Worklets.createRunOnJS((
    faces: Face[]
  ) => {
    if (faces.length === 0) {
      setDescription({
        color: colors.red[500],
        message: t('common:camera.noFaces'),
        totalFaceDetected: 0
      })
    }

    if (faces.length > 1) {
      setDescription({
        color: colors.red[500],
        message: t('common:camera.tooManyFaces'),
        totalFaceDetected: faces.length
      })
    }

    if (faces.length === 1) {
      setDescription({
        color: colors.green[500],
        message: t('common:camera.faceDetected'),
        totalFaceDetected: faces.length
      })
    }
  })


  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const faces = detectFaces(frame)
    handleDetectedFaces(faces)
  }, [handleDetectedFaces])

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
        message: description?.message || undefined,
        isFaceDetected: description && description?.totalFaceDetected > 0 || false,
        totalFaceDetected: description?.totalFaceDetected || 0
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
        <View className="w-52 h-52 p-4 rounded-md flex items-center justify-center bg-gray-300">
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
      <View className="rounded relative bg-yellow-500">
        <View className="w-[216px] h-[216px] absolute top-[-4px] left-[-4px] bg-transparent z-10 border-4 border-gray-100 rounded-xl" />
        <Camera
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          className="w-52 h-52 rounded-lg"
          orientation={cameraOrientation}
          onError={(error) => Toast.show({
            type: 'error',
            text1: 'Something went wrong on Camera!',
            text2: error.message
          })}
          frameProcessor={frameProcessor}
        />
      </View>
      {description && (
        <Text
          label={description.message}
          color={description.color}
          textAlign="center"
          className="mt-3"
        />
      )}
    </View>
  )
})
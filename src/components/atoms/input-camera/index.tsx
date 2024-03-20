import { Button } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useCameraSetting, useModalAlert } from "@/hooks"
import { useEffect, useRef } from "react"
import { Linking, View } from "react-native"
import Toast from "react-native-toast-message"
import { Camera, useCameraDevice, CameraDevice, useCameraPermission, CameraPermissionRequestResult } from "react-native-vision-camera"

export const InputCamera = () => {

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

  useEffect(() => {
    if (!hasPermission) getPermission()
  }, [hasPermission])

  if (!device || !hasPermission) {
    return (
      <View className="flex items-center justify-center flex-1 h-full mb-12">
        <View className="w-64 h-64 p-4 rounded-md flex items-center justify-center bg-gray-300">
          <Text
            label="Izinkan Kamera terlebih dahulu di Settings"
            variant="large"
            textAlign="center"
            textClassName="mb-4"
          />
          <Button
            label="Buka Setting"
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
      <View className="rounded mb-12">
        <Camera
          ref={cameraRef}
          device={device}
          isActive={true}
          className="w-64 h-64 rounded-md"
          orientation={cameraOrientation}
          onError={(error) => Toast.show({
            type: 'error',
            text1: 'Something went wrong on Camera!',
            text2: error.message
          })}
        />
      </View>
    </View>
  )
}
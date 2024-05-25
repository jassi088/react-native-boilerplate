import { Button, InputCamera, InputCameraHandle, LanguageSwitcher, Loader, Text } from "@/components/atoms"
import { HeaderTime } from "@/components/molecules"
import { useModalAlert, useRegister, useVisitorCheck } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useWindowDimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

export const Home = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(["menu"])
  const cameraRef = useRef<InputCameraHandle>(null)

  const { width } = useWindowDimensions()

  const { showModalAlert, closeModalAlert } = useModalAlert()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleStart = async () => {
    try {
      setIsLoading(true)
      const photo = await cameraRef.current?.takePhoto()

      if (!photo?.faceDetection.isFaceDetected) {
        return showModalAlert({
          isVisible: true,
          title: t('common:camera.failed'),
          message: t('common:camera.noFaces'),
          variant: 'error',
          buttonText: t('common:button.back'),
          onPress: () => closeModalAlert()
        })
      }

      if (photo.faceDetection.totalFaceDetected > 1) {
        return showModalAlert({
          isVisible: true,
          title: t('common:camera.failed'),
          message: t('common:camera.tooManyFaces'),
          variant: 'error',
          buttonText: t('common:button.back'),
          onPress: () => closeModalAlert()
        })
      }

      navigation.navigate('VisitorCheck', {
        photo: photo.photo
      })
    } catch (error) {
      console.log('[Home][Error]', error)
      Toast.show({
        type: 'error',
        text1: t('common:camera.failed'),
        text2: (error as Error).message,
        position: 'bottom',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const cameraWidth = width * 0.7

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <HeaderTime />
      <View className="space-y-5 p-4 flex-1 justify-center items-center">
        <View className="w-full h-64 mb-4">
          <InputCamera ref={cameraRef} height={cameraWidth} width={cameraWidth} />
        </View>
        <View className="mb-10">
          <Text
            label={t('register:description')}
            textClassName='mb-5'
            textAlign="center"
            fontWeight="semi-bold"
          />
        </View>
        <View className="w-full">
          <Button
            label={t('common:label.start')}
            variant="background"
            onPress={handleStart}
          />
        </View>
      </View>
      <LanguageSwitcher />
      <Loader isVisible={isLoading} />
    </SafeAreaView>
  )
}
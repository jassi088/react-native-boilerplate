import { BaseVariant } from "@/types"
import { iconBackgroundMapper, iconColorMapper, iconVariantMapper } from "@/utils"
import { View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Text } from "../text";
import colors from "tailwindcss/colors";
import { ToastConfigParams } from "react-native-toast-message";

export interface BaseToastProps {
  type: BaseVariant
  text1: string | undefined
  text2: string | undefined
}

export const toastConfig: Record<BaseVariant, (params: ToastConfigParams<any> & { type: BaseVariant }) => React.ReactNode> = {
  success: (props) => (
    <BaseToast {...props as BaseToastProps} />
  ),
  error: (props) => (
    <BaseToast {...props as BaseToastProps} />
  ),
  info: (props) => (
    <BaseToast {...props as BaseToastProps} />
  ),
  warning: (props) => (
    <BaseToast {...props as BaseToastProps} />
  ),
};

export const BaseToast = (props: BaseToastProps) => {
  const { type, text1, text2 } = props

  return (
    <View
      className="absolute top-[5%] left-[4%] px-12 w-[92%] p-3 rounded-md flex flex-row items-center"
      style={{
        backgroundColor: iconBackgroundMapper[type as BaseVariant],
      }}
    >
      <View className="pr-2">
        <FontAwesome6 name={iconVariantMapper[type as BaseVariant]} color={iconColorMapper[type as BaseVariant]} size={24} />
      </View>
      <View className="space-y-1 relative flex-1">
        <Text label={text1} variant="large" fontWeight="semi-bold" color={colors.white} />
        <Text label={text2} color={colors.white} />
      </View>
    </View>
  )
}
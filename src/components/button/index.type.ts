import { FontWeightType, TextVariantType } from "../text/index.type";

export type ButtonSizeType = 'small' | 'regular';
export type ButtonVariantType = | 'background' | 'secondary';

export interface ButtonIconInterface {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  iconColor?: string;
  size?: string;
}
export interface ButtonIconProps extends ButtonIconInterface {
  children: React.ReactNode;
}

export interface ButtonVariantInterface extends ButtonIconInterface {
  onPress: () => void;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
  label: string;
  disabled?: boolean;
  size?: ButtonSizeType;
  fontWeight?: FontWeightType;
  fontSize?: TextVariantType;
  fontColor?: string;
  iconSize?: string;
  width?: number;
  height?: number;
  containerClassName?: string;
  textClassName?: string;
}

export interface ButtonBaseProps {
  backgroundColor: string;
  borderWidth?: number;
  size?: ButtonSizeType;
  borderColor?: string;
  width?: number | string;
  height?: number;
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  containerClassName?: string;
}

export interface ButtonInterface extends ButtonVariantInterface {
  variant: ButtonVariantType;
}
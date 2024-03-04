import {ReactElement} from 'react'
import {TextProps as RNTextProps} from 'react-native'

export type FontFamilyType =
  | 'Inter-ExtraBold'
  | 'Inter-Bold'
  | 'Inter-SemiBold'
  | 'Inter-Regular'
  | 'Inter-Light'
  | 'Inter-Thin'

export type FontWeightType =
  | 'extra-bold'
  | 'bold'
  | 'semi-bold'
  | 'regular'
  | 'light'
  | 'thin'
export type TextAlignType = 'left' | 'center' | 'right' | 'justify'
export type TextDecorationType = 'underline' | 'none' | 'line-through'
export type TextTransformType =
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
export type TextVariantType =
  | 'ultra-large'
  | 'extra-large'
  | 'extra-larger'
  | 'large'
  | 'medium'
  | 'small'
  | 'extra-small'

export type FontStyleType = 'normal' | 'italic'

export interface TextStyleProps {
  fontWeight?: FontWeightType
  color?: string
  variant?: TextVariantType
  textAlign?: TextAlignType
  textTransform?: TextTransformType
  textDecoration?: TextDecorationType
  fontStyle?: FontStyleType
  textClassName?: string
}

export interface TextProps extends TextStyleProps, RNTextProps {
  label: string | ReactElement | null | undefined
}

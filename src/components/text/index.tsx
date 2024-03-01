import React from 'react';
import { Text as RNText } from 'react-native';
import { PixelRatio } from 'react-native'

import { FontFamilyType, FontWeightType, TextProps, TextVariantType } from './index.type';
import { cn } from '@/utils';

type TextFontSizeType = '24px' | '20px' | '18px' | '16px' | '14px' | '12px' | '10px';

export const fontFamilyMapper: Record<FontWeightType, FontFamilyType> = {
  'extra-bold': 'Inter-ExtraBold',
  bold: 'Inter-Bold',
  'semi-bold': 'Inter-SemiBold',
  regular: 'Inter-Regular',
  light: 'Inter-Light',
  thin: 'Inter-Thin'
};

const fontSizeMapper: Record<TextVariantType, TextFontSizeType> = {
  'ultra-large': 24,
  'extra-larger': 20,
  'extra-large': 18,
  large: 16,
  medium: 14,
  small: 12,
  'extra-small': 10
};

// const StyledText = styled(RNText) <TextProps>`
//   font-family: ${(props) => fontFamilyMapper[props.fontWeight || 'regular']};
//   font-size: ${(props) => fontSizeMapper[props.variant || 'medium']};
//   font-style: ${({ fontStyle = 'normal' }) => fontStyle};
//   text-align: ${({ textAlign }) => textAlign || 'left'};
//   text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
//   text-transform: ${({ textTransform }) => textTransform || 'none'};
// `;

export const Text = (props: TextProps) => {
  const { variant = 'medium', fontWeight = 'regular', color, className = '', ...rest } = props;
  const fontScale = PixelRatio.getFontScale();

  return (
    <RNText allowFontScaling={false}  {...props} className={cn('text-red-600', className)} style={{
      fontFamily: fontFamilyMapper[fontWeight],
      fontSize: fontSizeMapper[variant] / fontScale,
      textAlign: props.textAlign || 'left',
      textTransform: props.textTransform || 'none',
    }}>
      {props.label}
    </RNText >
  );
};


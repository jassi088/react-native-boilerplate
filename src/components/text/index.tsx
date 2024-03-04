import React from 'react';
import { Text as RNText } from 'react-native';
import { PixelRatio } from 'react-native'

import { FontFamilyType, FontWeightType, TextFontSizeType, TextProps, TextVariantType } from './index.type';
import { cn } from '@/utils';
import colors from 'tailwindcss/colors';

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

export const Text = (props: TextProps) => {
  const { variant = 'medium', fontWeight = 'regular', color, textClassName = '', ...rest } = props;

  const fontScale = PixelRatio.getFontScale();

  return (
    <RNText
      allowFontScaling={false}
      className={cn('text-slate-700', textClassName)} style={{
        fontFamily: fontFamilyMapper[fontWeight],
        fontSize: fontSizeMapper[variant] / fontScale,
        textAlign: props.textAlign || 'left',
        textTransform: props.textTransform || 'none',
        color: color ?? colors.gray[600],
      }}
      {...rest}
    >
      {props.label}
    </RNText >
  );
};


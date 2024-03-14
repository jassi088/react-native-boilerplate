import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

import { FontFamilyType, FontWeightType, TextFontSizeType, TextProps, TextVariantType } from './index.type';
import { cn, getFontSizeByScale } from '@/utils';
import colors from 'tailwindcss/colors';

export const fontFamilyMapper: Record<FontWeightType, FontFamilyType> = {
  'extra-bold': 'Inter-ExtraBold',
  bold: 'Inter-Bold',
  'semi-bold': 'Inter-SemiBold',
  regular: 'Inter-Regular',
  light: 'Inter-Light',
  thin: 'Inter-Thin'
};

export const fontSizeMapper: Record<TextVariantType, TextFontSizeType> = {
  'ultra-large': 24,
  'extra-larger': 20,
  'extra-large': 18,
  large: 16,
  medium: 14,
  small: 12,
  'extra-small': 10
};

export const Text = (props: TextProps) => {
  const { variant = 'medium', fontWeight = 'regular', color, textAlign, textClassName = '', ...rest } = props;

  return (
    <RNText
      {...rest}
      allowFontScaling={false}
      className={cn('text-gray-700', textClassName)}
      style={
        [
          {
            fontFamily: fontFamilyMapper[fontWeight],
            fontSize: getFontSizeByScale(fontSizeMapper['medium']),
            textAlign: textAlign || 'left',
            textTransform: props.textTransform || 'none',
            color: color ?? colors.gray[600],
          },
          ...(rest.style ? rest.style as [TextStyle] : [])
        ]
      }
    >
      {props.label}
    </RNText >
  );
};


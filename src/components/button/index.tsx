import { Text } from '../text/index';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { cn } from '@/utils';
import { ButtonBaseProps, ButtonIconProps, ButtonInterface, ButtonSizeType, ButtonVariantInterface, ButtonVariantType } from './index.type';


const buttonSizeMapper: Record<ButtonSizeType, string> = {
  small: 'py-2 px-4',
  regular: 'py-3 px-6'
};

const ButtonIcon = ({ leftIcon, rightIcon, children, }: ButtonIconProps) => {
  return (
    <>
      {leftIcon && <View className='mr-1'>{leftIcon}</View>}
      <View style={{ marginHorizontal: leftIcon || rightIcon ? 4 : 0 }}>{children}</View>
      {rightIcon && <View className='ml-1'>{rightIcon}</View>}
    </>
  );
};


const ButtonBase = (props: ButtonBaseProps) => {
  const { backgroundColor, borderWidth, size = 'regular', borderColor, width, height, children, onPress, disabled = false, containerClassName } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      style={{
        borderWidth: borderWidth ?? 0,
        borderColor: borderColor ?? colors.gray[400],
        backgroundColor: backgroundColor,
        ...height ? { height: Number(height) } : {},
        ...width ? { width: Number(width) } : {},
      }}
      className={cn('flex items-center justify-center flex-row rounded-md', !height || !width ? buttonSizeMapper[size] : '', containerClassName)}
    >
      {children}
    </TouchableOpacity>
  )
}

const ButtonBackground = (props: ButtonVariantInterface) => {
  const {
    onPress,
    color = colors.blue[600],
    fontWeight,
    fontSize,
    label,
    iconSize,
    leftIcon,
    rightIcon,
    iconColor,
    disabled = false,
    height,
    size,
    width,
    containerClassName,
    textClassName
  } = props

  return (
    <ButtonBase
      size={size}
      onPress={disabled ? () => undefined : onPress}
      disabled={disabled}
      backgroundColor={color}
      height={height}
      width={width}
      containerClassName={cn(containerClassName, disabled ? 'opacity-50' : '')}
    >
      <ButtonIcon leftIcon={leftIcon} rightIcon={rightIcon} iconColor={iconColor} size={iconSize}>
        <Text
          label={label}
          fontWeight={fontWeight || 'bold'}
          variant={fontSize ? fontSize : size === 'small' ? 'small' : 'medium'}
          color={colors.white}
          textClassName={textClassName}
        />
      </ButtonIcon>
    </ButtonBase>
  )
};

const ButtonSecondary = (props: ButtonVariantInterface) => {
  const {
    onPress,
    color = colors.blue[600],
    fontWeight,
    fontSize,
    label,
    iconSize,
    leftIcon,
    rightIcon,
    iconColor,
    disabled = false,
    height,
    size,
    width,
    containerClassName,
    textClassName
  } = props

  return (
    <ButtonBase
      size={size}
      onPress={disabled ? () => undefined : onPress}
      disabled={disabled}
      backgroundColor={colors.transparent}
      height={height}
      width={width}
      borderWidth={1}
      borderColor={color}
      containerClassName={containerClassName}
    >
      <ButtonIcon leftIcon={leftIcon} rightIcon={rightIcon} iconColor={iconColor} size={iconSize}>
        <Text
          label={label}
          fontWeight={fontWeight || 'bold'}
          variant={fontSize ? fontSize : size === 'small' ? 'small' : 'medium'}
          color={color}
          textClassName={cn(textClassName, disabled ? 'opacity-50' : '')}
        />
      </ButtonIcon>
    </ButtonBase>
  )
};

export const Button = (props: ButtonInterface) => {
  const buttonVariantMapper: Record<ButtonVariantType, JSX.Element> = {
    background: <ButtonBackground {...props} />,
    secondary: <ButtonSecondary {...props} />
  };

  return buttonVariantMapper[props.variant];
};

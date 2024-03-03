import { Icon, IconType } from '@/components/Icon';
import { Text } from '@/components/text';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import colors from 'styles/colors';

import type { FontWeightType, TextVariantType } from '@/components/text/index.type';

interface ButtonIconInterface {
  leftIcon?: IconType;
  rightIcon?: IconType;
  iconColor?: string;
  size?: string;
}
interface ButtonProps extends ButtonIconInterface {
  children: React.ReactNode;
}

const ButtonIcon = ({ leftIcon, rightIcon, iconColor, children, size }: ButtonProps) => {
  return (
    <>
      {leftIcon && <Icon name={leftIcon} size={size || '18px'} color={iconColor} />}
      <View style={{ marginHorizontal: leftIcon || rightIcon ? 4 : 0 }}>{children}</View>
      {rightIcon && <Icon name={rightIcon} size={size || '18px'} color={iconColor} />}
    </>
  );
};

type ButtonSizeType = 'small' | 'regular';

interface ButtonBaseInterface extends ButtonIconInterface {
  onPress: () => void;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
  label: string;
  isDisable?: boolean;
  size?: ButtonSizeType;
  fontWeight?: FontWeightType;
  fontSize?: TextVariantType;
  fontColor?: string;
  iconSize?: string;
  width?: number | string;
  height?: number;
}

interface ButtonStyledProps {
  backgroundColor: string;
  borderWidth?: string;
  size?: ButtonSizeType;
  borderColor?: string;
  width?: number | string;
  height?: number;
}

const buttonSizeMapper: Record<ButtonSizeType, string> = {
  small: '8px 16px',
  regular: '12px 24px'
};

const ButtonStyled = styled(TouchableOpacity)<ButtonStyledProps>`
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  border-color: ${({ borderColor = colors.dark.blackCoral }) => borderColor};
  border-radius: 4px;
  border-width: ${(props) => props.borderWidth ?? '0px'};
  flex-direction: row;
  justify-content: center;
  padding: ${(props) =>
    props.height || props.width ? '0px' : buttonSizeMapper[props.size ?? 'regular']};
  ${(props) => props.width && { width: props.width }};
  ${(props) => props.height && { height: props.height }};
`;

const ButtonPlain = ({
  onPress,
  borderColor,
  fontColor,
  fontWeight,
  fontSize,
  iconSize,
  label,
  leftIcon,
  rightIcon,
  iconColor,
  isDisable,
  height,
  size,
  backgroundColor,
  width
}: ButtonBaseInterface) => (
  <ButtonStyled
    onPress={isDisable ? undefined : onPress}
    borderWidth="1px"
    borderColor={borderColor}
    backgroundColor={backgroundColor ?? colors.light.white}
    size={size}
    width={width}
    height={height}
  >
    <ButtonIcon leftIcon={leftIcon} rightIcon={rightIcon} iconColor={iconColor} size={iconSize}>
      <Text
        label={label}
        fontWeight={fontWeight || 'bold'}
        variant={fontSize ? fontSize : size === 'small' ? 'small' : 'medium'}
        color={isDisable ? '#f3f3f3' : fontColor ? fontColor : colors.dark.gumbo}
      />
    </ButtonIcon>
  </ButtonStyled>
);

const ButtonBackground = ({
  onPress,
  color,
  fontWeight,
  fontSize,
  iconSize,
  label,
  leftIcon,
  rightIcon,
  iconColor,
  isDisable,
  height,
  size,
  width
}: ButtonBaseInterface) => (
  <ButtonStyled
    size={size}
    onPress={isDisable ? undefined : onPress}
    disabled={isDisable}
    backgroundColor={isDisable ? colors.light.whiteSmoke : color || colors.primary.americaRed}
    height={height}
    width={width}
    borderWidth={isDisable ? '1px' : '0px'}
  >
    <ButtonIcon leftIcon={leftIcon} rightIcon={rightIcon} iconColor={iconColor} size={iconSize}>
      <Text
        label={label}
        fontWeight={fontWeight || 'bold'}
        variant={fontSize ? fontSize : size === 'small' ? 'small' : 'medium'}
        color={isDisable ? colors.dark.bermudaGrey : colors.light.white}
      />
    </ButtonIcon>
  </ButtonStyled>
);

const ButtonSecondary = ({
  onPress,
  color,
  fontSize,
  fontWeight,
  iconSize,
  label,
  leftIcon,
  rightIcon,
  iconColor,
  isDisable,
  height,
  size,
  width
}: ButtonBaseInterface) => (
  <ButtonStyled
    borderColor={colors.dark.bermudaGrey}
    borderWidth="1px"
    size={size}
    onPress={isDisable ? undefined : onPress}
    disabled={isDisable}
    backgroundColor={isDisable ? colors.dark.bermudaGrey : color || colors.light.white}
    height={height}
    width={width}
  >
    <ButtonIcon leftIcon={leftIcon} rightIcon={rightIcon} iconColor={iconColor} size={iconSize}>
      <Text
        label={label}
        fontWeight={fontWeight || 'bold'}
        variant={fontSize ? fontSize : size === 'small' ? 'small' : 'medium'}
        color={isDisable ? '#f3f3f3' : colors.dark.bermudaGrey}
      />
    </ButtonIcon>
  </ButtonStyled>
);

type ButtonVariantType = 'plain' | 'background' | 'secondary';

interface ButtonInterface extends ButtonBaseInterface {
  variant: ButtonVariantType;
}

export const Button = (props: ButtonInterface) => {
  const buttonVariantMapper: Record<ButtonVariantType, JSX.Element> = {
    plain: <ButtonPlain {...props} />,
    background: <ButtonBackground {...props} />,
    secondary: <ButtonSecondary {...props} />
  };

  return buttonVariantMapper[props.variant];
};

import { KeyboardType, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export interface InputTextInterface {
  value: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  isNumerical?: boolean;
  isTextArea?: boolean;
  placeholder?: string;
  numberOfLines?: number;
  maxLength?: number;
  isDisabled?: boolean;
  error?: string | undefined;
  isSecureTextEntry?: boolean;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  isFocus?: boolean;
  onDelete?: (() => void) | null;
  maxHeightTextArea?: number;
  label?: string;
  containerClassName?: string;
  keyboardType?: KeyboardType;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean;
}

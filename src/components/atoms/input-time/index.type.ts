export type TimeFormatType = 'HH:mm:ss' | 'HH:mm' | 'mm:ss' | 'HH' | 'mm' | 'ss';

export interface InputTimeInterface {
  value: Date | undefined;
  onChange: (time: Date) => void;
  placeholder?: string;
  isDisabled?: boolean;
  error?: string | undefined;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  onDelete?: (() => void) | null;
  label?: string;
  containerClassName?: string;
  format: TimeFormatType;
  is24Hour?: boolean;
}

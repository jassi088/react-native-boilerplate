export interface InputRadioInterface {
  value: string | number;
  onChange: (data: InputRadioData) => void;
  data: InputRadioData[];
  isDisabled?: boolean;
  error?: string | undefined;
  label?: string;
  containerClassName?: string;
}

export interface InputRadioData {
  label: string | number;
  value: string | number;
}

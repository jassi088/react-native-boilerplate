export interface InputSelectInterface {
  value: string;
  onChange: (data: InputSelectData) => void;
  data: InputSelectData[];
  placeholder?: string;
  isDisabled?: boolean;
  error?: string | undefined;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  onDelete?: (() => void) | null;
  label?: string;
  containerClassName?: string;
  enableSearch?: boolean;
  onSheetChanges?: (index: number) => void;
  searchPlaceholder?: string;
  saveButtonLabel?: string;
  cancelButtonLabel?: string;
}

export interface InputSelectData {
  label: string | number;
  value: string | number;
}

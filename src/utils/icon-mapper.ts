import { BaseVariant } from '@/types';
import colors from 'tailwindcss/colors';

// FontAwesome6
export const iconVariantMapper: Record<BaseVariant, string> = {
  success: 'circle-check',
  error: 'circle-xmark',
  warning: 'circle-exclamation',
  info: 'circle-info'
};

export const iconColorMapper: Record<BaseVariant, string> = {
  success: colors.green[500],
  error: colors.red[500],
  warning: colors.yellow[500],
  info: colors.blue[500]
};

export const iconBackgroundMapper: Record<BaseVariant, string> = {
  success: colors.green[600],
  error: colors.red[600],
  warning: colors.yellow[600],
  info: colors.blue[600]
};

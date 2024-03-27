import 'react-i18next';
import { EnAppointment, EnCommon, EnInput, EnMenu, EnRegister, EnSetting, EnVisit } from '@/locales/en';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: undefined;

    resources: {
      register: typeof EnRegister;
      menu: typeof EnMenu;
      appointment: typeof EnAppointment;
      setting: typeof EnSetting;
      visit: typeof EnVisit;
      input: typeof EnInput;
      bahasa: typeof EnCommon;
    };
  }
}

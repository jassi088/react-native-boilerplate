import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EnAppointment, EnCommon, EnInput, EnMenu, EnRegister, EnSetting, EnVisit, EnVisitorCheck } from '@/locales/en';
import {
  BahasaAppointment,
  BahasaCommon,
  BahasaInput,
  BahasaMenu,
  BahasaRegister,
  BahasaSetting,
  BahasaVisit,
  BahasaVisitorCheck
} from '@/locales/id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/constants/storage-key';

export type LanguageType = 'en' | 'id';

export const useI18n = () => {
  const getCurrentLanguage = async (): Promise<LanguageType> => {
    return ((await AsyncStorage.getItem(STORAGE_KEY.LANGUAGE)) as LanguageType) ?? 'id';
  };

  const changeLanguage = async (to: LanguageType) => {
    if (i18n.isInitialized) {
      i18n.changeLanguage(to);
      await AsyncStorage.setItem(STORAGE_KEY.LANGUAGE, to);
    }
  };

  const englishResources = {
    appointment: EnAppointment,
    visit: EnVisit,
    register: EnRegister,
    menu: EnMenu,
    setting: EnSetting,
    input: EnInput,
    common: EnCommon,
    visitorCheck: EnVisitorCheck
  };

  const bahasaResources = {
    appointment: BahasaAppointment,
    visit: BahasaVisit,
    register: BahasaRegister,
    menu: BahasaMenu,
    setting: BahasaSetting,
    input: BahasaInput,
    common: BahasaCommon,
    visitorCheck: BahasaVisitorCheck
  };

  const resources = {
    en: englishResources,
    id: bahasaResources
  };

  const init = async () => {
    const config: InitOptions = {
      resources,
      lng: await getCurrentLanguage(),
      fallbackLng: 'id',
      ns: ['appointment', 'visit', 'register', 'menu', 'setting', 'input']
    };

    i18n.use(initReactI18next).init(config);
  };

  return { i18n, init, changeLanguage };
};

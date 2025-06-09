import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocales} from 'expo-localization';

import en from '../translations/en';
import hi from '../translations/hi';

const resources = {
  en,
  hi
};

const LANG_CODES = Object.keys(resources);

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // Get stored language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        return callback(savedLanguage);
      }

      // Get device language using Expo Localization
      const deviceLocale = getLocales().languageCode;
      const supportedLanguage = LANG_CODES.includes(deviceLocale) ? deviceLocale : 'en';
      
      callback(supportedLanguage);
    } catch (error) {
      console.log('Error reading language', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Error saving language', error);
    }
  }
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/locales/en/global.json';
import ar from './src/locales/ar/global.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
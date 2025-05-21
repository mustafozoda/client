import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './en/common.json';
import huCommon from './hu/common.json';
import enOverview from './en/overview.json';
import huOverview from './hu/overview.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        overview: enOverview
      },
      hu: {
        common: huCommon,
        overview: huOverview
      }
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['common', 'overview'], // <--- add this
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

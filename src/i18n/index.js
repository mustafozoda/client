import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './en/common.json';
import huCommon from './hu/common.json';
import enOverview from './en/overview.json';
import huOverview from './hu/overview.json';
import tasksPageEn from './en/tasksPage.json';
import tasksPageHu from './hu/tasksPage.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        overview: enOverview,
        tasksPage: tasksPageEn,
      },
      hu: {
        common: huCommon,
        overview: huOverview,
        tasksPage: tasksPageHu,
      }
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['common', 'overview', 'tasksPage'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

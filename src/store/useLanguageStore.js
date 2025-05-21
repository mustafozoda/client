import { create } from 'zustand';
import i18n from '../i18n';

export const useLanguageStore = create((set) => ({
  language: 'en',
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  }
}));

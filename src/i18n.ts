import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import el from './locales/el.json';

const resources = {
  en: { translation: en },
  el: { translation: el }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: '.',
    nsSeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

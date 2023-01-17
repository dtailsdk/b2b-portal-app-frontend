import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from "../translations/en/translations.json"
import da from "../translations/da/translations.json"

i18n
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next - for all options see: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: en
      },
      da: {
        translation: da
      },
    }
  })

export default i18n
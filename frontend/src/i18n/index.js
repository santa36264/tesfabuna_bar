import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import am from './locales/am.js'

const savedLocale = localStorage.getItem('locale') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, am },
})

export default i18n

import { createI18n } from 'vue-i18n'

import en from './en.json'
import ru from './ru.json'

const localeStorage = localStorage.getItem('lang')

export const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: localeStorage || 'en',
  messages: { en, ru }
})
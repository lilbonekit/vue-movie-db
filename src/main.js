import './scss/app.scss'

import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useI18n } from 'vue-i18n'

import router from './router'

import { vueRoutes } from './router/routes'
import { ICON_NAMES } from './js/const/icons.const'
import { i18n } from './lang'

const pinia = createPinia()
const app = createApp(App, {
  setup () {
    const { t } = useI18n({ useScope: 'global' })
    return t
  }
})

app
  .use(router)
  .use(pinia)
  .use(i18n)

app.provide('routes', vueRoutes)
app.provide('icons', ICON_NAMES)

app.mount('#app')

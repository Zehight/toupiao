import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'reset-css/reset.css'
import router from '@/modules/router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(createPinia())

app.mount('#app')
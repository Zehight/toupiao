import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'reset-css/reset.css'
import '@/assets/var.css'
import router from '@/modules/router'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'
import Vant from 'vant'
import 'vant/lib/index.css'


/* import VConsole from 'vconsole'
const vconsole = new VConsole() */

const app = createApp(App)

app.use(Vant)
app.use(router)
app.use(createPinia())

app.mount('#app')
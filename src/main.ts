import { createPinia } from 'pinia'

import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import { setupPrimeVue } from './app/plugins/primevue/primevue'

import { setupRouter } from './app/router'
import './assets/styles/main.css'
import 'primeicons/primeicons.css'

const pinia = createPinia()
const app = createApp(App)

setupPrimeVue(app)

const router = setupRouter()
app.use(router)

app.use(pinia)
app.use(ToastService)
app.directive('tooltip', Tooltip)
app.mount('#app')

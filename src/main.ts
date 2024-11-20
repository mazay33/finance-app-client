import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { setupPrimeVue } from './app/plugins/primevue/primevue'

import './assets/styles/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
setupPrimeVue(app)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.mount('#app')

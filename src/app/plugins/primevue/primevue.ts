import type { App } from 'vue' // Import Vue types

import preset from '@/assets/preset/customPreset'
import { definePreset } from '@primevue/themes'

import Aura from '@primevue/themes/aura'

import PrimeVue from 'primevue/config'
import locale from './primeLocale'

const MyCustomPreset = definePreset(Aura, preset)

export function setupPrimeVue(app: App): void {
  app.use(PrimeVue, {
    locale,
    ripple: true,
    theme: {
      preset: MyCustomPreset,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
}

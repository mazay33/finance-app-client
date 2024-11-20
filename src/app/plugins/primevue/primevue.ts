import type { App } from 'vue' // Import Vue types

// import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

import locale from './primeLocale'

// import preset from '@/assets/presets/custom-preset';

// const MyCustomPreset = definePreset(Aura, preset);

export function setupPrimeVue(app: App): void {
  app.use(PrimeVue, {
    locale,
    ripple: true,
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
}

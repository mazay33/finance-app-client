import type { PrimeVuePTOptions } from 'primevue/config'

import type { App } from 'vue' // Import Vue types
import preset from '@/assets/preset/customPreset'

import { definePreset } from '@primevue/themes'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import locale from './primeLocale'

const MyCustomPreset = definePreset(Aura, preset)

export const presets: PrimeVuePTOptions = {
  dialog: {
    mask: {
      class: 'backdrop-blur !bg-black/5',
    },
    root: {
      class: '!bg-white/5 !backdrop-blur !border-none',
    },
  },
  multiselect: {
    overlay: {
      class: '!backdrop-blur',
    },
  },
  select: {
    header: {
      class: '!backdrop-blur',
    },
    list: {
      class: '!backdrop-blur',
    },
  },
  datepicker: {
    panel: {
      class: '!backdrop-blur',
    },
    dropdown: {
      class: '!bg-transparent !backdrop-blur',
    },
  },
}

export function setupPrimeVue(app: App): void {
  app.use(PrimeVue, {
    pt: presets,
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

/// <reference types="vitest" />

import path from 'node:path'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/modules': path.resolve(__dirname, 'src/modules'),
    },
  },
  plugins: [
    Vue(),
    // VueMacros({
    //   defineOptions: false,
    //   defineModels: false,
    //   plugins: {
    //     vue: Vue({
    //       script: {
    //         propsDestructure: true,
    //         defineModel: true,
    //       },
    //     }),
    //   },
    // }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      routesFolder: [
        {
          src: 'src/app/pages',
          path: '',
        },
        {
          src: 'src/modules/auth/pages',
          path: 'auth/',
        },
        {
          src: 'src/modules/dashboard/pages',
          path: 'dashboard/',
        },
        {
          src: 'src/modules/account/pages',
          path: 'account/',
        },
      ],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: true,
      dirs: [
        './src/app/composables',
        './src/modules/**/composables',
        './src/modules/**/**/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [
        PrimeVueResolver(),
      ],
      dirs: [
        './src/app/components',
        './src/modules/**/components',
        './src/modules/**/views',
        './src/modules/**/widgets',
        './src/modules/**/**/components',
        './src/modules/**/**/views',
        './src/modules/**/**/widgets',

      ],
    }),

  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})

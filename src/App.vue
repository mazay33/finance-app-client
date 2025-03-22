<script setup lang="ts">
import { useRoute } from 'vue-router'
import AuthLayout from './app/layouts/AuthLayout.vue'
import MainLayout from './app/layouts/MainLayout.vue'

import { useAuthStore } from './modules/auth'

const route = useRoute()
const authStore = useAuthStore()

// const MainLayout = shallowRef()
const isAuthChecked = ref(false)
const isLoading = ref(true)

const layouts = {
  AuthLayout,
  MainLayout,
}

async function waitForAuthStatus(timeout = 20000, interval = 100): Promise<void> {
  const start = Date.now()
  return new Promise<void>((resolve, reject) => {
    const checkAuthStatus = setInterval(() => {
      if (authStore.isAuthenticated !== undefined) {
        clearInterval(checkAuthStatus)
        resolve()
      }
      else if (Date.now() - start >= timeout) {
        clearInterval(checkAuthStatus)
        reject(new Error('Auth status not resolved in time.'))
      }
    }, interval)
  })
}

// watchEffect(async () => {
//   if (authStore.isAuthenticated) {
//     MainLayout.value = defineAsyncComponent(() => import('@/app/layouts/MainLayout.vue'))

//     layouts.MainLayout = MainLayout.value
//   }
// })

const layout = computed(() => {
  const layoutKey = route.meta.layout as keyof typeof layouts

  return layouts[layoutKey || 'MainLayout']
})

onMounted(async () => {
  try {
    await authStore.getMe()

    await waitForAuthStatus()
    isAuthChecked.value = true
  }
  catch (error) {
    console.error('Error checking auth status:', error)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div
    v-if="isLoading"
    class="flex h-screen flex-col items-center justify-center gap-6"
  >
    <ProgressSpinner
      class="size-8"
      stroke-width="5"
      fill="transparent"
      animation-duration=".5s"
      aria-label="Custom ProgressSpinner"
    />
    <div class="text-2xl font-semibold text-primary-500">
      Проверка авторизации
    </div>
  </div>
  <component
    :is="isAuthChecked ? layout : null"
    v-else
  >
    <router-view />
  </component>
</template>

<style scoped>
</style>

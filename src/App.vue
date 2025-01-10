<script setup lang="ts">
import { useRoute } from 'vue-router'
import AuthLayout from './app/layouts/AuthLayout.vue'
import MainLayout from './app/layouts/MainLayout.vue'
import { useAuthStore } from './modules/auth'

const route = useRoute()
const authStore = useAuthStore()

const layouts = {
  AuthLayout,
  MainLayout,
}

const layout = computed(() => {
  const layoutKey = route.meta.layout as keyof typeof layouts

  return layouts[layoutKey || 'MainLayout']
})

onMounted(async () => {
  await authStore.getMe()
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped>
</style>

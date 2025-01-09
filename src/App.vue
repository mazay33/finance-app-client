<script setup lang="ts">
import { useRoute } from 'vue-router'
import AuthLayout from './app/layouts/AuthLayout.vue'

const route = useRoute()

const layouts = {
  AuthLayout,
}

const layout = computed(() => {
  const layoutKey = route.meta.layout as keyof typeof layouts

  return layouts[layoutKey || 'MainLayout']
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped>
</style>

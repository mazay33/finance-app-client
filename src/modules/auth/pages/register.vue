<script setup lang="ts">
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    layout: 'AuthLayout',
  },
})
</script>

<template>
  <Card :pt="{ root: 'ring-1 p-6 ring-gray-200 dark:ring-gray-800 shadow max-w-md w-full bg-white/75 dark:!bg-white/5 backdrop-blur border border-gray-700' }">
    <template #content>
      <RegisterForm />
    </template>
  </Card>
</template>

<style scoped></style>

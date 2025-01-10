<script setup lang="ts">
import { definePage } from 'vue-router/auto'

definePage({
  path: '/',
})
</script>

<template>
  <AppPage>
    <AppPanel grow :collapsible="false" :width="100">
      <AppNavbar title="Home">
        <template #right>
          123
        </template>
      </AppNavbar>

      <AppToolbar>
        <template #left>
          1
        </template>
      </AppToolbar>

      <AppPanelContent>
        2
        <div class="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          3
        </div>
      </AppPanelContent>
    </AppPanel>
  </AppPage>
</template>

<style scoped>

</style>

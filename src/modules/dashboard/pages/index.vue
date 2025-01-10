<script setup lang="ts">
import { sub } from 'date-fns'
import { definePage } from 'vue-router/auto'

definePage({
  path: '/',
})

const range = ref([sub(new Date(), { days: 14 }), new Date()])
</script>

<template>
  <AppPage>
    <AppPanel grow :collapsible="false" :width="100">
      <AppNavbar title="Главная">
        <template #right>
          <Button rounded icon="pi pi-bell" />
        </template>
      </AppNavbar>

      <AppToolbar>
        <template #left>
          <div v-ripple class="rounded-lg">
            <DatePicker v-model="range" date-format="dd M, yy" icon-display="input" show-icon :pt="{ inputIconContainer: '!top-[40%]', pcInputText: { root: '!bg-inherit !border-none !cursor-pointer !min-w-[230px]' } }" size="small" selection-mode="range" :manual-input="false">
              <template #inputicon="slotProps">
                <i class="pi pi-chevron-down " @click="slotProps.clickCallback" />
              </template>
            </DatePicker>
          </div>
        </template>
      </AppToolbar>

      <AppPanelContent>
        <div class="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start min-w-min" />
      </AppPanelContent>
    </AppPanel>
  </AppPage>
</template>

<style scoped>

</style>

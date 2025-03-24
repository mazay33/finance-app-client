<script setup lang="ts">
import { useUserStore } from '../store'

const userStore = useUserStore()
const items = ref([
  {
    key: '0',
    label: 'Главная',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    key: '1',
    label: 'Счета',
    icon: 'pi pi-wallet',
    items: [
      {
        key: '1_0',
        label: 'Транзакии',
        icon: ' pi pi-list',
        route: '/account/transactions',
      },
      {
        key: '1_1',
        label: 'Отчёт',
        icon: 'pi pi-chart-line',
        route: '/account/report',
      },
    ],
  },
  {
    key: '2',
    label: 'Настройки',
    icon: 'pi  pi-cog',
    route: '/',
  },
])

const expandedKeys = ref({
  1: true,
})
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <AppPanel
      :width="270"
      :resizable="{ min: 220, max: 315 }"
    >
      <AppNavbar class="!border-transparent">
        <template #left>
          <Button
            color="gray"
            outlined
            variant="text"
            class="!w-full"
          >
            <Avatar
              class="min-w-8"
              shape="circle"
              image="https://avatars.githubusercontent.com/u/23360933?s=200&v=4"
            />
            <h1 class="truncate text-left w-full font-semibold text-gray-900 dark:text-white">
              Finance Manager
            </h1>
          </Button>
        </template>
      </AppNavbar>

      <AppSidebar>
        <template #header>
          <IconField class="w-full">
            <InputIcon class="pi pi-search" />
            <InputText
              class="w-full"
              size="small"
              placeholder="Поиск..."
            />
          </IconField>
        </template>

        <PanelMenu v-model:expanded-keys="expandedKeys" class="mt-2" :pt="{ root: '!gap-y-0', panel: '!py-1 -mx-2 !bg-inherit !border-none' }" :model="items">
          <template #item="{ item }">
            <router-link v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route" custom>
              <a v-ripple :class="{ '!bg-surface-light-200 dark:!bg-surface-dark-800 rounded-lg': isActive }" class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-2 py-2 my-1" :href="href" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
              </a>
            </router-link>
            <a v-else v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-2 py-2" :href="item.url" :target="item.target">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
            </a>
          </template>
        </PanelMenu>

        <div class="flex-1" />

        <Divider />

        <template #footer>
          <div class="-mt-2 mb-2">
            <Button variant="text" type="button" label="Share">
              <Avatar shape="circle" image="https://avatars.githubusercontent.com/u/23360933?s=200&v=4" />
              <span class="text-white/90">{{ userStore.user?.email }}</span>
              <i class="pi pi-ellipsis-v text-white/90" />
            </Button>
          </div>
        </template>
      </AppSidebar>
    </AppPanel>

    <slot />
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import type { IPagination } from '@/app/types'
import type { DataTableProps } from 'primevue'
import type { ITransaction } from '../types'
import { currencySymbols } from '@/app/commom'
import { format } from 'date-fns'

interface Props extends DataTableProps {
  transactions: ITransaction[] | undefined
  pagination: IPagination | undefined
}
// interface Emit {
//   updatePage: (page: number) => void
//   updateLimit: (limit: number) => void
// }

const props = defineProps<Props>()
// const emit = defineEmits<Emit>()
</script>

<template>
  <DataTable
    v-bind="$attrs"
    :value="props.transactions"
    :loading="loading"
    data-key="id"
    scrollable
    scroll-height="300px"
    table-class="overflow-x-auto dark:bg-surface-950 "
    :pt="{
      thead: '!backdrop-blur-xl',
    }"
    pt:pcpaginator:root="!bg-transparent"
    :dt="{
      header: {
        background: 'transparent',
      },
      headerCell: {
        background: 'transparent',
      },
      row: {
        background: 'transparent',
      },
    }"
  >
    <Column header="№" class="w-1/12">
      <template #body="{ index }">
        <div class="text-muted-color">
          {{ index + 1 }}
        </div>
      </template>
    </Column>
    <Column class="w-1/5" header="Категория">
      <template #body="{ data }: { data: ITransaction}">
        <div class="flex items-center">
          <div class="leading-6 text-muted-color flex-1">
            {{ data.category.name }}
          </div>
        </div>
      </template>
    </Column>
    <Column header="Описание">
      <template #body="{ data }: { data: ITransaction}">
        <div class="flex items-center">
          <div class="leading-6 text-muted-color flex-1">
            {{ data.description }}
          </div>
        </div>
      </template>
    </Column>

    <Column class="w-1/6" header="Счет">
      <template #body="{ data }: { data: ITransaction}">
        <div class="flex items-center">
          <div class="leading-6 text-muted-color flex-1">
            {{ data.account.name }}
          </div>
        </div>
      </template>
    </Column>

    <Column class="w-[180px]" header="Дата">
      <template #body="{ data }: { data: ITransaction}">
        <div class="text-muted-color">
          {{ data.date ? format(data.date, 'dd.MM.yyyy') : '' }}
        </div>
      </template>
    </Column>

    <Column class="w-1/6" header="Сумма">
      <template #body="{ data }: { data: ITransaction}">
        <div :class=" data.type === 'DEBIT' ? 'text-green-500' : 'text-red-500' " class="text-muted-color">
          {{ data.type === 'DEBIT' ? '+' : '-' }} {{ data.amount }} {{ currencySymbols[data.account.currency] }}
        </div>
      </template>
    </Column>
  </DataTable>
  <Paginator
    class="mt-auto"
    pt:root="!bg-transparent"
    :rows="pagination?.limit"
    :total-records="pagination?.total"
    :rows-per-page-options="[5, 10, 25, 50]"
  />
</template>

<style scoped>

</style>

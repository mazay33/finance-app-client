<script setup lang="ts">
import type { AccountType } from '@/app/commom'
import type { IAccount } from '../types'
import { ACCOUNT_TYPE, accountTypeIcons, Currency, currencyNames, currencySymbols, exchangeRates } from '@/app/commom'
import { useApiService } from '@/app/services'

interface Emits {
  (e: '@editAccount', account: IAccount): void
}

const emit = defineEmits<Emits>()

const BASE_CURRENCY: Currency = Currency.RUB

const apiService = useApiService()

// Получаем список счетов
const { data: accounts, execute: getAccountlist, error: accountListError } = apiService.account.getList()

defineExpose({ getAccountlist })

const { watchError } = useErrorHandler(
  accountListError,
  'Ошибка при получении списка счетов ',
)
watchError()

const selectedCurrency = ref<Currency>(BASE_CURRENCY)
function convertToBaseCurrency(amount: number, currency: Currency): number {
  return amount * (exchangeRates.value[currency] || 1)
}

const groupedAccountsWithTotals = computed<
  Partial<Record<AccountType, { accounts: IAccount[], total: number }>>
>(() => {
  if (!accounts.value)
    return {}
  return accounts.value.data.reduce((acc, account) => {
    const key = account.type as AccountType
    if (!acc[key]) {
      acc[key] = { accounts: [], total: 0 }
    }
    acc[key].accounts.push(account)
    acc[key].total += convertToBaseCurrency(
      Number(account.balance),
      account.currency as Currency,
    )
    return acc
  }, {} as Partial<Record<AccountType, { accounts: IAccount[], total: number }>>)
})

const totalBaseBalance = computed(() => {
  return Object.values(groupedAccountsWithTotals.value).reduce(
    (sum, group) => sum + group.total,
    0,
  )
})

const totalInSelectedCurrency = computed(() => {
  const rate = exchangeRates.value[selectedCurrency.value]
  return rate ? totalBaseBalance.value / rate : totalBaseBalance.value
})
</script>

<!-- eslint-disable vue/custom-event-name-casing -->
<template>
  <div class="flex items-center justify-between mb-6">
    <div class="text-lg font-semibold">
      Общий баланс:
      <span
        :class="{
          'text-green-500': totalInSelectedCurrency > 0,
          'text-red-500': totalInSelectedCurrency < 0,
        }"
      >
        {{ totalInSelectedCurrency > 0
          ? `+${totalInSelectedCurrency.toLocaleString()}`
          : totalInSelectedCurrency < 0
            ? `-${Math.abs(totalInSelectedCurrency).toLocaleString()}`
            : totalInSelectedCurrency.toLocaleString() }}
        {{ currencySymbols[selectedCurrency] }}
      </span>
    </div>
    <Select
      v-model="selectedCurrency"
      :options="Object.keys(Currency).map((key) => ({
        name: key,
        id: key,
      }))"
      option-label="name"
      option-value="id"
      class="w-[98px]"
    >
      <template #option="{ option }">
        <p>
          {{ currencyNames[option.id as Currency] }} (
          {{ currencySymbols[option.id as Currency] }})
        </p>
      </template>
    </Select>
  </div>
  <Accordion :value="Object.keys(groupedAccountsWithTotals)" multiple>
    <AccordionPanel
      v-for="[type, group] in Object.entries(groupedAccountsWithTotals)"
      :key="type"
      :pt="{ root: '!mb-4 !border-none' }"
      :value="type"
    >
      <AccordionHeader :pt="{ root: '!rounded-lg' }">
        <div class="flex justify-between w-full">
          <span>
            <i :class="accountTypeIcons[type as AccountType]" class="mr-2" />
            {{ ACCOUNT_TYPE[type as AccountType] }}
          </span>
          <span v-if="group.accounts.length" class="mr-2">
            {{ (group.total / (exchangeRates[selectedCurrency] || 1)).toLocaleString() }}
            {{ currencySymbols[selectedCurrency] }}
          </span>
        </div>
      </AccordionHeader>
      <AccordionContent :pt="{ content: '!bg-inherit !pr-0 ' }">
        <div
          v-for="account in group.accounts"
          :key="account.id || account.name"
          class="mb-2"
        >
          <div class="flex items-center justify-between gap-2 pt-4">
            <div class="flex items-center">
              <h3 class="text-lg font-semibold">
                {{ account.name }}
              </h3>
            </div>
            <div
              :class="{
                'text-green-500': +account.balance > 0,
                'text-red-500': +account.balance < 0,
              }"
            >
              <span class="font-semibold">
                {{
                  +account.balance > 0
                    ? `+${Number(account.balance).toLocaleString()}`
                    : +account.balance < 0
                      ? `-${Math.abs(+account.balance)}`
                      : Number(account.balance).toLocaleString()
                }}
              </span>
              <span class="ml-1">{{ currencySymbols[account.currency] }}</span>
              <Button
                icon="pi pi-pencil"
                class="p-button-text ml-2"
                @click="emit('@editAccount', account)"
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>

</style>

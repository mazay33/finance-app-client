<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
import type { FormMode } from '@/app/types'
import type { IAccount, IAccountCreateData, IAccountUpdateData } from '../types'
import { ACCOUNT_TYPE, AccountType, accountTypeIcons, Currency, currencyNames, currencySymbols } from '@/app/commom'
import { useApiService } from '@/app/services'
import { Toast, useToast } from 'primevue'

interface Props {
  mode?: FormMode
}

interface Emits {
  (e: '@success'): void
  (e: '@cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const apiService = useApiService()
const toast = useToast()

const isLoading = ref(false)
const showDeleteDialog = ref(false)

const accountState = reactive({
  id: '',
  name: '',
  description: '',
  type: AccountType.CASH,
  currency: Currency.RUB,
  balance: 0,
  isActive: true,
})

async function createAccount(): Promise<{ success: boolean, error?: any }> {
  isLoading.value = true
  const data: IAccountCreateData = {
    name: accountState.name,
    description: accountState.description,
    type: accountState.type,
    currency: accountState.currency,
    balance: accountState.balance.toString(),
    isActive: accountState.isActive,
  }

  const { error, execute, loading } = apiService.account.create(data, { immediate: false })
  await execute()
  isLoading.value = loading.value

  if (error.value) {
    return { success: false, error: error.value }
  }

  return { success: true }
}

async function updateAccount(): Promise<{ success: boolean, error?: any }> {
  if (!accountState.id)
    return { success: false, error: 'Missing account ID' }

  const data: IAccountUpdateData = {
    name: accountState.name,
    description: accountState.description,
    type: accountState.type,
    currency: accountState.currency,
    balance: accountState.balance.toString(),
    isActive: accountState.isActive,
  }

  const { error, execute, loading } = apiService.account.update(accountState.id, data, { immediate: false })
  await execute()
  isLoading.value = loading.value

  return error.value ? { success: false, error } : { success: true }
}

async function deleteAccount(): Promise<void> {
  if (!accountState.id)
    return
  isLoading.value = true

  const { error, execute, loading } = apiService.account.delete(accountState.id, { immediate: false })
  await execute()
  isLoading.value = loading.value

  showDeleteDialog.value = false // Закрываем диалог

  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error.value.message || 'Неизвестная ошибка',
      life: 3000,
    })
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Успешно!',
    detail: `Счёт ${accountState.name} удалён`,
    life: 3000,
  })

  emit('@success')
}

function setAccountData(account: IAccount): void {
  Object.assign(accountState, account)
}

async function submit(): Promise<void> {
  let result
  if (props.mode === 'create') {
    result = await createAccount()
  }
  else if (props.mode === 'update') {
    result = await updateAccount()
  }

  if (result?.success) {
    toast.add({
      severity: 'success',
      summary: 'Успех!',
      detail: props.mode === 'update' ? `Счёт ${accountState.name} обновлён` : `Счёт ${accountState.name} создан`,
      life: 3000,
    })
    emit('@success')
  }
  else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: result?.error?.message || 'Неизвестная ошибка',
      life: 3000,
    })
  }
}

function cancel(): void {
  Object.assign(accountState, {
    name: '',
    description: '',
    type: AccountType.CASH,
    currency: Currency.RUB,
    balance: 0,
    isActive: true,
  })

  emit('@cancel')
}

defineExpose({
  submit,
  cancel,
  setAccountData,
  isLoading,
})
</script>

<template>
  <div class="grid grid-cols-1 gap-8 pt-5">
    <Toast />
    <!-- Название счёта -->
    <div class="field">
      <FloatLabel>
        <InputText
          id="name"
          v-model="accountState.name"
          class="w-full"
        />
        <label for="name">
          Название счёта
        </label>
      </FloatLabel>
    </div>

    <!-- Тип счёта -->
    <div class="field">
      <FloatLabel>
        <Select
          id="type"
          v-model="accountState.type"
          :options="Object.entries(ACCOUNT_TYPE).map(([key, value]) => ({
            name: value,
            id: key,
          }))"
          option-label="name"
          option-value="id"
          class="w-full"
        >
          <template #option="{ option }">
            <i :class="accountTypeIcons[option.id as AccountType]" class="mr-2" />
            {{ option.name }}
          </template>
        </Select>
        <label for="type">
          Тип счёта
        </label>
      </FloatLabel>
    </div>

    <!-- Валюта -->
    <div class="field">
      <FloatLabel>
        <Select
          id="currency"
          v-model="accountState.currency"
          :options="Object.keys(Currency).map((key) => ({
            name: key,
            id: key,
          }))"
          option-label="name"
          option-value="id"
          class="w-full"
        >
          <template #option="{ option }">
            <p>
              {{ currencyNames[option.id as Currency] }} (
              {{ currencySymbols[option.id as Currency] }})
            </p>
          </template>
        </Select>
        <label for="currency">
          Валюта
        </label>
      </FloatLabel>
    </div>

    <!-- Начальный баланс -->
    <div v-if="props.mode === 'create'" class="field">
      <FloatLabel>
        <InputNumber
          id="balance"
          v-model="accountState.balance"
          mode="currency"
          :currency="accountState.currency"
          locale="ru-RU"
          class="w-full"
        />
        <label for="balance">Начальный баланс</label>
      </FloatLabel>
    </div>

    <!-- Активен -->
    <div class="field flex align-items-center gap-2">
      <Checkbox
        v-model="accountState.isActive"
        input-id="isActive"
        :binary="true"
      />
      <label for="isActive">Активный счёт</label>
    </div>

    <!-- Описание -->
    <div class="field">
      <FloatLabel>
        <Textarea
          id="description"
          v-model="accountState.description"
          rows="3"
          class="w-full"
        />
        <label for="description">Описание</label>
      </FloatLabel>
    </div>

    <!-- Кнопки -->
    <Button
      v-if="mode === 'update'"
      :loading="isLoading"
      class="mb-4"
      label="Удалить счёт"
      icon="pi pi-trash"
      outlined
      severity="danger"
      @click="showDeleteDialog = true"
    />

    <Dialog
      v-model:visible="showDeleteDialog"
      header="Подтверждение удаления"
      :modal="true"
      :style="{ width: '25%' }"
    >
      <div class="flex items-center gap-3">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span>Вы уверены, что хотите удалить счёт <b>{{ accountState.name }}</b>?</span>
      </div>
      <template #footer>
        <Button
          label="Нет"
          icon="pi pi-times"
          class="p-button-text"
          @click="showDeleteDialog = false"
        />
        <Button
          label="Да"
          icon="pi pi-check"
          class="p-button-danger"
          :loading="isLoading"
          @click="deleteAccount"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
</style>

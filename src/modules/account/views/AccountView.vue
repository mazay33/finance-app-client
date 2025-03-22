<script setup lang="ts">
import type { FormMode } from '@/app/types'
import type { IAccount } from '../types'

const isAccountFormDialogVisible = ref<boolean>(false)
const accountFormMode = ref<FormMode>()
const accountFormRef = templateRef('accountFormRef')

async function handleSave(): Promise<void> {
  if (!accountFormRef.value)
    return
  await accountFormRef.value.submit()
}

async function handleEditAccount(account: IAccount): Promise<void> {
  isAccountFormDialogVisible.value = true
  await nextTick()
  if (!accountFormRef.value)
    return
  accountFormMode.value = 'update'
  accountFormRef.value.setAccountData(account)
}

function handleCancel(): void {
  if (!accountFormRef.value)
    return
  accountFormRef.value.cancel()
}

const accountListWidgetRef = templateRef('accountListWidgetRef')
async function updateAccountList(): Promise<void> {
  if (!accountListWidgetRef.value)
    return
  isAccountFormDialogVisible.value = false
  await accountListWidgetRef.value.getAccountlist()
}
</script>

<template>
  <AppPage>
    <AppPanel :collapsible="false" :width="450">
      <AppNavbar title="Счета">
        <template #right>
          <Button
            size="small"
            icon="pi pi-plus"
            label="Добавить счёт"
            @click="isAccountFormDialogVisible = true, accountFormMode = 'create'"
          />
        </template>
      </AppNavbar>

      <Dialog
        v-model:visible="isAccountFormDialogVisible"
        :header="accountFormMode === 'update' ? 'Редактирование счёта' : 'Создание счёта'"
        :modal="true"
        class="w-1/3"
      >
        <template #default>
          <AccountForm
            ref="accountFormRef"
            :mode="accountFormMode"
            @@cancel="isAccountFormDialogVisible = false"
            @@success="updateAccountList"
          />
        </template>

        <template #footer>
          <Button
            label="Отмена"
            icon="pi pi-times"
            class="p-button-text"
            @click="handleCancel"
          />
          <Button
            label="Сохранить"
            icon="pi pi-check"
            @click="handleSave"
          />
        </template>
      </Dialog>

      <AppPanelContent>
        <AppErrorBoundary>
          <AccountListWidget ref="accountListWidgetRef" @@edit-account="handleEditAccount($event as IAccount)" />
        </AppErrorBoundary>
      </AppPanelContent>
    </AppPanel>

    <AppPanel grow :collapsible="false" :width="100">
      <AppNavbar title="Главная">
        <template #right>
          <Button rounded icon="pi pi-bell" />
        </template>
      </AppNavbar>
    </AppPanel>
  </AppPage>
</template>

<style scoped>
/* Стили при необходимости */
</style>

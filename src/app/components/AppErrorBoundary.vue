<script setup lang="ts">
interface Props {
  fallback?: string
  resetLabel?: string
}

withDefaults(defineProps<Props>(), {
  fallback: 'Что-то пошло не так',
  resetLabel: 'Повторить',
})

const error = ref<Error | null>(null)
const errorStatus = ref<number | null>(null)
const errorInfo = ref<string | null>(null)

function getErrorStatus(err: unknown): number | null {
  if (err && typeof err === 'object') {
    // Для Axios ошибок
    if ('response' in err) {
      const axiosError = err as { response?: { status?: number } }
      return axiosError.response?.status ?? null
    }
    // Для Fetch ошибок
    if ('status' in err) {
      return (err as { status: number }).status
    }
  }
  return null
}

function reset(): void {
  error.value = null
  errorStatus.value = null
  errorInfo.value = null
}

onErrorCaptured((err, instance, info) => {
  error.value = err
  errorStatus.value = getErrorStatus(err)
  errorInfo.value = info
  return false
})
</script>

<template>
  <Card
    v-if="error"
    class="error-boundary"
  >
    <template #content>
      <div class="flex flex-col items-center gap-4">
        <Button
          rounded
          class="!border-none !bg-red-500/20"
          severity="danger"
          icon="pi pi-times text-red-500"
          size="large"
        />

        <div class="text-2xl font-semibold text-red-500">
          {{ errorStatus ? `Ошибка ${errorStatus}` : 'Произошла ошибка' }}
        </div>

        <div class="text-center text-sm text-gray-400">
          {{ error.message || fallback }}
        </div>

        <Button
          class="mt-6"
          :label="resetLabel"
          outlined
          @click="reset"
        />
      </div>
    </template>
  </Card>

  <slot v-else />
</template>

<style scoped>

</style>

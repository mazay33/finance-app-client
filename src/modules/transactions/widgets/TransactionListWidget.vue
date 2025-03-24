<script setup lang="ts">
import { useApiService } from '@/app/services'

const apiService = useApiService()

const { data: transactions, loading } = apiService.transaction.getList()
</script>

<template>
  <TransactionTable
    size="large"
    :transactions="transactions?.data"
    :pagination="transactions?.pagination"
    :loading="loading"
  />
</template>

<style scoped>

</style>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  title?: string
}

const props = defineProps<Props>()
</script>

<template>
  <nav
    class="flex h-16 min-w-0 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 dark:border-gray-800"
  >
    <div
      v-if="$slots.left || props.title"
      class="justify-left flex min-w-0 flex-1 items-center gap-x-1.5 w-full"
    >
      <slot name="left">
        {{ props.title }}
      </slot>
    </div>

    <div
      v-if="$slots.center"
      class="flex min-w-0 flex-1 items-center justify-between gap-x-1.5"
    >
      <div class="flex items-center gap-1.5">
        <slot name="center" />
      </div>
    </div>
    <div v-if="$slots.right" class="flex items-stretch gap-1.5">
      <slot name="right" />
    </div>
  </nav>
</template>

<style scoped>
</style>

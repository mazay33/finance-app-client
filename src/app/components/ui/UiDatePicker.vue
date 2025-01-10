<script lang="ts" setup>
import type { DatePickerProps, DatePickerSlots } from 'primevue/datepicker'

import { format } from 'date-fns'

interface CustomDatePickerProps extends DatePickerProps {
  formatValue?: string
}

const props = defineProps<CustomDatePickerProps>()
const slotProps = defineSlots<DatePickerSlots>()
function formatDate(date: Date | null | undefined): string | undefined {
  if (!date)
    return undefined
  const formattedDate = format(date, props.formatValue || 'yyyy-MM-dd')
  return props.showTime ? formattedDate : formattedDate.replace(/T.*$/, '')
}

const modelValue = defineModel<Date | Date[] | undefined | null | any>({
  get: (value) => {
    if (Array.isArray(value)) {
      return value.filter(Boolean).map(date => new Date(date as Date))
    }
    else if (value) {
      return new Date(value)
    }
    return null
  },
  set: (value) => {
    if (Array.isArray(value)) {
      return value.filter(Boolean).map(date => formatDate(date as Date)) as (string | undefined)[]
    }
    else {
      return formatDate(value)
    }
  },
})

const slotKeys = Object.keys(slotProps) as Partial<(keyof DatePickerSlots)[]>
</script>

<template>
  <DatePicker
    v-bind="$attrs"
    v-model="modelValue"
  >
    <template
      v-for="slot in slotKeys"
      #[slot]="scope"
    >
      <slot
        v-if="slot"
        :name="slot"
        v-bind="scope"
      />
    </template>
  </DatePicker>
</template>

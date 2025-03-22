import { Currency } from '../enums'

export const exchangeRates = ref<Record<Currency, number>>({
  [Currency.USD]: 75.50,
  [Currency.EUR]: 85.25,
  [Currency.RUB]: 1,
})

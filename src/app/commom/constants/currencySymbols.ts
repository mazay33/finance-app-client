import { Currency } from '../enums'

export const currencySymbols: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.RUB]: '₽',
} as const

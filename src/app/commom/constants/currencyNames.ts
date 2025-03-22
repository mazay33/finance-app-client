import { Currency } from '../enums'

export const currencyNames: Record<Currency, string> = {
  [Currency.USD]: 'Доллар США',
  [Currency.EUR]: 'Евро',
  [Currency.RUB]: 'Российский рубль',
} as const

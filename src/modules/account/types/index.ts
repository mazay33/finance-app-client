import type { AccountType, Currency } from '@/app/commom'

export interface IAccount {
  id: string
  name: string
  balance: string
  accountTypeId: string
  description: string
  isActive: boolean
  currency: string
  createdAt: string
  updatedAt: string
  userId: string
}

export type AccountSortByAllowed = keyof IAccount

export interface IAccountQuery {
  search: string
  type: AccountType
  currency: Currency
  page: number
  limit: number
  sortBy: AccountSortByAllowed
  order: 'desc' | 'asc'
}

export interface IAccountCreateData {
  name: string
  accountTypeId: string
  description: string
  currency: Currency
  balance: string
  isActive: boolean
}

export interface IAccountUpdateData extends Partial<IAccountCreateData> {}

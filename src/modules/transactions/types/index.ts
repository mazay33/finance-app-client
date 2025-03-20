import type { TransactionType } from '@/app/commom'

export interface ITransaction {
  id: string
  amount: string
  type: TransactionType
  description: string
  createdAt: string
  updatedAt: string
  date: string
  categoryId: string
  accountId: string
}

export type TranscationSortByAllowed = keyof ITransaction

export interface ITransactionQuery {
  search: string
  type: TransactionType
  page: number
  limit: number
  sortBy: TranscationSortByAllowed
  order: 'desc' | 'asc'
}

export interface ITransactionCreateData {
  amount: string
  type: TransactionType
  description: string
  date: string
  categoryId: string
  accountId: string
}

export interface ITransactionUpdateData extends Partial<ITransactionCreateData> {}

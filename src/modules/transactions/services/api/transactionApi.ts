import type { HttpService } from '@/app/services'
import type {
  ITransaction,
  ITransactionCreateData,
  ITransactionQuery,
  ITransactionUpdateData,
} from '../../types'
import { BaseApiService } from '@/app/services/baseApiService'

export class TransactionApi extends BaseApiService<
  ITransaction,
  ITransactionCreateData,
  ITransactionUpdateData,
  ITransactionQuery
> {
  constructor(httpService: HttpService, resourceUrl: string) {
    super(httpService, resourceUrl)
  }
}

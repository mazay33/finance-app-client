import { AccountApi } from '@/modules/account/services'
import { AuthApi } from '@/modules/auth'
import { TransactionApi } from '@/modules/transactions'
import { HttpService } from './httpService'

let apiServiceInstance: ApiService | null = null

class ApiService {
  private _auth: AuthApi | null = null
  private _transaction: TransactionApi | null = null
  private _account: AccountApi | null = null

  private static endpoints = {
    auth: '/auth',
    transaction: '/transaction',
    account: '/account',
  }

  constructor(private httpService: HttpService) {}

  get auth(): AuthApi {
    if (!this._auth) {
      this._auth = this.createApiInstance(
        AuthApi,
        ApiService.endpoints.auth,
      )
    }
    return this._auth
  }

  get transaction(): TransactionApi {
    if (!this._transaction) {
      this._transaction = this.createApiInstance(
        TransactionApi,
        ApiService.endpoints.transaction,
      )
    }
    return this._transaction
  }

  get account(): AccountApi {
    if (!this._account) {
      this._account = this.createApiInstance(
        AccountApi,
        ApiService.endpoints.account,
      )
    }
    return this._account
  }

  private createApiInstance<T>(
    ApiClass: new (httpService: HttpService, endpoint: string) => T,
    endpoint: string,
  ): T {
    return new ApiClass(this.httpService, endpoint)
  }
}

export function useApiService(): ApiService {
  if (!apiServiceInstance) {
    const httpService = new HttpService()
    apiServiceInstance = new ApiService(httpService)
  }
  return apiServiceInstance
}

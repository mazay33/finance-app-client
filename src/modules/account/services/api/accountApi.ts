import type { UseAxiosOptions, UseAxiosReturn } from '@/app/composables/useAxios'
import type { HttpService } from '@/app/services'
import type { IAccount, IAccountCreateData, IAccountQuery, IAccountUpdateData } from '../../types'
import { BaseApiService } from '@/app/services/baseApiService'

export class AccountApi extends BaseApiService<
  IAccount,
  IAccountCreateData,
  IAccountUpdateData,
  IAccountQuery
> {
  constructor(httpService: HttpService, resourceUrl: string) {
    super(httpService, resourceUrl)
  }

  public getTotalBalance = (config?: UseAxiosOptions<never, { balance: number }>): UseAxiosReturn<{ balance: number }> => {
    return this.httpService.get<{ balance: number }>(`${this.resourceUrl}/total-balance`, config)
  }
}

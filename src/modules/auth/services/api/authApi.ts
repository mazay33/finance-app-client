import type { UseAxiosOptions, UseAxiosReturn } from '@/app/composables/useAxios'
import type { HttpService } from '@/app/services'
import type { IUser } from '@/app/types'
import type { IAccessToken, ILoginRequestData } from '../../types'
import { buildUrl } from '@/app/helpers'

export class AuthApi {
  private readonly resourceUrl: string

  constructor(private readonly httpService: HttpService, resourceUrl: string) {
    this.resourceUrl = resourceUrl
  }

  public login(data: ILoginRequestData, config?: UseAxiosOptions<ILoginRequestData, IAccessToken>): UseAxiosReturn<IAccessToken> {
    const url = buildUrl(this.resourceUrl, 'login')
    return this.httpService.post<IAccessToken, ILoginRequestData>(url, data, config)
  }

  public me(config?: UseAxiosOptions<never, IUser>): UseAxiosReturn<IUser> {
    const url = buildUrl(this.resourceUrl, 'me')
    return this.httpService.get<IUser>(url, config)
  }

  public refresh(config?: UseAxiosOptions<never, IAccessToken>): UseAxiosReturn<IAccessToken> {
    const url = buildUrl(this.resourceUrl, 'refresh-tokens')
    return this.httpService.get<IAccessToken>(url, config)
  }
}

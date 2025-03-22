import type { UseAxiosOptions, UseAxiosReturn } from '@/app/composables/useAxios'
import type { HttpService } from '@/app/services'
import type { IPaginatedResponse } from '@/app/types'

export class BaseApiService<
  T,
  CreateRequest = T,
  UpdateRequest = CreateRequest,
  QueryParams = Record<string, any>,
> {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly resourceUrl: string,
  ) {}

  protected getUrl(endpoint: string): string {
    return `${this.resourceUrl}/${endpoint}`
  }

  public getList(
    query?: QueryParams,
    config?: UseAxiosOptions<never, IPaginatedResponse<T>>,
  ): UseAxiosReturn<IPaginatedResponse<T>> {
    const url = this.getUrl('list')
    return this.httpService.get<IPaginatedResponse<T>>(url, {
      params: query,
      ...config,
    })
  }

  public getOne(
    id: string,
    config?: UseAxiosOptions<never, T>,
  ): UseAxiosReturn<T> {
    const url = this.getUrl(id)
    return this.httpService.get<T>(url, config)
  }

  public create(
    data: MaybeRef<CreateRequest>,
    config?: UseAxiosOptions<CreateRequest, T>,
  ): UseAxiosReturn<T> {
    const url = this.getUrl('')
    return this.httpService.post<T, CreateRequest>(url, data, config)
  }

  public update(
    id: string,
    data: MaybeRef<UpdateRequest>,
    config?: UseAxiosOptions<UpdateRequest, T>,
  ): UseAxiosReturn<T> {
    const url = this.getUrl(id)
    return this.httpService.put<T, UpdateRequest>(url, data, config)
  }

  public delete(
    id: string,
    config?: UseAxiosOptions<never, T>,
  ): UseAxiosReturn<T> {
    const url = this.getUrl(id)
    return this.httpService.delete<T>(url, config)
  }
}

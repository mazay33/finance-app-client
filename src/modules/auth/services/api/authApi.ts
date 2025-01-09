import type { HttpService } from '@/app/services'
import type { AxiosResponse } from 'axios'
import type { IAccessToken, ILoginRequestData } from '../../types'
import { ApiErrorFactory, type Either, type IApiError, Left, Right } from '@/app/utils'

interface IAuthApi {
  // register: (data: IRegisterRequestData) => Promise<Either<IApiError, AxiosResponse<IUser>>>
  login: (data: ILoginRequestData) => Promise<Either<IApiError, AxiosResponse<IAccessToken>>>
  // me: () => Promise<Either<IApiError, AxiosResponse<IUser>>>
  // logout: () => Promise<void>
}

export class AuthApi implements IAuthApi {
  protected resourceUrl

  constructor(protected httpService: HttpService, resourceUrl: string) {
    this.resourceUrl = resourceUrl
  }

  // public async register(data: IRegisterRequestData): Promise<Either<IApiError, AxiosResponse<IUser>>> {
  //   try {
  //     const response = await this.httpService.post<IUser, IRegisterRequestData>(`${this.resourceUrl}/register`, data)
  //     return Right.create(response)
  //   }
  //   catch (error: unknown) {
  //     const apiError = ApiErrorFactory.create(error, data.email)
  //     return Left.create(apiError)
  //   }
  // }

  public async login(data: ILoginRequestData): Promise<Either<IApiError, AxiosResponse<IAccessToken>>> {
    try {
      const response = await this.httpService.post<IAccessToken, ILoginRequestData>(`${this.resourceUrl}/login`, data)
      return Right.create(response)
    }
    catch (error: unknown) {
      const apiError = ApiErrorFactory.create(error, data.email)
      return Left.create(apiError)
    }
  }
}

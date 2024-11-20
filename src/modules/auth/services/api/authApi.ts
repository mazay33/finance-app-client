import type { HttpService } from '@/app/services'
import type { AxiosResponse } from 'axios'
import { ApiErrorFactory, type Either, type IApiError, Left, Right } from '@/app/utils'

interface IRegisterRequestData {
  email: string
  password: string
  passwordRepeat: string
}

enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
interface IUser {
  id: string
  email: string
  roles: ROLE[]
  provider: string
  createdAt: string
  updatedAt: string
}

interface ILoginRequestData {
  email: string
  password: string
}

interface IAccessToken {
  accessToken: string
}

interface IAuthApi {
  register: (data: IRegisterRequestData) => Promise<Either<IApiError, AxiosResponse<IUser>>>
  login: (data: ILoginRequestData) => Promise<Either<IApiError, AxiosResponse<IAccessToken>>>
  me: () => Promise<Either<IApiError, AxiosResponse<IUser>>>
  logout: () => Promise<void>
}

export class AuthApi implements IAuthApi {
  protected resourceUrl

  constructor(protected httpService: HttpService, resourceUrl: string) {
    this.resourceUrl = resourceUrl
  }

  public async register(data: IRegisterRequestData): Promise<Either<IApiError, AxiosResponse<IUser>>> {
    try {
      const response = await this.httpService.post<IUser, IRegisterRequestData>(`${this.resourceUrl}/register`, data)
      return Right.create(response)
    }
    catch (error: unknown) {
      const apiError = ApiErrorFactory.create(error, data.email)
      return Left.create(apiError)
    }
  }
}

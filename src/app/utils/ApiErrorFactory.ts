import { isAxiosError } from 'axios'

export interface IApiError {
  code: number
  message: string
  userFriendly: boolean
  customMessage?: string
  url?: string
  method?: string
  status?: number
  requestData?: any
}

const DEFAULT_ERROR_CODE = -1
const DEFAULT_ERROR_MESSAGE = 'Произошла неизвестная ошибка'

class ApiError extends Error {
  constructor(
    public code: number,
    public message: string,
    public userFriendly: boolean,
    public customMessage?: string,
    public url?: string,
    public method?: string,
    public status?: number,
    public requestData?: any,
  ) {
    super(message)
    this.name = 'ApiError'
  }

  toObject(): IApiError {
    return {
      code: this.code,
      message: this.message,
      userFriendly: this.userFriendly,
      customMessage: this.customMessage,
      url: this.url,
      method: this.method,
      status: this.status,
      requestData: this.requestData,
    }
  }

  toJSON(): IApiError {
    return this.toObject()
  }
}

export class ApiErrorFactory {
  static create(error: unknown, requestData?: any, customMessage?: string): IApiError {
    if (isAxiosError(error)) {
      const { response, config } = error
      const responseData = response?.data
      const url = config?.url
      const method = config?.method
      const status = response?.status

      if (responseData) {
        const code: number = responseData.code ?? DEFAULT_ERROR_CODE
        const message: string = responseData.message ?? DEFAULT_ERROR_MESSAGE
        const userFriendly: boolean = responseData.userFriendly ?? false

        const apiError = new ApiError(
          code,
          message,
          userFriendly,
          customMessage,
          url,
          method,
          status,
          requestData,
        )

        console.error('👾👾👾 API_ERROR:', apiError.toJSON())
        return apiError.toJSON()
      }
    }

    console.error('Произошла неизвестная ошибка:', error)
    return {
      code: DEFAULT_ERROR_CODE,
      message: DEFAULT_ERROR_MESSAGE,
      userFriendly: false,
      customMessage,
      requestData,
    }
  }
}

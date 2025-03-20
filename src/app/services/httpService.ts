import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { MaybeRef } from 'vue'
import type { UseAxiosOptions, UseAxiosReturn } from '../composables/useAxios'

import { useAuthStore } from '@/modules/auth'

import axios from 'axios'

// Интерфейс для конфигурации сервиса
interface HttpServiceConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  withCredentials?: boolean
}

interface CustomAxiosInternalRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean
  skipAbortSignal?: boolean
}

export type HttpBodyType<T> = T extends Ref<Record<string, any>> ? T : Record<string, any>
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// Основной HttpService класс
export class HttpService {
  private axiosInstance: AxiosInstance
  private defaultConfig: HttpServiceConfig

  constructor(config: HttpServiceConfig = {}) {
    this.defaultConfig = {
      baseURL: import.meta.env.VITE_API_URL,
      timeout: config.timeout || 20000,
      headers: config.headers || { 'Content-Type': 'application/json' },
      withCredentials: true,
    }

    this.axiosInstance = axios.create(this.defaultConfig)

    // Пример interceptor'ов
    this.axiosInstance.interceptors.request.use(this.handleRequest.bind(this), this.handleError.bind(this))
    this.axiosInstance.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this))
  }

  // Метод для обработки запроса перед его отправкой
  private handleRequest(config: CustomAxiosInternalRequestConfig): CustomAxiosInternalRequestConfig | Promise<CustomAxiosInternalRequestConfig> {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers.Authorization = `${authStore.accessToken}`
    }

    return config
  }

  // Метод для обработки ответа
  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response
  }

  private isRefreshing: boolean = false // Flag to prevent multiple refresh requests
  private refreshFailed: boolean = false // Flag to prevent infinite retry loops
  private async handleError(error: AxiosError): Promise<AxiosResponse | void> {
    const originalRequest = error.config as CustomAxiosInternalRequestConfig

    if (error.config?.url?.includes('auth/refresh-tokens') && error.response?.status === 401) {
      throw error
    }

    if (!originalRequest) {
      return
    }

    if (this.refreshFailed) {
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true

      if (!this.isRefreshing) {
        this.isRefreshing = true

        try {
          const authStore = useAuthStore()
          await authStore.refresh()

          this.isRefreshing = false

          return this.axiosInstance.request(originalRequest)
        }
        catch (e) {
          this.isRefreshing = false
          this.refreshFailed = true
          return Promise.reject(e)
        }
      }
      else {
        return new Promise((resolve): void => {
          const checkIfDone = (): void => {
            if (!this.isRefreshing) {
              resolve(this.axiosInstance.request(originalRequest))
            }
            else {
              setTimeout(checkIfDone, 100)
            }
          }
          checkIfDone()
        })
      }
    }

    return Promise.reject(error)
  }

  private request<ResT, ReqT = unknown>(
    method: HttpMethod,
    url: MaybeRef<string>,
    config: UseAxiosOptions<ReqT, ResT> = {},
  ): UseAxiosReturn<ResT> {
    const mergedConfig: UseAxiosOptions<ReqT, ResT> = {
      method,
      ...config,
      ...this.defaultConfig,
    }

    return useAxios<ResT, ReqT>(url, mergedConfig, this.axiosInstance)
  }

  // Основные методы для выполнения запросов
  public get<ResT = unknown>(url: MaybeRef<string>, config?: UseAxiosOptions<never, ResT>): UseAxiosReturn<ResT> {
    return this.request<ResT>(HttpMethod.GET, url, config)
  }

  public post<ResT = unknown, ReqT = unknown>(url: string, data: ReqT, config?: UseAxiosOptions<ReqT, ResT>): UseAxiosReturn<ResT> {
    return this.request<ResT, ReqT>(HttpMethod.POST, url, { data, ...config })
  }

  public put<ResT = unknown, ReqT = unknown>(url: string, data: ReqT, config?: UseAxiosOptions<ReqT, ResT>): UseAxiosReturn<ResT> {
    return this.request<ResT, ReqT>(HttpMethod.PUT, url, { data, ...config })
  }

  public patch<ResT = unknown, ReqT = unknown>(url: string, data: ReqT, config?: UseAxiosOptions<ReqT, ResT>): UseAxiosReturn<ResT> {
    return this.request<ResT, ReqT>(HttpMethod.PATCH, url, { data, ...config })
  }

  public delete<ResT = unknown>(url: string, config?: UseAxiosOptions<never, ResT>): UseAxiosReturn<ResT> {
    return this.request<ResT>(HttpMethod.DELETE, url, config)
  }

  // Метод для обновления конфигурации сервиса
  public updateConfig(config: HttpServiceConfig): void {
    this.defaultConfig = { ...this.defaultConfig, ...config }
    Object.assign(this.axiosInstance.defaults, this.defaultConfig)
  }
}

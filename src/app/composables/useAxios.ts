import type { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios'
import axios from 'axios'

export interface UseAxiosOptions<ReqT> extends AxiosRequestConfig<ReqT> {
  immediate?: boolean
  lazy?: boolean
  watch?: MaybeRef<any>[]
  cancelPrevious?: boolean
}

export interface UseAxiosReturn<ResT> {
  data: Ref<ResT | undefined>
  error: Ref<AxiosError | undefined>
  loading: Ref<boolean>
  execute: (config?: AxiosRequestConfig) => Promise<void>
  cancel: (message?: string) => void
}

export function useAxios<ResT = unknown, ReqT = unknown>(
  url: MaybeRef<string>,
  options: UseAxiosOptions<ReqT> = {},
): UseAxiosReturn<ResT> {
  const {
    immediate = true,
    lazy = false,
    cancelPrevious = true,
    ...axiosOptions
  } = options

  const data = ref<ResT>()
  const error = ref<AxiosError>()
  const loading = ref(false)
  let cancelTokenSource: CancelTokenSource | null = null

  const execute = async (overrideConfig: AxiosRequestConfig = {}) => {
    try {
      if (cancelPrevious && cancelTokenSource) {
        cancelTokenSource.cancel('Request canceled by new execution')
      }

      loading.value = true
      error.value = undefined

      cancelTokenSource = axios.CancelToken.source()

      const finalConfig: AxiosRequestConfig = {
        baseURL: axiosOptions.baseURL,
        method: axiosOptions.method || 'GET',
        params: toValue(axiosOptions.params),
        url: toValue(url),
        data: toValue(axiosOptions.data),
        headers: toValue(axiosOptions.headers),
        cancelToken: cancelTokenSource.token,
        ...overrideConfig,
      }

      const response = await axios.request<ResT>(finalConfig)
      data.value = response.data
    }
    catch (e) {
      if (!axios.isCancel(e)) {
        error.value = e as AxiosError
      }
    }
    finally {
      loading.value = false
    }
  }

  const cancel = (message = 'Request canceled') => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel(message)
    }
  }

  const watchSources = [
    axiosOptions.url,
    axiosOptions.params,
    axiosOptions.data,
    ...(axiosOptions.watch || []),
  ].filter(Boolean)

  if (immediate && !lazy) {
    execute()
  }

  watch(watchSources, () => {
    execute()
  }, { deep: true })

  return {
    data,
    error,
    loading,
    execute,
    cancel,
  }
}

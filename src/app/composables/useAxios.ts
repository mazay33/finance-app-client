import type { AxiosError, AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'

import axios from 'axios'
import { computed, type MaybeRef, ref, type ShallowRef, shallowRef, toValue, watch } from 'vue'

export interface UseAxiosOptions<ReqT, ResT> extends AxiosRequestConfig<ReqT> {
  immediate?: boolean
  watch?: MaybeRef<any>[]
  cancelPrevious?: boolean
  deepWatch?: boolean
  transform?: (data: ResT) => any
}

export interface UseAxiosReturn<TransformedT> {
  data: ShallowRef<TransformedT | undefined>
  error: ShallowRef<AxiosError | undefined>
  loading: Readonly<Ref<boolean>>
  execute: (config?: AxiosRequestConfig) => Promise<void>
  cancel: (message?: string) => void
}

export function useAxios<ResT = unknown, ReqT = unknown, TransformedT = ResT>(
  url: MaybeRef<string>,
  options: UseAxiosOptions<ReqT, ResT> & { transform?: (data: ResT) => TransformedT } = {},
  axiosInstance: AxiosInstance = axios,
): UseAxiosReturn<TransformedT> {
  const {
    immediate = true,
    cancelPrevious = true,
    deepWatch = true,
    watch: watchSourcesOption = [],
    transform,
    ...axiosOptions
  } = options

  const data = shallowRef<TransformedT>()
  const error = shallowRef<AxiosError>()
  const loading = ref(false)
  let cancelTokenSource: CancelTokenSource | null = null

  const resolvedConfig = computed(() => ({
    url: toValue(url),
    method: axiosOptions.method || 'GET',
    params: toValue(axiosOptions.params),
    data: toValue(axiosOptions.data),
    headers: toValue(axiosOptions.headers),
    baseURL: axiosOptions.baseURL,
  }))

  const execute = async (overrideConfig: AxiosRequestConfig = {}): Promise<void> => {
    try {
      if (cancelPrevious && cancelTokenSource) {
        cancelTokenSource.cancel('Request canceled by new execution')
      }

      loading.value = true
      error.value = undefined
      cancelTokenSource = axios.CancelToken.source()

      const response = await axiosInstance.request<ResT>({
        ...resolvedConfig.value,
        ...overrideConfig,
        cancelToken: cancelTokenSource.token,
      })

      data.value = transform ? transform(response.data) : response.data as unknown as TransformedT
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

  const cancel = (message = 'Request canceled'): void => {
    cancelTokenSource?.cancel(message)
  }

  if (immediate) {
    execute()
  }

  const watchSources = [...watchSourcesOption].filter(Boolean)

  watch(
    watchSources,
    async () => {
      await execute()
    },
    { deep: deepWatch },
  )

  return {
    data,
    error,
    loading: loading as Readonly<Ref<boolean>>,
    execute,
    cancel,
  }
}

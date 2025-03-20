import { AxiosError, isAxiosError } from 'axios'

interface IUseErrorHandler {
  throwError: (customMessage?: string) => void
  watchError: (customMessage?: string) => void
}

export function useErrorHandler(
  errorRef: Ref<Error | null | undefined>,
  defaultMessage?: string,
): IUseErrorHandler {
  const throwError = (customMessage?: string): void => {
    if (!errorRef.value)
      return

    const message = customMessage || defaultMessage || errorRef.value.message

    if (isAxiosError(errorRef.value)) {
      const axiosError = errorRef.value
      const newError = new AxiosError(
        message,
        axiosError.code,
        axiosError.config,
        axiosError.request,
        axiosError.response,
      )
      throw newError // Throw the new AxiosError
    }
    else {
      throw new Error(message) // For non-Axios errors
    }
  }

  const watchError = (customMessage?: string): void => {
    watch(errorRef, (newError) => {
      if (newError) {
        throwError(customMessage)
      }
    }, { immediate: true })
  }

  return {
    throwError,
    watchError,
  }
}

import type { IApiError } from '@/app/utils'

import type { ILoginRequestData } from '../types'
import { useApiService } from '@/app/services'
import { useUserStore } from '@/app/store'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const apiService = useApiService()
  const accessToken = ref<string>()
  const isAuthenticated = computed<boolean>(() => !!accessToken.value)
  const router = useRouter()
  const error = ref<IApiError>()

  const getMe = async (): Promise<void> => {
    const { data, error, execute } = await apiService.auth.me({ immediate: false })
    await execute()
    if (error.value) {
      router.push('/auth/login')
      return
    }

    const userStore = useUserStore()
    if (data.value) {
      userStore.setUser(data.value)
    }
  }

  const login = async (data: ILoginRequestData): Promise<void> => {
    const { data: token, error, execute } = apiService.auth.login(data, { immediate: false })
    await execute()
    if (error.value) {
      return
    }
    accessToken.value = token.value?.accessToken

    getMe()
  }

  const refresh = async (): Promise<void> => {
    const { data, error, execute } = apiService.auth.refresh({ immediate: false })
    await execute()
    if (error.value) {
      router.push('/auth/login')
      return
    }

    if (!data.value)
      return

    accessToken.value = data.value?.accessToken
  }

  // const refreshToken = async (token: string): Promise<void> => {
  //   const response = await apiService.auth.refreshToken(token)

  //   if (response.isError()) {
  //     router.push('/auth/login')
  //     return
  //   }

  //   const { access_token, refresh_token } = response.value.data.data
  //   ExpiringStorage.set('access_token', `Bearer ${access_token}`)
  //   ExpiringStorage.set('refresh_token', `Bearer ${refresh_token}`)
  // }

  // const logout = async (): Promise<void> => {
  //   const isForcedLogin = ExpiringStorage.get('is_forced_login')

  //   if (isForcedLogin) {
  //     const token = ExpiringStorage.get('access_token_temp')
  //     const refreshToken = ExpiringStorage.get('refresh_token_temp')
  //     ExpiringStorage.remove('is_forced_login')
  //     ExpiringStorage.remove('access_token')
  //     ExpiringStorage.remove('refresh_token')

  //     ExpiringStorage.set('access_token', `Bearer ${token}`)
  //     ExpiringStorage.set('refresh_token', `Bearer ${refreshToken}`)
  //     window.location.reload()
  //     return
  //   }

  //   const response = await apiService.auth.logout()

  //   if (response.isError()) {
  //     return
  //   }

  //   user.value = undefined
  //   const userStore = useUserStore()
  //   userStore.clearUser()
  //   router.push('/auth/login')
  // }

  return {
    accessToken,
    login,
    isAuthenticated,
    error,
    getMe,
    refresh,
  }
})

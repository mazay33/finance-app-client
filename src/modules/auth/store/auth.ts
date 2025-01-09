import type { IApiError } from '@/app/utils'

import type { ILoginRequestData } from '../types'
import { useApiService } from '@/app/services'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const apiService = useApiService()
  const accessToken = ref<string>()
  const isAuthenticated = computed<boolean>(() => !!accessToken.value)
  // const router = useRouter()
  const error = ref<IApiError>()

  const login = async (data: ILoginRequestData): Promise<void> => {
    const response = await apiService.auth.login(data)

    if (response.isError()) {
      error.value = response.error
      return
    }

    accessToken.value = response.value.data.accessToken
  }

  // const getMe = async (): Promise<void> => {
  //   const response = await apiService.auth.getMe()

  //   if (response.isError()) {
  //     router.push('/auth/login')
  //     return
  //   }

  //   user.value = response.value.data.data
  //   const userStore = useUserStore()
  //   userStore.setUser(user.value)
  // }

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
  }
})

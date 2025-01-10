import { defineStore } from 'pinia'
import { type IUser, ROLE } from '../types'
import { ExpiringStorage } from '../utils/ExpiringStorage'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(ExpiringStorage.get('user'))

  const isAdmin = computed<boolean>(() => {
    if (!user.value) {
      return false
    }
    return user.value.roles.includes(ROLE.ADMIN)
  })

  const setUser = (_user: IUser): void => {
    ExpiringStorage.set('user', _user)
    user.value = _user
  }

  const clearUser = (): void => {
    user.value = null
    ExpiringStorage.remove('user')
  }

  return {
    user,
    isAdmin,
    setUser,
    clearUser,
  }
})

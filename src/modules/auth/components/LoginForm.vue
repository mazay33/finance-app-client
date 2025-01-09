<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useAuthStore } from '../store'

const authStore = useAuthStore()

const isLoading = ref(false)

const { errors, defineField, validate, setTouched } = useForm({

  validationSchema: object({
    email: string().email('Некорректная почта').required('Поле обязательно для заполнения'),
    password: string().required('Поле обязательно для заполнения').min(4, 'Минимальная длина пароля 4 символов'),
  }),
})

setTouched({
  email: true,
  password: false,
})

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
})
const [password, passwordAttrs] = defineField('password', {
  validateOnBlur: true,
  validateOnChange: false,
  validateOnModelUpdate: false,
})

async function login(): Promise<void> {
  const { valid } = await validate()
  if (!valid)
    return

  const requestLoginData = {
    email: email.value,
    password: password.value,
  }

  isLoading.value = true
  await authStore.login(requestLoginData)

  if (authStore.error) {
    console.error(authStore.error)
  }

  // if (authStore.isAuthenticated) {
  //   await router.push('/')
  // }

  isLoading.value = false
}

// function handleKeydown(e: KeyboardEvent): void {
//   if (e.key === 'Enter') {
//     login()
//   }
// }
</script>

<template>
  <form class=" flex-col flex items-center justify-center ">
    <h1 class="text-2xl font-bold mb-2">
      Авторизация
    </h1>
    <h2 class="text-lg dark:text-gray-400 mb-6">
      Еще нет аккаунта?
      <router-link class="text-cyan-400" to="/auth/register">
        Зарегистрируйся
      </router-link>
    </h2>
    <div class="space-y-6 flex flex-col w-full mb-8">
      <div class="relative flex flex-col gap-2 w-full">
        <label for="username">Электронная почта</label>
        <InputText
          id="username"
          v-model="email"
          v-bind="emailAttrs"
          :invalid="!!errors.email"
        />
        <small class="absolute bottom-[-16px] left-1 w-full text-[10px] text-red-500">
          {{
            errors.email
          }}
        </small>
      </div>

      <div class="relative flex flex-col gap-2 w-full">
        <label for="password">Пароль</label>
        <Password
          id="password" v-model="password" v-bind="passwordAttrs"
          :invalid="!!errors.password" :feedback="false" toggle-mask :pt="{ pcInputText: { root: 'w-full' } }"
        />
        <small class="absolute bottom-[-16px] left-1 w-full text-[10px] text-red-500">
          {{
            errors.password
          }}
        </small>
      </div>
    </div>

    <Button label="Продолжить" rounded icon="pi pi-arrow-right !mt-1" icon-pos="right" class="w-full" @click="login()" />

    <Divider :pt="{ content: '!bg-inherit mb-1' }" align="center">
      <b>Или</b>
    </Divider>

    <button type="button" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white aria-disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 dark:aria-disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 w-full flex justify-center items-center">
      <span class="pi pi-github" aria-hidden="true" /><span class="">Войти с помощью GitHub</span>
    </button>
  </form>
</template>

<style scoped>

</style>

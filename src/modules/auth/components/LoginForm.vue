<script setup lang="ts">

</script>

<template>
  <form class=" flex-col flex items-center justify-center space-y-6">
    <h1 class="text-2xl font-bold ">
      Авторизация
    </h1>
    <h2 class="text-lg dark:text-gray-400 ">
      Еще нет аккаунта?
      <router-link class="text-cyan-400" to="/auth/register">
        Зарегистрируйся
      </router-link>
    </h2>
    <div class="flex flex-col gap-2 w-full">
      <label for="username">Электронная почта</label>
      <InputText id="username" />
    </div>

    <div class="flex flex-col gap-2 w-full">
      <label for="password">Пароль</label>
      <InputText id="password" />
    </div>

    <Button label="Продолжить" rounded icon="pi pi-arrow-right !mt-1" icon-pos="right" class="w-full " />

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

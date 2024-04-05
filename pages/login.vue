<script setup lang="ts">
import { navigateTo } from '#app';
import { auth } from '~/api/admin';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore();
const { token } = storeToRefs(generalStore);

const authStatus = ref<any>();
const correctDate = ref<boolean>(true);

const user = ref({
  username: '',
  password: '',
});

const handleAuth = async () => {
  authStatus.value = await auth(user.value);

  if (authStatus.value && process.client) {
    token.value = authStatus.value.access_token;
    useLocalStorage('token', authStatus.value.access_token);
    navigateTo({ path: '/' });
  }
};
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <form
      class="bg-white dark:bg-neutral-900 p-4 rounded-[10px]"
      @keydown.enter="handleAuth()"
    >
      <div class="text-2xl font-bold text-center mb-4">Авторизация</div>
      <div>Логин</div>
      <UInput
        v-model="user.username"
        class="mb-4"
        color="white"
        :trailing="false"
        placeholder="Search..."
      />
      <div>Пароль</div>
      <UInput
        v-model="user.password"
        type="password"
        class="mb-4"
        color="white"
        :trailing="false"
        placeholder="Search..."
      />
      <UButton
        label="Войти"
        @click="handleAuth()"
      />
      <div v-if="!correctDate">неправильный логин или пароль</div>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>

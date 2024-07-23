<script setup lang="ts">
import { auth } from '~/api/admin';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'empty',
});

const ui = {
  icon: {
    trailing: {
      pointer: '',
    },
  },
  rounded: 'rounded-[10px]',
  variant: {
    none: 'bg-white dark:bg-neutral-900  border-1 shadow-0 focus:ring-{color}-500 dark:focus:ring-{color}-400',
  },
};

const generalStore = useGeneralStore();
const { token } = storeToRefs(generalStore);

const authStatus = ref<any>();
const isUncorrectedUser = ref<boolean>(false);

const user = ref({
  username: '',
  password: '',
});

const handleAuth = async () => {
  try {
    authStatus.value = await auth(user.value);
    token.value = authStatus.value.access_token;
    useLocalStorage('token', authStatus.value.access_token);
    navigateTo({ path: '/' });
  } catch (e) {
    isUncorrectedUser.value = true;
  }
};
</script>

<template>
  <div class="wrapper">
    <UForm class="login-form">
      <div class="login-form__header">Авторизация</div>
      <div class="login-form__uncorrected" v-if="isUncorrectedUser">
        Неправильный логин или пароль
      </div>
      <UInput
        class="login-form__field"
        placeholder="Логин"
        :ui="ui"
        color="white"
        variant="none"
        v-model="user.username"
      />
      <UInput
        class="login-form__field"
        placeholder="Пароль"
        :ui="ui"
        color="white"
        variant="none"
        type="password"
        v-model="user.password"
      />
      <UButton
        class="login-form__btn"
        label="Войти"
        @click="handleAuth"
        @keydown.enter="handleAuth"
      />
    </UForm>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply flex flex-col items-center justify-center h-screen w-full;

  .login-form {
    @apply w-1/5 bg-white dark:bg-neutral-900 p-4 rounded-[10px];

    &__header {
      @apply text-xl font-bold mb-2 text-center;
    }

    &__uncorrected {
      @apply text-red-500 text-sm mb-2;
    }

    &__field {
      @apply mb-4;
    }

    &__btn {
      @apply w-full;
    }
  }
}
</style>

<script setup lang="ts">
import { navigateTo, setPageLayout } from '#app';
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
  console.log(authStatus.value);

  if (authStatus.value && process.client) {
    token.value = authStatus.value.data.access_token;
    useLocalStorage('token', authStatus.value.access_token);
    navigateTo({ path: '/' });
  }
};

setPageLayout('empty');
</script>

<template>
  <div class="container">
    <el-form class="login" @keydown.enter="handleAuth()">
      <div class="login__header">Авторизация</div>
      <div class="login__item">
        <div class="login__icon">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </div>
        <el-input class="login__name" v-model="user.username" />
      </div>
      <div class="login__item">
        <div class="login__icon">
          <font-awesome-icon :icon="['fas', 'key']" />
        </div>
        <el-input type="password" show-password class="login__name" v-model="user.password" />
      </div>
      <el-button class="login__btn" @click="handleAuth">Войти</el-button>
      <div v-if="!correctDate">неправильный логин или пароль</div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 300px;
  height: 400px;
  background: var(--el-bg-color);
  padding: 10px;
  border-radius: 10px;

  &__header {
    text-align: center;
    font-weight: bold;
    font-size: 1.3rem;
    margin: 1vh 0;
  }

  &__item {
    margin: 5vh 0;
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 10px;
    color: #007bff;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 60px;
  }
}

:deep(.el-input__wrapper) {
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid gray;
}

:deep(.el-button) {
  border-radius: 10px;
}
</style>

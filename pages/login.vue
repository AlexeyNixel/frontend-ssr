<script setup lang='ts'>
import { setPageLayout } from '#app';

const user = ref({
  username: '',
  password: '',
});

setPageLayout('empty');
</script>

<template>
  <div class='container'>
    <el-form class='login'>
      <div class='login__header'>Авторизация</div>
      <div class='login__item'>
        <span>Логин</span>
        <el-input class='login__name' v-model='user.username' />
      </div>
      <div class='login__item'>
        <span>Пароль</span>
        <el-input
          type='password'
          show-password
          class='login__name'
          v-model='user.password' />
      </div>
      <el-button class='login__btn'>Войти</el-button>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>
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
    font-size: 1.2rem;
  }

  &__item {
    margin: 3vh 0;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

}
</style>
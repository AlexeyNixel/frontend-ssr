<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore();
const { isWorkTime } = storeToRefs(generalStore);
</script>

<template>
  <UModal v-model="isWorkTime">
    <div class="p-4">
      <div class="text-xl">Время работы библиотеки</div>
      <p class="my-3">
        C 1 сентября по 31 мая: <br />
        вторник – пятница с 10.00 до 20.00,<br />
        суббота – воскресенье с 10.00 до 19.00,<br />
        понедельник – выходной день.<br />
      </p>
      <p class="my-3">
        C 1 июня по 31 августа:<br />
        понедельник – суббота с 10.00 до 19.00,<br />
        воскресенье – выходной день.<br />
      </p>
      <p>Последний день месяца - технический день.<br /></p>
      <p class="my-3">
        Условия посещения: бесплатно. Запись по предъявлению паспорта.<br />
      </p>
    </div>
  </UModal>
</template>

<style scoped lang="scss"></style>

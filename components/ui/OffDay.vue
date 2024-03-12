<script lang="ts" setup>
import dayjs from 'dayjs';

const date = ref<Date>(dayjs(new Date()).format('DD.MM'));
</script>

<template>
  <div class="w-full h-full">
    <div
      v-if="'31.08' < date < '01.06'"
      class="w-full h-full flex flex-col justify-center items-center"
    >
      <div class="font-bold text-lg">Время работы библиотеки <br /></div>
      вторник – пятница с 10.00 до 20.00,<br />
      суббота – воскресенье с 10.00 до 19.00,<br />
      понедельник – выходной день.<br />
      Последний день месяца - технический день.<br />
    </div>
    <div v-else class="w-full h-full flex flex-col justify-center items-center">
      <div class="font-bold text-lg">Время работы библиотеки <br /></div>
      понедельник – суббота с 10.00 до 19.00,<br />
      воскресенье – выходной день.<br />
      Последний день месяца - технический день.<br />
    </div>
  </div>
</template>

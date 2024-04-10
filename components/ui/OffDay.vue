<script lang="ts" setup>
import dayjs from 'dayjs';

const date = ref<string>(dayjs(new Date()).format('DD.MM'));
</script>

<template>
  <div class="w-full h-full">
    <div
      v-if="'31.08' < date < '01.06'"
      class="flex flex-col items-center justify-center mb-[100px] h-full"
    >
      <div class="font-bold text-lg">Время работы библиотеки <br /></div>
      вторник – пятница с 10.00 до 20.00,<br />
      суббота – воскресенье с 10.00 до 19.00,<br />
      понедельник – выходной день.<br />
      Последний день месяца - технический день.<br />
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center m-auto h-full"
    >
      <div class="font-bold text-lg">Время работы библиотеки <br /></div>
      понедельник – суббота с 10.00 до 19.00,<br />
      воскресенье – выходной день.<br />
      Последний день месяца - технический день.<br />
    </div>
  </div>
</template>

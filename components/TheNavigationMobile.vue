<script setup lang="ts">
const buttons = [
  {
    title: 'Читателям',
    value: 'COMMON',
    color: 'red',
  },
  {
    title: 'О библиотеке',
    value: 'ABOUT',
    color: 'green',
  },
  {
    title: 'Коллегам',
    value: 'COLLEAGUES',
    color: 'orange',
  },
  {
    title: 'Документы',
    value: 'DOCUMENTS',
    color: 'blue',
  },
];
</script>

<template>
  <div class="overflow-x-scroll flex my-2">
    <NuxtLink
      :class="`flex items-center text-sm mx-2 justify-between py-2 px-4 shrink-0  rounded-[10px] text-white font-bold bg-${item.color}-500`"
      :to="`/menu/${item.value}`"
      v-for="item in buttons"
      :key="item.value"
    >
      {{ item.title }}
    </NuxtLink>
  </div>
</template>

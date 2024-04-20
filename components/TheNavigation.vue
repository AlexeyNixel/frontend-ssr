<script setup lang="ts">
import { NavigationElementTheReader } from '#components';
import { NavigationElementTheAbout } from '#components';
import { NavigationElementTheColleagues } from '#components';
import { NavigationElementTheDocuments } from '#components';

const currentMenu = ref<any>();
const ui = {
  default: {
    color: '',
  },
  color: {
    red: {
      solid: 'bg-red-500 hover:bg-red-600 dark:text-gray-900 transition',
    },
    green: {
      solid: 'bg-green-500 hover:bg-green-600 dark:text-gray-900 transition',
    },
  },
};

const buttons = [
  {
    title: 'Читателям',
    value: 'reader',
    link: 'COMMON',
    color: 'red',
  },
  {
    title: 'О библиотеке',
    value: 'about',
    link: 'ABOUT',
    color: 'green',
  },
  {
    title: 'Коллегам',
    value: 'colleagues',
    link: 'COLLEAGUES',
    color: 'orange',
  },
  {
    title: 'Документы',
    value: 'documents',
    link: 'DOCUMENTS',
    color: 'blue',
  },
];

const components: { [key: string]: any } = {
  reader: NavigationElementTheReader,
  about: NavigationElementTheAbout,
  colleagues: NavigationElementTheColleagues,
  documents: NavigationElementTheDocuments,
};

const swapMenus = (menu: any) => {
  if (currentMenu.value === menu) {
    currentMenu.value = '';
    return;
  }
  currentMenu.value = menu;
};
</script>

<template>
  <div
    class="hidden lg:block my-4 p-4 bg-white dark:bg-neutral-900 rounded-[10px]"
  >
    <div class="flex justify-between">
      <UButton
        :ui="ui"
        :color="item.color"
        class="w-[20%] py-3 rounded-[10px] flex text-white font-bold justify-center active:scale-[0.9] transition"
        :label="item.title"
        v-for="item in buttons"
        :key="item.value"
        @click="swapMenus(item.value)"
      />
    </div>
  </div>
  <Transition
    :duration="300"
    name="nested"
  >
    <component :is="components[currentMenu]" />
  </Transition>
  <div class="block lg:hidden">
    <Swiper
      :slidesPerView="2.5"
      :spaceBetween="2"
      class="h-full my-4"
      trigger="click"
    >
      <SwiperSlide
        class="flex rounded-[10px] w-full px-1"
        v-for="item in buttons"
        :key="item.value"
      >
        <NuxtLink
          :class="`flex items-center  text-sm mx-2 justify-center py-2 px-4 shrink-0  rounded-[10px] text-white font-bold bg-${item.color}-500`"
          :to="`/menu/${item.link}`"
        >
          {{ item.title }}
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.nested-enter-active,
.nested-leave-active {
  max-height: 400px;
  overflow: hidden;
  transition: max-height 0.3s;
}

.nested-leave-active {
  transition-delay: 0.3s;
}

.nested-enter-from,
.nested-leave-to {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
</style>

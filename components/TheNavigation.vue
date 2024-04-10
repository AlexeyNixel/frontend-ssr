<script setup lang="ts">
import TheReader from '~/components/navigationElement/TheReader.vue';
import TheAbout from '~/components/navigationElement/TheAbout.vue';
import TheColleagues from '~/components/navigationElement/TheColleagues.vue';
import TheDocuments from '~/components/navigationElement/TheDocuments.vue';

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
    color: 'red',
  },
  {
    title: 'О библиотеке',
    value: 'about',
    color: 'green',
  },
  {
    title: 'Коллегам',
    value: 'colleagues',
    color: 'orange',
  },
  {
    title: 'Документы',
    value: 'documents',
    color: 'blue',
  },
  // {
  //   title: 'Что почитать',
  //   value: 'about',
  //   color: 'purple',
  // },
];

const components: { [key: string]: any } = {
  reader: TheReader,
  about: TheAbout,
  colleagues: TheColleagues,
  documents: TheDocuments,
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
  <div class="my-4 p-4 bg-white dark:bg-neutral-900 rounded-[10px]">
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

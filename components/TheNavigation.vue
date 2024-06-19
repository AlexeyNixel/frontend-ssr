<script setup lang="ts">
import {
  NavigationElementTheAbout,
  NavigationElementTheColleagues,
  NavigationElementTheDocuments,
  NavigationElementTheReader,
} from '#components';

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
  <div class="navigation">
    <UButton
      v-for="item in buttons"
      :key="item.value"
      class="navigation__button"
      :ui="ui"
      :color="item.color"
      :label="item.title"
      @click="swapMenus(item.value)"
    />
  </div>
  <Transition :duration="300" name="nested">
    <component :is="components[currentMenu]" />
  </Transition>
  <div class="navigation-mobile">
    <Swiper
      :slidesPerView="2.5"
      :spaceBetween="2"
      class="slider"
      trigger="click"
    >
      <SwiperSlide
        class="slider__item"
        v-for="item in buttons"
        :key="item.value"
      >
        <NuxtLink
          :class="`slider__link bg-${item.color}-500`"
          :to="`/menu/${item.link}`"
        >
          {{ item.title }}
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  @apply hidden justify-between lg:flex my-4 p-4 bg-white dark:bg-neutral-900 rounded-[10px];

  &__button {
    @apply w-[20%] py-3 rounded-[10px] flex text-white font-bold justify-center active:scale-[0.9] transition;
  }
}

.navigation-mobile {
  @apply block lg:hidden;
  .slider {
    @apply h-full my-4;
    &__item {
      @apply flex rounded-[10px]  px-1;
    }
    &__link {
      @apply w-full flex items-center text-sm mx-2 justify-center py-2 px-4 shrink-0 rounded-[10px] text-white font-bold;
    }
  }
}

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

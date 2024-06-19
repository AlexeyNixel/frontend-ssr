<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';
import { useRoute } from 'vue-router';

import type { MenuType } from '~/models/baseTypes';

const route = useRoute();
const menuStore = useMenuStore();
const menus = ref<MenuType[]>();

menus.value = await menuStore.getMenus({
  type: route.params.slug as string,
  include: 'menuItems',
});
</script>

<template>
  <Head>
    <Title>Меню</Title>
  </Head>
  <div class="menus">
    <div class="menu" v-for="menu in menus">
      <div class="menu__title">{{ menu.title }}</div>
      <div class="menu__link" v-for="link in menu.menuItems">
        <NuxtLink
          class="link"
          :to="!link.link ? '/document/' + link.slug : link.link"
          :target="link.link ? '_blank' : '_self'"
        >
          {{ link.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menus {
  .menu {
    @apply my-3;
    &__title {
      @apply font-bold text-lg text-blue-500;
    }
    &__link {
      @apply py-1 w-full;
      .link {
        @apply text-black dark:text-white;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { type MenuType, useNavigationStore } from '~/entities/navigation';

const menuStore = useNavigationStore();
const menus = ref<MenuType[]>();

menus.value = await menuStore.getMenus({
  type: 'DOCUMENTS',
  include: 'menuItems',
});

menus.value?.sort((a, b) => (a.oldId < b.oldId ? -1 : 1));
</script>

<template>
  <div>
    <div :class="menus.length > 3 ? 'menu_big' : 'menu'" v-if="menus">
      <div class="menu__item" v-for="menu in menus" :key="menu.id">
        <div class="title">{{ menu.title }}</div>
        <nuxt-link
          class="link"
          v-for="link in menu.menuItems"
          :key="link.id"
          :to="link.link ? link.link : '/document/' + link.slug"
          :external="!!link.link"
        >
          {{ link.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'styles.module.css';
</style>

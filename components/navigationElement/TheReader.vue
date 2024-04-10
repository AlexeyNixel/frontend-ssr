<script setup lang="ts">
import { useMenuStore } from '~/stores/menuStore';
import type { MenuType } from '~/models/baseTypes';
// import { MenuType } from '~/models/baseTypes';

const menuStore = useMenuStore();
const about = ref<MenuType[]>();

about.value = await menuStore.getMenus({
  type: 'COMMON',
  include: 'menuItems',
});

about.value?.sort((a, b) => (a.oldId < b.oldId ? -1 : 1));
</script>

<template>
  <div>
    <div
      class="grid grid-cols-4 bg-white dark:bg-neutral-900 py-3 px-5 rounded-[10px]"
    >
      <div
        class=""
        v-for="item in about"
        :key="item.id"
      >
        <div class="text-xl">{{ item.title }}</div>
        <div
          class="my-1 text-black odd:text-neutral-200"
          v-for="links in item.menuItems"
          :key="links.id"
        >
          <NuxtLink
            class="link"
            v-if="!links.link"
            :to="`document/${links.slug}`"
          >
            {{ links.title }}
          </NuxtLink>
          <NuxtLink
            class="link"
            v-else
            :to="links.link"
            external
            target="_blank"
          >
            {{ links.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link {
  @apply text-black dark:text-white hover:text-neutral-500 hover:underline;
}
</style>

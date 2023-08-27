<script setup lang='ts'>
import { useMenuStore } from '~/stores/menuStore';
import { MenuType } from '~/models/baseTypes';

const menuStore = useMenuStore();
const about = ref<MenuType[]>();

about.value = await menuStore.getMenus({
  searchByField: `menuType=ABOUT`,
  include: 'menuItems',
});

about.value?.sort((a, b) => (a.oldId < b.oldId ? -1 : 1));

</script>

<template>
  <div>
    <el-row class='navigation-content'>
      <el-col :span='8' class='navigation-content__block' v-for='item in about' :key='item.id'>
        <div class='navigation-content__title'>{{item.title}}</div>
        <div class='navigation-content__container' v-for='links in item.menuItems'>
          <NuxtLink class='navigation-content__link'>
            {{links.title}}
          </NuxtLink>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='scss'>
.navigation-content {
  background: var(--el-bg-color);
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 2px;

  &__title {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
}
</style>
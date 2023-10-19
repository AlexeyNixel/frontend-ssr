<script setup lang='ts'>
import TheReader from '~/components/navigationElement/TheReader.vue';
import TheAbout from '~/components/navigationElement/TheAbout.vue';
import TheColleagues from '~/components/navigationElement/TheColleagues.vue';
import TheDocuments from '~/components/navigationElement/TheDocuments.vue';

const currentMenu = ref<string>();

const tabs = {
  'reader': TheReader,
  'about': TheAbout,
  'colleagues': TheColleagues,
  'documents': TheDocuments,
};

const ruTabs = {
  'reader': 'Читателям',
  'about': 'О библиотеке',
  'colleagues': 'Коллегам',
  'documents': 'Документы',
}

const swapMenus = (menu: string) => {
  if (currentMenu.value === menu) {
    currentMenu.value = ''
    return
  }
  currentMenu.value = menu;
};
</script>

<template>
  <div class='navigation-menu'>
    <el-scrollbar >
      <div class='navigation-menu__btn-group' style='display: flex'>
        <el-button
          class='navigation-menu__btn'
          v-for='(item, name) in ruTabs'
          :key='name'
          @click='swapMenus(name)'
        >
          {{ item }}
        </el-button>
      </div>
    </el-scrollbar>
  </div>
  <Transition :duration='300' name='nested'>
    <component :is='tabs[currentMenu]' />
  </Transition>
</template>

<style scoped lang='scss'>
.navigation-menu {
  background: var(--el-bg-color);
  padding: 20px;
  border-radius: 10px;
  margin: 1vh 0;

  &__btn-group {
    display: flex;
    justify-content: space-between;
  }

  &__btn {
    width: 300px;
    height: 50px;
    color: white;
    border: none;
    border-radius: 10px;
    &:active {
      transform: scale(.9);
    }

    &:nth-child(1) {
      background: #F44242;
    }

    &:nth-child(2) {
      background: #6ea917;
    }

    &:nth-child(3) {
      background: #ff6600;
    }

    &:nth-child(4) {
      background: #4285f4;
    }
  }
}

.nested-enter-active, .nested-leave-active {
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
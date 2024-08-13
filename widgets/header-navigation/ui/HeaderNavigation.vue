<script setup lang="ts">
import { LibraryOnMapModal } from '~/widgets/library-on-map-modal/';
import { WorktimeLibraryModal } from '~/widgets/worktime-library-modal';

const ui = {
  size: {
    xl: 'text-4xl lg:text-4xl',
  },
  padding: {
    xl: 'p-1: lg:p-4',
  },
};

const router = useRouter();
const modal = useModal();
const darkMode = useDark();
const toggleDark = useToggle(darkMode);
const isOpen = ref(false);
const target = ref();

onClickOutside(target, () => {
  isOpen.value = false;
});

const openModal = (component: any) => {
  modal.open(component);
};

const buttons = ref([
  {
    icon: 'i-mdi-search',
    event: () => router.push('/entry/search/'),
    desc: 'Поиск',
    color: undefined,
  },
  {
    icon: 'i-mdi-bookshelf',
    event: () =>
      navigateTo('http://search.infomania.ru/jirbis2/', {
        external: true,
        open: { target: '_blanks' },
      }),
    desc: 'Электронный каталог',
    color: undefined,
  },
  {
    icon: 'i-mdi-map-marker',
    event: () => openModal(LibraryOnMapModal),
    desc: 'Мы на карте',
    color: undefined,
  },
  {
    icon: 'i-mdi-clock',
    event: () => openModal(WorktimeLibraryModal),
    desc: 'Часы работы',
    color: undefined,
  },
  {
    icon: 'i-mdi-wheelchair',
    event: () => navigateTo('/entry/dostupnaya-sreda-03-32-22-10-22'),
    desc: 'Доступная среда',
    color: undefined,
  },
  {
    icon: 'i-mdi-eye',
    event: () =>
      navigateTo('http://disabled.infomania.ru/', { external: true }),
    desc: 'Версия для слабовидящих',
    color: undefined,
  },
  {
    icon: 'i-mdi-academic-cap',
    event: () => navigateTo('/information'),
    desc: 'Сведения об организации, осуществляющей образовательную деятельность',
    color: undefined,
  },
  {
    icon: 'i-mdi-weather-night',
    event: () => toggleDark(),
    desc: 'Темная тема',
    color: 'orange',
  },
]);
</script>

<template>
  <nav class="navigation">
    <UTooltip v-for="(item, index) in buttons" :key="index" :text="item.desc">
      <UButton
        @click="item.event"
        variant="link"
        size="xl"
        :color="item.color ? item.color : 'blue'"
        :ui="ui"
      >
        <Icon :name="item.icon"></Icon>
      </UButton>
    </UTooltip>
  </nav>
  <div class="popover">
    <UButton variant="link" class="popover-open-btn" @click="isOpen = !isOpen">
      <Icon class="popover-open-btn__icon" name="i-heroicons-bars-3-16-solid" />
    </UButton>
    <transition name="fade">
      <div class="popover-links" v-if="isOpen" ref="target">
        <UButton
          class="popover-links__item"
          v-for="(item, index) in buttons"
          :key="index"
          @click="item.event"
          variant="link"
          size="xl"
          :color="item.color ? item.color : 'blue'"
          :ui="ui"
        >
          <Icon :name="item.icon"></Icon>
        </UButton>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  @apply hidden md:block;
}

.popover {
  @apply relative md:hidden;

  .popover-open-btn {
    @apply text-5xl;
  }

  .popover-links {
    @apply absolute flex flex-col z-50 bg-white dark:bg-neutral-900;
    @apply ring-1 ring-neutral-300 dark:ring-neutral-600 rounded-[10px];
    height: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  overflow: hidden;
  transition: max-height 0.3s;
  max-height: 450px;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>

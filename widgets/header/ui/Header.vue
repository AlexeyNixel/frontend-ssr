<script setup lang="ts">
import LibraryOnMapModal from '~/widgets/library-on-map-modal/ui/LibraryOnMapModal.vue';
import WorktimeLibraryModal from '~/widgets/worktime-library-modal/ui/WorktimeLibraryModal.vue';
import HeaderNavigation from '~/widgets/header-navigation/ui/HeaderNavigation.vue';

const router = useRouter();
const darkMode = useDark();
const toggleDark = useToggle(darkMode);
const modal = useModal();

const ui = {
  size: {
    xl: 'text-4xl lg:text-4xl',
  },
  padding: {
    xl: 'p-1: lg:p-4',
  },
};

const buttons = [
  {
    icon: 'i-mdi-search',
    event: () => router.push('/entry/search/'),
    desc: 'Поиск',
  },
  {
    icon: 'i-mdi-bookshelf',
    event: () =>
      navigateTo('http://search.infomania.ru/jirbis2/', {
        external: true,
        open: { target: '_blanks' },
      }),
    desc: 'Электронный каталог',
  },
  {
    icon: 'i-mdi-map-marker',
    event: () => openModal(LibraryOnMapModal),
    desc: 'Мы на карте',
  },
  {
    icon: 'i-mdi-clock',
    event: () => openModal(WorktimeLibraryModal),
    desc: 'Часы работы',
  },
  {
    icon: 'i-mdi-wheelchair',
    event: () => navigateTo('/entry/dostupnaya-sreda-03-32-22-10-22'),
    desc: 'Доступная среда',
  },
  {
    icon: 'i-mdi-eye',
    event: () =>
      navigateTo('http://disabled.infomania.ru/', { external: true }),
    desc: 'Версия для слабовидящих',
  },
  {
    icon: 'i-mdi-academic-cap',
    event: () => navigateTo('/information'),
    desc: 'Сведения об образовательной организации',
  },
];

const openModal = (component: any) => {
  modal.open(component);
};
</script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <img class="logo" src="/logo.png" alt="НОМБ" />
    </NuxtLink>
    <header-navigation />
  </header>
</template>

<style scoped lang="scss">
.header {
  @apply flex justify-between my-5 items-center;

  .logo {
    @apply w-40 lg:w-64;
  }
}
</style>

<script setup lang="ts">
import { ModalsLibraryOnMap, ModalsWorktimeLibrary } from '#components';
import { useModal } from '#ui/composables/useModal';
import type { Component } from '@nuxt/schema';

const router = useRouter();
const darkMode = useDark();
const toggleDark = useToggle(darkMode);
const modal = useModal();

const openModal = (component: Component) => {
  modal.open(component);
};

const ui = {
  size: {
    xl: 'text-4xl',
  },
  icon: {
    size: {
      xl: 'h-6 w-6 lg:h-8 lg:w-8',
    },
  },
};

const buttons = [
  {
    icon: 'i-mdi-search',
    event: () => router.push('/entry/search/'),
    style: '',
    desc: 'Поиск',
  },
  {
    icon: 'i-mdi-bookshelf',
    event: () =>
      navigateTo('http://search.infomania.ru/jirbis2/', {
        external: true,
        open: { target: '_blanks' },
      }),
    style: null,
    desc: 'Электронный каталог',
  },
  {
    icon: 'i-mdi-map-marker',
    event: () => openModal(ModalsLibraryOnMap),
    style: null,
    desc: 'Мы на карте',
  },
  {
    icon: 'i-mdi-clock',
    event: () => openModal(ModalsWorktimeLibrary),
    style: null,
    desc: 'Часы работы',
  },
  {
    icon: 'i-mdi-wheelchair',
    event: () => navigateTo('/entry/dostupnaya-sreda-03-32-22-10-22'),
    style: null,
    desc: 'Доступная среда',
  },
  {
    icon: 'i-mdi-eye',
    event: () =>
      navigateTo('http://disabled.infomania.ru/', { external: true }),
    style: null,
    desc: 'Версия для слабовидящих',
  },
  {
    icon: 'i-mdi-academic-cap',
    event: () => navigateTo('/information'),
    style: null,
    desc: 'Сведения об организации, осуществляющей образовательную деятельность',
  },
];
</script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <img
        class="logo"
        src="/logo.png"
        alt="НОМБ"
      />
    </NuxtLink>
    <nav class="navigation">
      <UTooltip
        v-for="(item, index) in buttons"
        :key="index"
        :text="item.desc"
      >
        <UButton
          @click="item.event"
          variant="link"
          size="xl"
          color="blue"
          :icon="item.icon"
          :ui="ui"
        >
        </UButton>
      </UTooltip>
      <client-only>
        <UTooltip text="Темная тема">
          <UButton
            color="orange"
            variant="link"
            @click="toggleDark()"
            :ui="ui"
            size="xl"
            :icon="
              darkMode ? 'i-mdi-weather-night' : 'i-mdi-white-balance-sunny'
            "
          >
          </UButton>
        </UTooltip>
      </client-only>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  @apply flex justify-between my-5 items-center;

  .logo {
    @apply w-40 lg:w-64;
  }

  .navigation {
    @apply grid md:grid-cols-8 grid-cols-4;
  }
}
</style>

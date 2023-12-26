<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '~/stores/generalStore';
import WorktimeLibrary from '~/components/modals/WorktimeLibrary.vue';
import LibraryOnMap from '~/components/modals/LibraryOnMap.vue';

const router = useRouter();

const generalStore = useGeneralStore();

const darkMode = useDark();
const toggleDark = useToggle(darkMode);
const { isMap } = storeToRefs(generalStore);
const { isWorkTime } = storeToRefs(generalStore);

const buttons = [
  {
    icon: 'mdi:magnify',
    event: () => router.push('/entry/search/'),
    style: '',
    desc: 'Поиск',
  },
  {
    icon: 'mdi:bookshelf',
    event: () =>
      navigateTo('http://search.infomania.ru/jirbis2/', {
        external: true,
        open: { target: '_blanks' },
      }),
    style: null,
    desc: 'Электронный каталог',
  },
  {
    icon: 'mdi:map-marker',
    event: () => (isMap.value = !isMap.value),
    style: null,
    desc: 'Мы на карте',
  },
  {
    icon: 'mdi:clock',
    event: () => (isWorkTime.value = !isWorkTime.value),
    style: null,
    desc: 'Часы работы',
  },
  {
    icon: 'mdi:wheelchair',
    event: () => navigateTo('/entry/dostupnaya-sreda-03-32-22-10-22'),
    style: null,
    desc: 'Доступная среда',
  },
  {
    icon: 'mdi:eye',
    event: () =>
      navigateTo('http://disabled.infomania.ru/', { external: true }),
    style: null,
    desc: 'Версия для слабовидящих',
  },
  {
    icon: 'fa-graduation-cap',
    event: () => navigateTo('/information', { external: true }),
    style: null,
    desc: 'Сведения об организации, осуществляющей образовательную деятельность',
  },
];
</script>

<template>
  <header class="flex justify-between my-5 items-center">
    <div class="">
      <NuxtLink to="/">
        <img class="w-40 lg:w-64" src="/logo.png" alt="" />
      </NuxtLink>
    </div>
    <div class="grid md:grid-cols-8 grid-cols-4">
      <UTooltip
        v-for="(item, index) in buttons"
        :key="index"
        :text="item.desc"
        :class="item.style"
      >
        <UButton color="blue" variant="link" @click="item.event">
          <Icon class="text-2xl lg:text-4xl" :name="item.icon" />
        </UButton>
      </UTooltip>
      <client-only>
        <UTooltip text="Темная тема">
          <UButton color="orange" variant="link" @click="toggleDark()">
            <Icon
              class="text-2xl lg:text-4xl"
              name="mdi:weather-night"
              v-if="darkMode"
            />
            <Icon
              class="text-2xl lg:text-4xl"
              name="mdi:white-balance-sunny"
              v-else
            />
          </UButton>
        </UTooltip>
      </client-only>
    </div>
  </header>
  <WorktimeLibrary />
  <LibraryOnMap />
</template>

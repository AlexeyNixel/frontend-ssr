<script lang="ts" setup>
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();

const infoIcon = [
  {
    icon: 'mdi:map-marker',
    title: 'г. Новосибирск, Красный проспект, 26',
  },
  {
    icon: 'mingcute:phone-fill',
    title: '(383) 210-10-53',
  },
  {
    icon: 'material-symbols:mail',
    title: 'noub@nso.ru',
  },
];

const socialIcon = [
  {
    icon: 'uil:vk',
    link: 'https://vk.com/oub_nsk',
  },
  {
    icon: 'mdi:youtube',
    link: 'https://www.youtube.com/user/noub77nsk',
  },
  {
    icon: 'tabler:brand-ok-ru',
    link: 'https://ok.ru/group/70000001168881',
  },
];
</script>

<template>
  <footer class="dark:bg-neutral-900 bg-blue-600 p-4 rounded-t-[10px]">
    <div class="flex">
      <div class="w-6/12">
        <div class="flex items-center" v-for="(item, index) in infoIcon">
          <Icon class="text-3xl text-white my-3 mr-3" :name="item.icon" />
          <div class="text-white">{{ item.title }}</div>
        </div>
      </div>
      <div class="w-6/12">
        <div class="">
          <div class="font-bold text-white">О нас</div>
          <div class="text-white">
            Новосибирская областная молодежная библиотека (НОМБ) работает с 1976
            г. У нас можно посмотреть фильмы, послушать музыку, выйти в
            Интернет, встретиться с интересными людьми и, разумеется, почитать
            книги. А еще — пообщаться с ровесниками и познакомиться с нашими
            молодежными клубами!
          </div>
        </div>
        <div class="flex">
          <NuxtLink
            class="mr-4"
            :to="item.link"
            external
            target="_blank"
            v-for="(item, index) in socialIcon"
            :key="index"
          >
            <Icon class="text-4xl text-white" :name="item.icon" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>

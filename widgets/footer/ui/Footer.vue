<script lang="ts" setup>
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();

const contactInfo = [
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

const socialsLinks = [
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
  <footer class="footer">
    <div class="footer__item contact-info">
      <div
        class="contact-info__item"
        v-for="(item, index) in contactInfo"
        :key="index"
      >
        <Icon class="contact-info__icon" :name="item.icon" />
        <div class="contact-info__title">{{ item.title }}</div>
      </div>
    </div>
    <div class="footer__item about-us">
      <div class="about-us__info">
        <h4 class="about-us__title font-bold">О нас</h4>
        <p class="about-us__description text-white">
          Новосибирская областная молодежная библиотека (НОМБ) работает с 1976
          г. У нас можно посмотреть фильмы, послушать музыку, выйти в Интернет,
          встретиться с интересными людьми и, разумеется, почитать книги. А еще
          — пообщаться с ровесниками и познакомиться с нашими молодежными
          клубами!
        </p>
      </div>
      <div class="socials-links">
        <NuxtLink
          class="socials-links__link"
          v-for="(item, index) in socialsLinks"
          :key="index"
          :to="item.link"
          target="_blank"
          external
        >
          <Icon :name="item.icon" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  @apply text-white dark:bg-neutral-900 bg-blue-600 p-4 rounded-t-[10px] flex flex-col-reverse lg:flex-row;

  &__item {
    @apply lg:w-6/12;
  }

  .contact-info {
    &__item {
      @apply flex items-center;
    }

    &__icon {
      @apply text-3xl text-white my-3 mr-3;
    }
  }

  .socials-links {
    &__link {
      @apply mr-4 text-4xl text-white hover:text-blue-500;
    }
  }
}
</style>

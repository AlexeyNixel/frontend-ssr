<script setup lang="ts">
const links = reactive([
  {
    title: 'Основные сведения',
    slug: '2021-10-12-osnovnye-svedenija',
  },
  {
    title: 'Структура библиотеки',
    slug: 'struktura-biblioteki-03-16-22-10-22',
  },
  {
    title: 'Документы',
    slug: '2021-10-12-dokumenty',
  },
  {
    title: 'Образование',
    slug: '2021-11-12-obrazovanie',
  },
  {
    title: 'Образовательные стандарты',
    slug: '2021-11-12-obrazovatelnye-standarty',
  },
  {
    title: 'Руководство. Педагогический (научно-педагогический) состав',
    slug: '2021-11-13-rukovodstvo-pedagogicheskij-nauchno-pedagogicheskij-sostav',
  },
  {
    title:
      'Материально-техническое обеспечение и оснащенность образовательного процесса',
    slug: '2021-11-13-materialno-tehnicheskoe-obespechenie-i-osnaschennost-obrazovatelnogo-protsessa',
  },
  {
    title: 'Стипендии и иные виды материальной поддержки',
    slug: '2021-11-13-stipendii-i-inye-vidy-materialnoj-podderzhki',
  },
  {
    title: 'Платные образовательные услуги',
    slug: '2021-11-13-platnye-obrazovatelnye-uslugi',
  },
  {
    title: 'Финансово-хозяйственная деятельность',
    slug: '2021-11-13-finansovo-hozjajstvennaja-dejatelnost',
  },
  {
    title: 'Вакантные места для приема (перевода)',
    slug: '2021-11-13-vakantnye-mesta-dlja-priema-perevoda',
  },
  {
    title: 'Архив мероприятий Учебного центра',
    slug: '2021-11-13-arhiv-meroprijatij-uchebnogo-tsentra',
  },
  {
    title: 'Планы реализации программ ДПО',
    slug: '2021-11-13-plany-realizatsii-programm-dpo',
  },
]);
</script>

<template>
  <div class="">
    <div class="text-2xl font-bold">
      Сведения об организации, осуществляющей образовательную деятельность
    </div>
    <NuxtLink
      v-for="link in links"
      :key="link.slug"
      :to="`/entry/${link.slug}`"
      class="flex flex-col text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-500 hover:underline odd:text-neutral-500 dark:odd:text-neutral-300 transition"
    >
      {{ link.title }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
const router = useRouter();

const darkMode = useDark();
const toggleDark = useToggle(darkMode);
const handleDarkModeOn = () => toggleDark();

const handleOpenTime = () => {
  ElMessageBox.alert(
    "<div class='dialog'>\n" +
      "        <div class='dialog-content'>\n" +
      "          <div class='dialog-content__title'>\n" +
      '            C 1 сентября по 31 мая:\n' +
      '          </div>\n' +
      '          вторник – пятница с 10.00 до 20.00, <br>\n' +
      '          суббота – воскресенье с 10.00 до 19.00,<br>\n' +
      '          понедельник – выходной день.<br>\n' +
      '          <br>\n' +
      "          <div class='dialog-content__title'>\n" +
      '            C 1 июня по 31 августа:\n' +
      '          </div>\n' +
      '          понедельник – суббота с 10.00 до 19.00,<br>\n' +
      '          воскресенье – выходной день.<br>\n' +
      '          <br>\n' +
      '          Последний день месяца - технический день.<br>\n' +
      '          <br>\n' +
      '          Условия посещения: бесплатно. Запись по предъявлению паспорта.<br>\n' +
      '        </div>\n' +
      '      </div>',
    'Время работы библиотеки',
    {
      customStyle: {
        borderRadius: '10px',
        boxShadow: 'none',
        border: 'none',
      },
      dangerouslyUseHTMLString: true,
    }
  );
};
const handleOpenMap = () => {
  ElMessageBox.alert(
    '<iframe\n' +
      "        class='map'\n" +
      "        src='https://yandex.ru/map-widget/v1/?um=constructor%3A952a94a4b33a6930b5ce54184df44d9a8f630cc4697ed47374222011683b6ded&amp;source=constructor'\n" +
      "        width='100%' height='700' />",
    'Время работы библиотеки',
    {
      dangerouslyUseHTMLString: true,
      customStyle: {
        borderRadius: '10px',
        boxShadow: 'none',
        border: 'none',
        width: '70vw',
      },
    }
  );
};
const buttons = [
  {
    icon: 'fa-solid fa-magnifying-glass',
    event: () => router.push('/entry/search/'),
    style: null,
    desc: 'Поиск',
  },
  {
    icon: 'fa-solid fa-map-location-dot',
    event: () => handleOpenMap(),
    style: null,
    desc: 'Мы на карте',
  },
  {
    icon: 'fa-solid fa-clock',
    event: () => handleOpenTime(),
    style: null,
    desc: 'Часы работы',
  },
  {
    icon: 'fa-solid fa-wheelchair-move',
    event: () => navigateTo('/entry/dostupnaya-sreda-03-32-22-10-22'),
    style: null,
    desc: 'Доступная среда',
  },
  {
    icon: 'fa-solid fa-eye',
    event: () =>
      navigateTo('http://disabled.infomania.ru/', { external: true }),
    style: null,
    desc: 'Версия для слабовидящих',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    event: () => navigateTo('information', { external: true }),
    style: null,
    desc: 'Сведения об организации, осуществляющей образовательную деятельность',
  },
  {
    icon: 'fa-solid fa-moon',
    style: 'sun',
    event: () => handleDarkModeOn(),
    desc: 'Темная тема',
  },
];
</script>

<template>
  <header class="flex justify-between my-4 items-center">
    <div class="">
      <NuxtLink to="/">
        <img class="w-64" src="/logo.png" alt="" />
      </NuxtLink>
    </div>
    <div class="grid md:grid-cols-7 grid-cols-4">
      <client-only>
        <el-popover
          v-for="(item, index) in buttons"
          :key="index"
          :width="10"
          trigger="hover"
          :content="item.desc"
        >
          <template #reference>
            <el-button class="m-0" link @click="item.event">
              <font-awesome-icon
                class="text-blue-500 text-2xl mx-2"
                :icon="item.icon"
                :class="item?.style"
              />
            </el-button>
          </template>
        </el-popover>
      </client-only>
    </div>
  </header>
</template>

<style scoped lang="scss">
.el-button {
  margin: 0;
}
</style>

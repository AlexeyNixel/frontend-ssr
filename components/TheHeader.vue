<script setup lang='ts'>
const router = useRouter();

const darkMode = useDark();
const toggleDark = useToggle(darkMode);
const handleDarkModeOn = () => toggleDark();

const handleOpenTime = () => {
  ElMessageBox.alert(
    '<div class=\'dialog\'>\n' +
    '        <div class=\'dialog-content\'>\n' +
    '          <div class=\'dialog-content__title\'>\n' +
    '            C 1 сентября по 31 мая:\n' +
    '          </div>\n' +
    '          вторник – пятница с 10.00 до 20.00, <br>\n' +
    '          суббота – воскресенье с 10.00 до 19.00,<br>\n' +
    '          понедельник – выходной день.<br>\n' +
    '          <br>\n' +
    '          <div class=\'dialog-content__title\'>\n' +
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
    },
  );
};
const handleOpenMap = () => {
  ElMessageBox.alert(
    '<iframe\n' +
    '        class=\'map\'\n' +
    '        src=\'https://yandex.ru/map-widget/v1/?um=constructor%3A952a94a4b33a6930b5ce54184df44d9a8f630cc4697ed47374222011683b6ded&amp;source=constructor\'\n' +
    '        width=\'100%\' height=\'700\' />',
    'Время работы библиотеки',
    {
      dangerouslyUseHTMLString: true,
      customStyle: {
        borderRadius: '10px',
        boxShadow: 'none',
        border: 'none',
        width: '70vw',
      },
    },
  );
};
const buttons = [
  {
    icon: 'fa-solid fa-magnifying-glass',
    event: () => router.push('/entry/search/'),
    style: null,
  },
  {
    icon: 'fa-solid fa-map-location-dot',
    event: () => handleOpenMap(),
    style: null,
  },
  {
    icon: 'fa-solid fa-clock',
    event: () => handleOpenTime(),
    style: null,
  },
  {
    icon: 'fa-solid fa-wheelchair-move',
    event: () => navigateTo('entry/dostupnaya-sreda-03-32-22-10-22'),
    style: null,
  },
  {
    icon: 'fa-solid fa-eye',
    event: () =>
      navigateTo('http://disabled.infomania.ru/', { external: true }),
    style: null,
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    event: () => navigateTo('information', { external: true }),
    style: null,
  },
  {
    icon: 'fa-solid fa-moon',
    style: 'sun',
    event: () => handleDarkModeOn(),
  },
];
</script>

<template>
  <header class='header'>
    <div class='header__logo'>
      <NuxtLink to='/' class='header__link'>
        <img src='/logo.png' alt='' />
      </NuxtLink>
    </div>
    <div class='header__btn-group'>
      <client-only>
        <el-button
          class='header__btn'
          v-for='(item, index) in buttons'
          :key='index'
          link
          @click='item.event'>
          <font-awesome-icon :icon='item.icon' :class='item?.style' />
        </el-button>
      </client-only>
    </div>
  </header>
</template>

<style scoped lang='scss'>
.header {
  display: flex;
  margin: 1vh 0;
  align-items: center;
  justify-content: space-between;

  &__logo {
    width: 50%;

    img {
      width: 250px;
    }
  }

  &__btn-group {
    width: 30%;
    display: flex;
    justify-content: end;
    margin: 0;
  }

  &__btn {
    font-size: 1.8rem;
    color: #007bff;

    &:hover {
      color: #035cbc;
      transition: 0.3s;
    }

    &:active {
      transform: scale(0.7);
    }
  }
}

.sun {
  color: orange;
}

@media (min-width: 992px) and (max-width: 1269px) {
  .slider {
    height: 300px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .slider {
    height: 250px;
  }
}

@media(min-width: 360px) and (max-width: 767px) {
  .header {
    &__logo img{
      width: 40vw;
    }
    &__btn {
      font-size: 1.3rem;
      &:nth-child(5) {
        display: none;
      }
    }
  }
}

@media(max-width: 359px) {
  .header {
    &__logo img{
      width: 40vw;
    }
    &__btn {
      font-size: 4vw;
      &:nth-child(5) {
        display: none;
      }
    }
  }
}

:deep(.dialog-time) {
  border-radius: 10px;
  box-shadow: none;
  border: none;
}
:deep(.el-message-box) {
  border-radius: 10px;
}
</style>

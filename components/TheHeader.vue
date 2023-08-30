<script setup lang="ts">
const router = useRouter()

const darkMode = useDark()
const toggleDark = useToggle(darkMode)
const handleDarkModeOn = () => toggleDark()

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
      dangerouslyUseHTMLString: true,
    }
  )
}
const handleOpenMap = () => {
  ElMessageBox.alert(
    '<iframe\n' +
    '        class=\'map\'\n' +
    '        src=\'https://yandex.ru/map-widget/v1/?um=constructor%3A952a94a4b33a6930b5ce54184df44d9a8f630cc4697ed47374222011683b6ded&amp;source=constructor\'\n' +
    '        width=\'100%\' height=\'700\' />',
    'Время работы библиотеки',
    {
      dangerouslyUseHTMLString: true,
      customClass:'modal-map'
    }
  )
}
const handleDisabledRoute = () => {
  window.location.replace('http://disabled.infomania.ru')
}

const buttons = [
  {
    icon:'fa-solid fa-magnifying-glass',
    event:() => router.push('/entry/search/')
  },
  {
    icon: 'fa-solid fa-map-location-dot',
    event:() => handleOpenMap()
  },
  {
    icon: 'fa-solid fa-clock',
    event:() => handleOpenTime()
  },
  {
    icon: 'fa-solid fa-wheelchair-move',
  },
  {
    icon: 'fa-solid fa-eye',
    event:() => handleDisabledRoute()
  },
  {
    icon: 'fa-solid fa-moon',
    style: 'sun',
    event:() => handleDarkModeOn()
  },
]
const search = ref<string>()
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <NuxtLink to='/' class="header__link">
        <img src="/logo.png" alt="">
      </NuxtLink>
    </div>
    <div class="header__btn-group">
      <el-button class="header__btn" v-for="(item, index) in buttons" :key="index" link @click="item?.event">
        <font-awesome-icon :icon="item.icon" :class='item?.style'/>
      </el-button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  margin: 1vh 0;
  align-items: center;
  justify-content: space-between;

  &__logo {
    width: 50%;
    img {
      width: 12vw;
    }
  }

  &__btn-group {
    width: 25%;
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
  }

  &__btn {
    font-size: 1.8rem;
    color: #007BFF;
    &:hover {
      color: #035cbc;
      transition: .3s;
    }
    &:active {
      transform: scale(.7);
    }
  }
}

.sun {
  color: orange;
}
</style>
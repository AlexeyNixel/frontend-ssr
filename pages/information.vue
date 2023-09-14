<template>
  <div class="information container">
    <div class="information-title">
      Сведения об организации, осуществляющей образовательную деятельность
    </div>
    <NuxtLink
      to="/entry/2021-10-12-osnovnye-svedenija"
      class="information-item">
      Основные сведения
    </NuxtLink>
    <NuxtLink
      to="/entry/struktura-biblioteki-03-16-22-10-22"
      class="information-item">
      Структура и органы управления образовательной организацией
    </NuxtLink>
    <NuxtLink to="/entry/2021-10-12-dokumenty" class="information-item">
      Документы
    </NuxtLink>
    <NuxtLink to="/entry/2021-11-12-obrazovanie" class="information-item">
      Образование
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-12-obrazovatelnye-standarty"
      class="information-item">
      Образовательные стандарты
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-rukovodstvo-pedagogicheskij-nauchno-pedagogicheskij-sostav"
      class="information-item">
      Руководство. Педагогический (научно-педагогический) состав
    </NuxtLink>
    <NuxtLink
      to="/entry/ug:'2021-11-13-materialno-tehnicheskoe-obespechenie-i-osnaschennost-obrazovatelnogo-protsessa"
      class="information-item">
      Материально-техническое обеспечение и оснащенность образовательного
      процесса
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-stipendii-i-inye-vidy-materialnoj-podderzhki"
      class="information-item">
      Стипендии и иные виды материальной поддержки
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-platnye-obrazovatelnye-uslugi"
      class="information-item">
      Платные образовательные услуги
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-finansovo-hozjajstvennaja-dejatelnost"
      class="information-item">
      Финансово хозяйственная деятельность
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-vakantnye-mesta-dlja-priema-perevoda"
      class="information-item">
      Вакантные места для приема (перевода)
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-arhiv-meroprijatij-uchebnogo-tsentra"
      class="information-item">
      Архив мероприятий
    </NuxtLink>
    <NuxtLink
      to="/entry/2021-11-13-plany-realizatsii-programm-dpo"
      class="information-item">
      Планы реализации программ ДПО
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.information {
  &-title {
    font-size: 1.4rem;
    color: var(--title-color);
  }

  &-item {
    margin: 5px 0;
    display: block;
    text-decoration: none;
    color: var(--el-font-color);
    &:nth-child(odd) {
      color: var(--el-text-color-secondary);
    }

    &:hover {
      color: blue;
      transition: 0.1s;
    }
  }
}
</style>

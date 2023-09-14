<script lang='ts' setup>

</script>

<template>
  <footer class='footer'>
    <div class='footer-container'>
      <div class='footer__left'>
        <div class='footer__left-item'>
          <font-awesome-icon class='footer__left-item-icon' :icon="['fass', 'location-dot']" />
          <span>г. Новосибирск, Красный проспект, 26</span>
        </div>
        <div class='footer__left-item'>
          <font-awesome-icon class='footer__left-item-icon' :icon="['fas', 'phone']" />
          <span>(383) 210-10-53</span>
        </div>
        <div class='footer__left-item'>
          <font-awesome-icon class='footer__left-item-icon' :icon="['fas', 'envelope']" />
          <span>noub@nso.ru</span>
        </div>

      </div>
      <div class='footer__right'>
        <div class='footer__right_item'>
          <div class='footer__right_item-title'>О нас</div>
          <div class='footer__right_item-content'>
            Новосибирская областная молодежная библиотека (НОМБ) работает с 1976 г.
            У нас можно посмотреть фильмы, послушать музыку, выйти в Интернет, встретиться с интересными людьми и,
            разумеется, почитать книги. А еще — пообщаться с ровесниками и познакомиться с нашими молодежными клубами!
          </div>

        </div>
        <div class='footer__right_group'>
          <a target='_blank' class='footer__right_group-item' href='https://www.youtube.com/user/noub77nsk'>
            <font-awesome-icon class='footer__right_group-item-icon' icon='fa-brands fa-youtube' />
          </a>
          <a target='_blank' class='footer__right_group-item' href='https://vk.com/oub_nsk'>
            <font-awesome-icon class='footer__right_group-item-icon' icon='fa-brands fa-vk' />
          </a>
          <a target='_blank' class='footer__right_group-item' href='https://ok.ru/group/70000001168881'>
            <font-awesome-icon class='footer__right_group-item-icon' icon='fa-brands fa-odnoklassniki' />
          </a>
<!--          <a target='_blank' class='footer__right_group-item'-->
<!--             href='https://novosibirsk.flamp.ru/firm/novosibirskaya_oblastnaya_molodezhnaya_biblioteka-141265769360530'>-->
<!--            <img class='footer__right_group-item-icon' src='@/assets/flamp.svg' alt=''>-->
<!--          </a>-->
<!--          <a target='_blank' class='footer__right_group-item' href='https://clck.ru/edeCg'>-->
<!--            <img class='footer__right_group-item-icon' src='@/assets/dzen.svg' alt=''>-->
<!--          </a>-->
        </div>
      </div>
    </div>
    <div class='footer-bottom'>© Новосибирская областная молодежная библиотека 2009-{{ new Date().getFullYear() }}</div>
  </footer>
</template>



<style lang='scss' scoped>
.footer {
  padding: 10px;
  background: var(--footer-bg);
  border-radius: 10px 10px 0 0;

  &-container {
    display: flex;
  }

  &-bottom {
    padding: 15px 0 0 0;
    text-align: center;
    color: white;
  }

  &__left {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: stretch;
    width: 50%;

    &-item {
      margin: 17px 0;
      display: flex;
      align-items: center;
      color: white;

      &-icon {
        margin-right: 5px;
        font-size: 1.4rem;
        color: white;
        padding: 0 10px;
        border-radius: 50px;
      }
    }

    .button {
      cursor: pointer;

    }
  }

  &__right {
    color: white;
    width: 50%;
    display: flex;
    flex-direction: column;

    &_item {
      &-title {
        font-weight: bold;
        font-size: 1.1rem;
      }

      &-archive {
        color: white;

        &:hover {
          color: #0d4cd3;
          transition: .3s;
        }
      }
    }

    &_group {
      height: 100%;
      display: flex;
      align-items: end;
      flex-wrap: wrap;
    }

    &_group-item {
      align-self: end;
      margin: 10px 10px 0 0;

      &-icon {
        font-size: 2rem;
        width: 2rem;
        color: white;
      }
    }
  }
}

</style>
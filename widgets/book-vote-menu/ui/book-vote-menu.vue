<script setup lang="ts">
import { useCollectionStore } from '~/entities/collection';
import axios from 'axios';

const collectionStore = useCollectionStore();
const collection = ref<any>();

const toast = useToast();
const voteText = ref('');

const handleVote = async () => {
  if (voteText.value) {
    await axios.post('http://api.infomania.ru/api/eventWar', {
      message: voteText.value,
    });
    toast.add({ title: 'Спасибо за ваш голос' });
    voteText.value = '';
  } else {
    toast.add({ title: 'Поле не должно быть пустым' });
  }
};

const breakpoints = {
  1280: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 2,
  },
  640: {
    slidesPerView: 1.2,
  },
  364: {
    slidesPerView: 1.2,
  },
};

collection.value = await collectionStore.getBookByCollection(
  '9f8c2aec-2279-4163-8f2f-6fbfa0e2aae9'
);
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div class="sub-header">
        <img src="./title.png" alt="" class="title" />
        <div class="mt-6">Акция-иследование</div>
        <img class="sub-title" src="./title-2.png" alt="" />
      </div>
      <img src="./logo.png" alt="" class="logo" />
    </div>
    <div class="vote">
      <div class="text">А ты?..</div>
      <UInput
        class="vote-input"
        placeholder="А зори здесь тихие..."
        size="xl"
        :ui="{ rounded: 'rounded-xl' }"
        variant="outlined"
        v-model="voteText"
        @keydown.enter="handleVote"
      >
        <template #trailing>
          <img class="vote-input__icon" src="./star.png" alt="" />
        </template>
      </UInput>
      <div class="desc">
        Уважаемые читатели (от 14 до 35 лет)! Приглашаем принять участие в акции
        «Молодёжь читает о войне…». Просим вас назвать книги о Великой
        Отечественной войне, которые, на ваш взгляд, наиболее ярко и
        эмоционально рассказывают о тех героических и трагических событиях.
      </div>
    </div>

    <client-only>
      <swiper class="slider" :centeredSlides="true" :breakpoints="breakpoints">
        <swiper-slide class="slide" v-for="book in collection" :key="book.id">
          <div class="book">
            <div class="aside">
              <img class="preview" :src="book.preview.path" alt="" />
              <div class="title">{{ book.title }}</div>
            </div>
            <div class="text">
              <div class="desc" v-html="book.content"></div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply w-full rounded-lg;
  background-image: url('./background-original.jpg');

  .header {
    @apply flex justify-between;

    .sub-header {
      @apply h-full text-black text-3xl p-5;

      .title {
        @apply w-[75%] h-full;
      }
      .sub-title {
        @apply w-1/2 mt-6;
      }
    }

    .logo {
      @apply w-1/6 rounded-tr-lg;
    }
  }

  .vote {
    @apply p-5 flex flex-col;

    .text {
      @apply text-5xl mb-4 text-black;
    }

    .vote-input {
      @apply w-full md:w-1/4 rounded-lg shadow-lg mb-4 text-black;

      &__icon {
        @apply w-[30px];
      }
    }

    .desc {
      @apply text-[10pt] w-4/6 text-black font-bold border border-black p-2 rounded-lg;
    }
  }

  .slider {
    @apply mb-4;
    .slide {
      @apply p-4 bg-[#7C0201] w-[400px];

      .book {
        @apply flex flex-col md:flex-row items-center;
        .aside {
          @apply w-full md:w-[450px];
          .preview {
            @apply w-[600px];
          }
          .title {
            @apply font-bold text-xl  text-white;
          }
        }

        .text {
          @apply w-full bg-white ml-4 p-4 text-black overflow-auto h-[450px];
        }
      }
    }
  }
}

.swiper-slide {
  opacity: 0.45;
  transition: 0.2s;
  transform: scale(0.8);
}
.swiper-slide-active {
  opacity: 1;
  transition: 0.2s;
  transform: scale(1);
}
</style>

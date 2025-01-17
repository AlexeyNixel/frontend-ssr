<script setup lang="ts">
import { useCollectionStore } from '~/entities/collection';

const collectionStore = useCollectionStore();
const collection = ref<any>();
const ui = {
  width: 'w-max sm:max-w-[10vw]',
};
collection.value = await collectionStore.getBookByCollection(
  '9f8c2aec-2279-4163-8f2f-6fbfa0e2aae9'
);
</script>

<template>
  <UModal :ui="ui" class="modal">
    <div class="wrapper">
      <div class="header">
        <img src="./title.png" alt="" class="title" />
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
        >
          <template #trailing>
            <img class="vote-input__icon" src="./star.png" alt="" />
          </template>
        </UInput>
        <div class="desc">
          Уважаемые читатели (от 14 до 35 лет)! Приглашаем принять участие в
          акции «Молодёжь читает о войне…». Просим вас назвать книги о Великой
          Отечественной войне, которые, на ваш взгляд, наиболее ярко и
          эмоционально рассказывают о тех героических и трагических событиях.
        </div>
      </div>

      <client-only>
        <swiper
          class="slider"
          :centeredSlides="true"
          :slides-per-view="2"
          :loop="true"
        >
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
  </UModal>
</template>

<style scoped lang="scss">
.modal {
  @apply w-full p-4 rounded-lg;

  .wrapper {
    @apply w-[1200px] rounded-lg;
    background-image: url('./background-original.jpg');

    .header {
      @apply flex justify-between;

      .title {
        @apply w-1/5 h-full p-5;
      }

      .logo {
        @apply w-1/6 rounded-tr-lg;
      }
    }

    .vote {
      @apply p-2 flex flex-col;

      .text {
        @apply text-5xl mb-4 text-black;
      }

      .vote-input {
        @apply w-1/4 rounded-lg shadow-lg mb-4 text-black;

        &__icon {
          @apply w-[30px];
        }
      }

      .desc {
        @apply text-[10pt] w-4/6 text-black;
      }
    }

    .slider {
      @apply mb-4;
      .slide {
        @apply p-4 bg-[#7C0201];

        .book {
          @apply flex;
          .aside {
            @apply w-[450px];
            .preview {
              @apply w-full;
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

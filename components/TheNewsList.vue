<script lang="ts" setup>
import type { EntryType } from '~/models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import type { EntryResponseType } from '~/models/entry-model';
import { storeToRefs } from 'pinia';

const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();
const entryPinned = ref<EntryType>();
const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

entryPinned.value = await entryStore.getEntryPinned();
</script>

<template>
  <div class="news">
    <div class="news__item">
      <nuxt-link
        class="pinned-entry"
        v-if="entryPinned"
        :to="`/entry/${entryPinned.slug}`"
      >
        <img
          class="pinned-entry__img"
          :src="entryPinned.preview.path"
          alt=""
        />
        <div class="pinned-entry__content">
          <div class="title">{{ entryPinned.title }}</div>
          <div class="description">
            {{
              entryPinned.desc.length > 256
                ? entryPinned.desc.slice(0, 256).trim() + '...'
                : entryPinned.desc.trim()
            }}
          </div>
        </div>
      </nuxt-link>
      <div class="list h-1/2">
        <div
          class="entry-list"
          v-if="anonsy"
        >
          <template
            v-for="(item, index) in anonsy.data"
            :key="item.id"
          >
            <ui-the-entry-card
              class="w-full h-full"
              :entry="item"
              v-if="index < 4"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="news__item_aside news__item">
      <ui-the-entry-carousel
        v-if="sobytiya"
        :entries="sobytiya"
        rubric="sobytiya"
        class="h-1/2"
      />
      <ui-the-entry-carousel
        v-if="aktualnoe"
        :entries="aktualnoe"
        rubric="aktualnoe"
        class="h-1/2 mt-4"
      />
    </div>
  </div>
  <!--  <div class="hidden lg:flex">-->
  <!--    <div-->
  <!--      class="flex flex-col justify-between w-8/12 bg-white dark:bg-neutral-900 rounded-[10px] p-4"-->
  <!--    >-->
  <!--      <div>-->
  <!--        <div class="ml-1 mb-2">-->
  <!--          <nuxt-link-->
  <!--            class="text-xl font-bold text-black dark:text-white"-->
  <!--            :to="{-->
  <!--              path: '/entry/search',-->
  <!--              query: { rubric: 'anonsy' },-->
  <!--            }"-->
  <!--          >-->
  <!--            Анонсы-->
  <!--          </nuxt-link>-->
  <!--        </div>-->
  <!--        <nuxt-link-->
  <!--          class="flex mb-2 max-h-[300px]"-->
  <!--          v-if="entryPinned"-->
  <!--          :to="`/entry/${entryPinned.slug}`"-->
  <!--        >-->
  <!--          <img-->
  <!--            class="rounded-l-[10px] w-1/2 object-cover"-->
  <!--            :src="entryPinned?.preview.path"-->
  <!--            alt=""-->
  <!--          />-->
  <!--          <div class="ml-4">-->
  <!--            <div-->
  <!--              class="font-bold xl:text-xl text-black dark:text-white"-->
  <!--              v-html="entryPinned.title"-->
  <!--            ></div>-->
  <!--            <div class="text-black dark:text-white">-->

  <!--            </div>-->
  <!--          </div>-->
  <!--        </nuxt-link>-->
  <!--      </div>-->
  <!--      <div-->
  <!--        class="rounded-[10px] grid grid-cols-4"-->
  <!--        v-if="anonsy"-->
  <!--      >-->
  <!--        <template-->
  <!--          v-for="(item, index) in anonsy.data"-->
  <!--          :key="item.id"-->
  <!--        >-->
  <!--          <ui-the-entry-card-->
  <!--            v-if="index < 4"-->
  <!--            :entry="item"-->
  <!--          />-->
  <!--        </template>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="ml-3 w-4/12 bg-white dark:bg-neutral-900 rounded-[10px] p-2">-->
  <!--      <div class="main">-->
  <!--        <ui-the-entry-carousel-->

  <!--        />-->

  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="block lg:hidden">
    <ui-entry-mobile
      v-if="anonsy"
      :entries="anonsy"
    />
    <ui-entry-mobile
      v-if="aktualnoe"
      :entries="aktualnoe"
    />
    <ui-entry-mobile
      v-if="sobytiya"
      :entries="sobytiya"
    />
  </div>
</template>

<style scoped lang="scss">
.news {
  @apply flex;

  &__item {
    @apply hidden  h-[670px] lg:block bg-white dark:bg-neutral-900 rounded-[10px] w-8/12 p-4;

    &_aside {
      @apply w-4/12 ml-4;
    }
  }
}

.pinned-entry {
  @apply flex h-1/2 text-black dark:text-white hover:text-blue-500 hover:dark:text-blue-500 transition;

  &__img {
    @apply rounded-l-[10px] h-max w-2/6 lg:w-1/2;
  }

  &__content {
    @apply ml-4;

    .title {
      @apply font-bold xl:text-xl text-base;
    }
  }
}

.entry-list {
  @apply flex mt-4;
}
</style>

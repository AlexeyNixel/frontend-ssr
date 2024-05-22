<script lang="ts" setup>
import type { EntryType } from '~/models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import type { EntryResponseType } from '~/models/entry-model';
import { storeToRefs } from 'pinia';

const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();
const entryPinned = ref<EntryType>();
const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

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
          :src="staticUrl + entryPinned.preview.path"
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
        <nuxt-link
          :to="{ path: '/entry/search', query: { rubric: 'anonsy' } }"
          class="flex justify-end mr-4 text-black dark:text-white hover:underline"
          >Больше анонсов</nuxt-link
        >
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

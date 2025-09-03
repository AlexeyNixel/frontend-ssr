<script lang="ts" setup>
import {
  EntryCard,
  EntryCarousel,
  type EntryResponseType,
  useEntryStore,
} from '~/entities/entry';
import { storeToRefs } from 'pinia';

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();

const { entryPinned } = storeToRefs(entryStore);
const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

onMounted(async () => {
  await entryStore.getEntryPinned();
});
</script>

<template>
  <div class="entries-wrapper">
    <div class="entries-wrapper__item entries-wrapper__item_main">
      <NuxtLink
        :to="'/entry/' + entryPinned.slug"
        class="pinned-entry"
        v-if="entryPinned"
      >
        <img
          :src="entryPinned.preview?.path"
          :alt="entryPinned.title"
          class="pinned-entry__preview"
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
      </NuxtLink>
      <div class="entry-list" v-if="anonsy">
        <div
          class="entry-list__item"
          v-for="(item, index) in anonsy.data"
          :key="item.id"
        >
          <entry-card v-if="index < 4" :entry="item" />
        </div>
      </div>
    </div>
    <div class="entries-wrapper__item entries-wrapper__item_aside">
      <EntryCarousel
        v-if="aktualnoe"
        :entries="anonsy"
        rubric="aktualnoe"
        class="entry-carousel entry-carousel_mobile"
      />
      <EntryCarousel
        v-if="sobytiya"
        :entries="sobytiya"
        rubric="sobytiya"
        class="entry-carousel"
      />
      <EntryCarousel
        v-if="aktualnoe"
        :entries="aktualnoe"
        rubric="aktualnoe"
        class="entry-carousel entry-carousel_margin"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.entries-wrapper {
  @apply flex my-4 justify-center w-full;

  &__item {
    @apply sm:bg-white sm:dark:bg-neutral-900 w-8/12 sm:p-4 rounded-[10px];

    &_main {
      @apply hidden sm:flex flex-col;
    }

    &_aside {
      @apply w-full sm:w-4/12 sm:ml-4 flex flex-col mx-auto;
    }
  }
}

.pinned-entry {
  @apply flex flex-col lg:flex-row h-[320px] text-black dark:text-white hover:text-blue-500 hover:dark:text-blue-500;

  &__preview {
    @apply rounded-[10px] lg:rounded-r-[0] lg:w-1/2 h-max;
  }

  &__content {
    @apply mt-2 ml-2 lg:w-1/2;
    .title {
      @apply xl:text-xl font-bold;
    }
  }
}

.entry-carousel {
  @apply h-[320px];

  &_margin {
    @apply mt-4;
  }

  &_mobile {
    @apply block sm:hidden;
  }
}

.entry-list {
  @apply hidden lg:grid lg:grid-cols-4 mt-4;

  &_mobile {
    @apply grid grid-cols-2 gap-4 my-4 lg:hidden;
  }
}
</style>

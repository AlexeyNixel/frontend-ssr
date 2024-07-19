<script lang="ts" setup>
import {
  EntryCard,
  EntryCarousel,
  EntryPlate,
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
    <div class="entries-wrapper__item">
      <div class="pinned-entry" v-if="entryPinned">
        <img
          :src="entryPinned.preview.path"
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
      </div>
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
        v-if="sobytiya"
        :entries="sobytiya"
        rubric="sobytiya"
        class="entry-carousel"
      />
      <EntryCarousel
        v-if="aktualnoe"
        :entries="aktualnoe"
        rubric="aktualnoe"
        class="h-1/2 mt-4"
      />
    </div>
  </div>
  <div class="entry-list entry-list_mobile" v-if="anonsy">
    <div
      class="entry-list__item entry-list__item_mobile"
      v-for="(item, index) in anonsy.data"
      :key="item.id"
    >
      <entry-plate :size="'compact'" v-if="index < 4" :entry="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.entries-wrapper {
  @apply flex my-4;

  &__item {
    @apply bg-white dark:bg-neutral-900 w-8/12 p-4 rounded-[10px];

    &_aside {
      @apply w-4/12 ml-4 flex flex-col mx-auto;
    }
  }
}

.pinned-entry {
  @apply flex flex-col lg:flex-row h-[320px];

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
}

.entry-list {
  @apply hidden lg:grid lg:grid-cols-4 mt-4;

  &_mobile {
    @apply grid grid-cols-2 gap-4 my-4 lg:hidden;
  }
}
</style>

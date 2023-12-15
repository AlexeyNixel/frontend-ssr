<script lang="ts" setup>
import dayjs from 'dayjs';
import { EntryType } from 'models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';
import TheEntryCarousel from '~/components/ui/TheEntryCarousel.vue';

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const entryStore = useEntryStore();
const entry = ref<EntryType[]>();
const entryPinned = ref<EntryType>();

entry.value = await entryStore.getEntriesByRubric('anonsy', {
  pageSize: 4,
  include: 'preview',
  orderBy: '-createdAt',
});

entryPinned.value = await entryStore.getEntryPinned();
</script>

<template>
  <div class="flex">
    <div class="w-8/12 bg-white dark:bg-neutral-900 rounded-[10px] p-4">
      <div class="mx-3">
        <div class="ml-1 mb-2">
          <nuxt-link class="text-2xl" to="/entry/rubric/anonsy">
            Анонсы
          </nuxt-link>
        </div>
        <nuxt-link
          class="grid grid-cols-2 gap-3"
          v-if="entryPinned"
          :to="`/entry/${entryPinned.slug}`"
        >
          <img
            class="rounded-l-[10px]"
            :src="entryPinned?.preview.path"
            alt=""
          />
          <div>
            <div class="font-bold xl:text-2xl" v-html="entryPinned.title"></div>
            <div v-html="entryPinned.desc"></div>
          </div>
        </nuxt-link>
      </div>
      <div class="rounded-[10px] grid grid-cols-4">
        <the-entry-card v-for="item in entry" :key="item.id" :entry="item" />
      </div>
    </div>
    <div class="ml-3 w-4/12 bg-white dark:bg-neutral-900 rounded-[10px] p-2">
      <TheEntryCarousel class="" rubric="sobytiya" />
      <TheEntryCarousel class="" rubric="aktualnoe" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news {
}
</style>

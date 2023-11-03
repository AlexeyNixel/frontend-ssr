<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();
const route = useRoute();
const entryStore = useEntryStore();
const entry = ref<EntryType>();

const handleRouteAdmin = (slug: string) => {
  navigateTo('http://admin.infomania.ru/entry/update/' + slug, {
    external: true,
  });
};

entry.value = await entryStore.getEntry(route.params.slug as string, {
  include: 'department',
});
</script>

<template>
  <div class="my-[1vh]" v-if="entry">
    <Head>
      <Title>{{ entry.title }}</Title>
      <Meta name="description" :content="entry.desc" />
    </Head>
    <div class="flex my-3 justify-between">
      <div class="text-2xl font-bold">
        {{ entry.title }}
      </div>
      <div class="text-right">
        <NuxtLink :to="`/department/${entry.department.slug}`" class="font-bold"
          >{{ entry.department.title }}
        </NuxtLink>
        <div class="italic">
          {{ dayjs(entry.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </div>
    <div class="ck-content" v-html="entry.content" v-viewer></div>
    <NuxtLink>
      <UButton color="blue" class="font-bold text-white text-sm">
        Редактировать
      </UButton>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>

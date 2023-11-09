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

entry.value = await entryStore.getEntry(route.params.slug as string, {
  include: 'department',
});

onMounted(() => {
  const table = document.querySelector('.table');
  const wrapper = document.createElement('div');
  if (table) {
    wrapper.setAttribute('class', 'w-full overflow-x-scroll');
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
});
</script>

<template>
  <div class="my-[1vh]">
    <Head>
      <Title>{{ entry?.title }}</Title>
      <Meta name="description" :content="entry?.desc" />
    </Head>
    <div class="flex my-3 justify-between">
      <div class="text-2xl font-bold">
        {{ entry?.title }}
      </div>
      <div class="text-right">
        <NuxtLink
          :to="`/department/${entry?.department.slug}`"
          class="font-bold"
          >{{ entry?.department.title }}
        </NuxtLink>
        <div class="italic">
          {{ dayjs(entry?.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </div>
    <div class="ck-content" v-html="entry?.content" v-viewer></div>
    <NuxtLink
      :to="`http://admin.infomania.ru/entry/update/${entry?.slug}`"
      external
    >
      <UButton color="blue" class="font-bold text-white text-sm">
        Редактировать
      </UButton>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>

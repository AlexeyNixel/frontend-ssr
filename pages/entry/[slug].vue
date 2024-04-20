<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import type { EntryType } from '~/models/baseTypes';
import { useRoute } from 'vue-router';
import { useGeneralStore } from '~/stores/generalStore';
import dayjs from 'dayjs';

const generalStore = useGeneralStore();
const route = useRoute();
const entryStore = useEntryStore();
const entry = ref<EntryType>();
const slug = ref(route.params.slug as string);

if (slug.value) {
  entry.value = await entryStore.getEntry(slug.value, {
    include: 'department',
  });
}

onMounted(() => {
  const table = document.querySelector('.table');

  if (table) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'w-full overflow-x-scroll');
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
});
</script>

<template>
  <div
    class="my-[1vh]"
    v-if="entry"
  >
    <Head>
      <Title>{{ entry.title }}</Title>
      <Meta
        name="description"
        :content="entry.desc"
      />
    </Head>
    <div class="flex my-3 justify-between">
      <div class="text-2xl font-bold">
        {{ entry.title }}
      </div>
      <div class="text-right ml-5">
        <NuxtLink
          :to="{ path: 'search', query: { department: entry.department.slug } }"
          class="font-bold"
          >{{ entry?.department.title }}
        </NuxtLink>
        <div class="italic">
          {{ dayjs(entry?.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </div>
    <viewer
      rebuild
      @inited="inited"
    >
      <div
        class="ck-content indent-5"
        v-html="entry.content"
      />
    </viewer>
    <div v-if="generalStore.token">
      <NuxtLink
        :to="`http://admin.infomania.ru/entry/update/${slug}`"
        external
        target="_blank"
      >
        <UButton
          color="blue"
          class="font-bold text-white text-sm"
        >
          Редактировать
        </UButton>
      </NuxtLink>
      <NuxtLink
        :to="`http://admin.infomania.ru/entry/update/${entry?.slug}?editor=alt`"
        external
        target="_blank"
        class="ml-2"
      >
        <UButton
          color="red"
          class="font-bold text-white text-sm"
        >
          Редактировать html
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ck-content {
  :deep(p) {
    margin: 10px 0px !important;
  }
}
</style>

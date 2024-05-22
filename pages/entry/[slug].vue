<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import type { EntryType } from '~/models/baseTypes';
import { useRoute } from 'vue-router';
import { useGeneralStore } from '~/stores/generalStore';
import dayjs from 'dayjs';

const asd = dayjs();
const generalStore = useGeneralStore();
const route = useRoute();
const entryStore = useEntryStore();
const entry = ref<EntryType>();
const slug = ref(route.params.slug as string);

if (slug.value) {
  entry.value = await entryStore.getEntry(slug.value, {
    include: 'department,rubrics',
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
    <div class="entry">
      <div class="entry__header">
        <div class="title">{{ entry.title }}</div>
        <div class="entry__info">
          <nuxt-link
            class="department"
            :to="{
              path: 'search',
              query: { department: entry.department.slug },
            }"
          >
            {{ entry?.department.title }}
          </nuxt-link>
          <div class="date">
            {{ dayjs(entry?.publishedAt).format('DD.MM.YYYY') }}
          </div>
        </div>
      </div>

      <viewer rebuild>
        <div
          class="entry__body ck-content"
          v-html="entry.content"
        />
      </viewer>
      <div
        class="entry__footer"
        v-if="generalStore.token"
      >
        <UButton
          :to="`http://admin.infomania.ru/entry/update/${slug}`"
          external="true"
          target="_blank"
          color="blue"
        >
          Обновить
        </UButton>
        <UButton
          class="ml-2"
          :to="`http://admin.infomania.ru/entry/update/${entry?.slug}?editor=alt`"
          external="true"
          target="_blank"
          color="red"
        >
          Редактировать html
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.entry {
  &__header {
    @apply flex justify-between;
    .title {
      @apply font-bold text-2xl;
    }
  }

  &__info {
    @apply text-right;
    .department {
      @apply font-bold;
    }
  }

  &__body {
    @apply indent-5;
  }

  &__button {
    @apply text-white dark:text-white font-bold bg-amber-200;
    &_alt {
      @apply ml-4;
    }
  }
}

.ck-content {
  :deep(p) {
    margin: 10px 0 !important;
  }
}
</style>

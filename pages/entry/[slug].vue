<script setup lang="ts">
import { useEntryStore } from '~/entities/entry';
import { useRoute } from 'vue-router';
import { useGeneralStore } from '~/stores/generalStore';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

const asd = dayjs();
const generalStore = useGeneralStore();
const route = useRoute();
const entryStore = useEntryStore();
const { entry } = storeToRefs(entryStore);
const slug = ref(route.params.slug as string);

await entryStore.getEntryById(slug.value, {
  include: 'department,rubrics',
});

onMounted(() => {
  const table = document.querySelector('.table');

  if (table) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'entry__table');
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
});
</script>

<template>
  <div class="my-[1vh]" v-if="entry">
    <Head>
      <Title>{{ entry.title }}</Title>
      <Meta name="description" :content="entry.desc" />
    </Head>
    <article class="entry">
      <header class="entry__header">
        <h2 class="title">{{ entry.title }}</h2>
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
      </header>
      <viewer rebuild>
        <div class="entry__body ck-content" v-html="entry.content" />
      </viewer>
      <footer class="entry__footer" v-if="generalStore.token">
        <nuxt-link
          :to="`http://admin.infomania.ru/entry/update/${slug}`"
          :external="true"
          target="_blank"
          class="admin-button admin-button_blue"
        >
          Обновить
        </nuxt-link>
        <nuxt-link
          class="admin-button admin-button_red ml-2"
          :to="`http://admin.infomania.ru/entry/update/${entry?.slug}?editor=alt`"
          :external="true"
          target="_blank"
        >
          Редактировать html
        </nuxt-link>
      </footer>
    </article>
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
    @apply indent-12 overflow-hidden;
  }

  &__table {
    @apply w-full overflow-x-scroll;
  }

  &__button {
    @apply text-white dark:text-white font-bold bg-amber-200;
    &_alt {
      @apply ml-4;
    }
  }
}

.admin-button {
  @apply p-2 rounded-xl font-bold text-white bg-blue-500;

  &_red {
    @apply bg-red-500;
  }
}

.ck-content {
  :deep(p) {
    margin: 10px 0 !important;
  }
}
</style>

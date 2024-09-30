<script setup lang="ts">
import { type EntryType } from '~/entities/entry';
import { useGeneralStore } from '~/stores/generalStore';
import { dateReduction } from '~/features/date-reduction';

const asd = dateReduction;

const props = defineProps<{
  entry: EntryType;
}>();

const generalStore = useGeneralStore();

onMounted(async () => {
  setTimeout(() => includeImageTable(), 1500);
});

const includeImageTable = () => {
  const table = document.querySelector('.table');
  if (table) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'entry-table');
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
};
</script>

<template>
  <div v-if="entry">
    <Head>
      <Title>{{ entry.title }}</Title>
      <Meta name="description" :content="entry.desc" />
    </Head>

    <article class="entry">
      <header class="header">
        <div class="title">{{ entry.title }}</div>
        <div class="details">
          <NuxtLink
            class="department"
            :to="{
              path: 'search',
              query: { department: entry.department.slug },
            }"
          >
            {{ entry.department.title }}
          </NuxtLink>
          <div class="date">{{ dateReduction(entry.publishedAt) }}</div>
        </div>
      </header>
      <viewer rebuild>
        <div class="body ck-content" v-html="entry.content" />
      </viewer>
    </article>

    <div class="footer" v-if="generalStore.token">
      <nuxt-link
        :to="`https://admin.infomania.ru/entry/update/${entry.slug}`"
        :external="true"
        target="_blank"
        class="link admin-button admin-button_blue"
      >
        Обновить
      </nuxt-link>
      <nuxt-link
        class="link link_red admin-button admin-button_red"
        :to="`https://admin.infomania.ru/entry/update/${entry.slug}?editor=alt`"
        :external="true"
        target="_blank"
      >
        Редактировать html
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.entry {
  .header {
    @apply flex justify-between;

    .title {
      @apply text-2xl font-bold;
    }
    .details {
      @apply text-right font-bold;
    }
  }

  .body {
    @apply indent-12 overflow-hidden;
  }
}

.footer {
  @apply my-3;
  .link {
    @apply bg-blue-500 text-white mr-2 p-2 rounded-xl;

    &_red {
      @apply bg-red-500;
    }
  }
}

:deep(.entry-table) {
  @apply overflow-x-scroll;
}

:deep(.table) {
  @apply w-[1500px] md:w-full;
}

.ck-content {
  :deep(p) {
    margin: 10px 0 !important;
  }
}
</style>

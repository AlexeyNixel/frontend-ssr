<script setup lang='ts'>
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
  <div class='entry' v-if='entry'>
    <Head>
      <Title>{{entry.title}}</Title>
    </Head>
    <div class='entry__header'>
      <div class='entry__title'>
        {{ entry.title }}
      </div>
      <div class='entry__info'>
        <NuxtLink
          :to='`/department/${entry.department.slug}`'
          class='entry__department'
        >{{ entry.department.title }}
        </NuxtLink>
        <div class='entry__date'>
          {{ dayjs(entry.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </div>
    <div class='entry__content ck-content' v-html='entry.content'></div>
    <div class='entry__admin-btn' v-if='generalStore.token'>
      <el-button
        type='warning'
        @click='handleRouteAdmin(entry.slug)'>
        Редактировать
      </el-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.entry {
  margin-bottom: 50px;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: bold;
    font-size: 1.4rem;
  }

  &__info {
    text-align: right;
  }

  &__department {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__date {
    font-style: italic;
  }

  &__admin-btn {
    margin-top: 10px;
  }
}

:deep(.el-button) {
  border-radius: 10px;
}
</style>

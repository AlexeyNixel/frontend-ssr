<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';

const NEWS_MENU_RUBRICS = {
  'aktualnoe': 'Актуальное',
  'anonsy': 'Анонсы',
  'sobytiya': 'События',
};

const entryStore = useEntryStore();
const news = ref<{ [key: string]: EntryType[] }>({});
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  news.value[rubric] = await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
  });
}
</script>

<template>
  <div class='entries'>
    <div class='entries__block' v-for='(menu, index) in news' :key='index'>
      <div class='entries__header'>
        {{ NEWS_MENU_RUBRICS[index] }}
      </div>
      <el-scrollbar class='entries__main'>
        <div class='flex'>
          <NuxtLink class='entry' v-for='item in menu' :key='item.id' :to='`entry/${item.slug}`'>
            <div class='entry__preview'>
              <img v-if='item.preview' :src='`${staticUrl}${item.preview.path}`' alt=''>
            </div>
            <div class='entry__title'>
              {{ `${item.title.length > 80 ? item.title.slice(0, 80).trim() + '...' : item.title.trim()}` }}
            </div>
          </NuxtLink>
        </div>
      </el-scrollbar>
    </div>
  </div>

</template>

<style scoped lang='scss'>
.entries {
  display: flex;
  justify-content: space-between;
  margin: 1vh 0;

  &__block {
    width: calc(100% / 3 - 45px);
    background: var(--el-bg-color);
    padding: 20px;
    border-radius: 10px;
  }
  &__header {
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0 10px;
  }
}

.entry {
  display: flex;
  height: max-content;
  margin: 10px 0;
  justify-content: space-between;
  padding: 10px 10px;
  border-radius: 10px;
  &:hover {
    background: #d8d8d8;
    transition: .3s;
  }

  &__preview {
    width: 160px;
    height: 120px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    width: 65%;
    display: flex;
    align-items: center;
  }
}

@media (min-width: 980px) and (max-width: 1363px) {
  .entry__title {
    font-size: .9rem;
  }
}

@media (max-width: 979px)  {
  .entry__title {
    font-size: 1.5vw;
  }
}
</style>
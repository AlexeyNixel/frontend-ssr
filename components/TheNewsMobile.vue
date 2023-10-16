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

const rubricsTranslate: { [key: string]: string } = {
  aktualnoe: 'Актуальное',
  anonsy: 'Анонсы',
  sobytiya: 'События',
};

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  const { data } = await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
  });
  news.value[rubric] = data;
}
</script>

<template>
  <div>
    <div class="entry-list" v-for="(items, rubric) in news" :key="rubric">
      <el-scrollbar>
        <div class="entry-list__flex">
          <NuxtLink
            :to='`entry/${item.slug}`'
            class="entry-item__link"
            v-for="item in items"
            :key="item.id"
          >
            <div class="entry-item__img">
              <img :src="staticUrl + item?.preview.path" alt="" />
            </div>
            <div class="entry-item__content">
              <div class="entry-item__title">
                {{ item.title.slice(0, 50) + '...' }}
              </div>
              <div class="entry-item__rubric">{{ rubricsTranslate[rubric] }}</div>
            </div>
          </NuxtLink>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.entry-list {
  &__rubric {
    width: 100%;
    margin: 1vh 0;
    border-bottom: 1px solid #ededed;
    border-radius: 1px;
  }
  &__flex {
    display: flex;
  }
}

.entry-item {

  &__link {
    margin: 1vh 0;
    height: 250px;
    width: 200px;
    flex-shrink: 0;
    margin-right: 10px;
    background: var(--element-bg-color);
    border-radius: 10px;
    text-decoration: none;
    color: var(--font-color);
  }
  &__img {
    height: 60%;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 10px 10px 0 0;
    }
  }
  &__content {
    height: 40%;
    //padding: 10px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    text-align: center;
    font-size: .8rem;
    height: 75%;
  }

  &__rubric {
    border: 1px solid gray;
    width: max-content;
    border-radius: 20px;
    padding: 4px 10px;
    align-self: end;
    font-size: .8rem;
  }
}
:deep(.el-scrollbar__bar.is-horizontal) {
  display: none;
}
</style>
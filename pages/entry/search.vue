<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { DepartmentType, EntryType } from '~/models/baseTypes';
import TheEntry from '~/components/ui/TheEntry.vue';
import { Search } from '@element-plus/icons-vue';
import { useDepartmentStore } from '~/stores/departmentStore';
import { useSearchStore } from '~/stores/searchStore';
import { navigateTo } from '#app';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const entryStore = useEntryStore();
const searchStore = useSearchStore();
const departmentStore = useDepartmentStore();

const isFilters = ref<boolean>(false);
const departments = ref<DepartmentType[]>();
const { departmentFilter } = storeToRefs(searchStore);
const { metaEntry } = storeToRefs(entryStore);
const { entries } = storeToRefs(entryStore);

const orderByFilters = {
  '': 'По умолчанию',
  '-publishedAt': 'Сначала новые',
  'publishedAt': 'Сначала старые',
};
const orderByFilter = ref<string>('-publishedAt');
const searchText = ref<string>(route.query.search as string);

const pages = ref<number>(1);
const currentPage = ref<number>(Number(route.query.page) || 1);

departments.value = await departmentStore.getDepartments();

const handleSearch = () => {
  navigateTo({
    path: '/entry/search',
    query: {
      search: searchText.value,
    },
  });
  fetchData();
};


const fetchData = async (val?: number) => {
  if (isFilters.value) isFilters.value = !isFilters.value
  if (val) {
    currentPage.value = val
    navigateTo({ path: '/entry/search', query: { search: searchText.value, page: val } });
    window.scroll(0,0)
  }

  const params = {
    toDate: searchStore.yearFilter ? searchStore.yearFilter + '-12-31T00:00:00.000Z' : '',
    fromDate: searchStore.yearFilter ? searchStore.yearFilter + '-01-01T00:00:00.000Z' : '',
    orderBy: orderByFilter.value,
    search: searchText.value,
    include: 'preview',
    page: val || currentPage.value,
  };

  if (!departmentFilter.value) {
    await entryStore.getEntries(params);
    pages.value = metaEntry.value?.pages || 1
  } else {
   await entryStore.getEntriesByDepartment(departmentFilter.value, params);
    pages.value = metaEntry.value?.pages|| 1
  }
};

fetchData();

</script>

<template>
  <div>
    <div class='search'>
      <el-input
        v-model='searchText'
        @keydown.enter='handleSearch()'
        size='large'
        placeholder='Поиск по сайту'
        :prefix-icon='Search'
      >
        <template #append>
          <el-button @click='isFilters = !isFilters' class='filters__btn'>
            <span>Фильтры</span>
            <font-awesome-icon class='filters__icon' :icon="['fas', 'sliders']" />
          </el-button>
        </template>
      </el-input>
      <Transition name='nested' duration='550'>
        <div class='filters' v-if='isFilters'>
          <div class='filters__header'>
            <div class='filters__title'>Фильтры</div>
            <el-button class='filters__clear' @click='searchStore.clearFilter'>Очистить</el-button>
          </div>
          <div class='filters__item'>
            <span>Сортировка</span>
            <el-select class='filters__field' v-model='orderByFilter'>
              <el-option
                v-for='(value, key) in orderByFilters'
                :key='key'
                :label='value'
                :value='key'
              />
            </el-select>
          </div>
          <div class='filters__item'>
            <span>Год</span>
            <el-select class='filters__field' v-model='searchStore.yearFilter'>
              <el-option
                v-for='item in searchStore.generateDate()'
                :key='item'
                :value='item'
                :label='item'

              />
            </el-select>
          </div>
          <div class='filters__item'>
            <span>Отдел</span>
            <el-select class='filters__field' v-model='departmentFilter'>
              <el-option
                v-for='item in departments'
                :key='item.id'
                :value='item.slug'
                :label='item.title'
              />
            </el-select>
          </div>
          <el-button @click='fetchData()'>Применить</el-button>
        </div>
      </Transition>
    </div>
    <div class='entry-list'>
      <TheEntry v-for='item in entries' :key='item.id' :entry='item' />
    </div>
    <client-only>
      <el-pagination
        v-model='currentPage'
        class='pagination'
        background
        :current-page='currentPage'
        @currentChange='fetchData'
        :page-size='10'
        :page-count='pages'
        layout='prev, pager, next'
      />
    </client-only>
  </div>
</template>

<style scoped lang='scss'>
.filters {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 300px;
  background: var(--el-bg-color-overlay);
  position: absolute;
  right: 0;
  margin-top: 1vh;
  margin-right: 14vw;
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__btn {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin: 0 5px;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: bold;
  }

  &__item {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 1vh 0;
  }

  &__field {
    border-radius: 10px;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1vh 0;
}

.nested-enter-active, .nested-leave-active {
  transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.1s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

:deep(.el-input__wrapper) {
  box-shadow: none;
  border-radius: 10px 0 0 10px;
  background: var(--el-bg-color);
}

:deep(.el-input__wrapper ) {
  box-shadow: none;
  border-radius: 10px 0 0 10px;
  background: var(--el-bg-color);
}

:deep(.filters__field .el-input__wrapper) {
  box-shadow: none;
  border-radius: 10px;
  background: var(--el-bg-color);
}

:deep(.el-input-group__append) {
  border-radius: 0 10px 10px 0;
  box-shadow: none;
  background: var(--el-bg-color);
}
</style>
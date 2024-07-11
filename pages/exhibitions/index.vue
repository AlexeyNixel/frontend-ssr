<script setup lang="ts">
import { useRoute } from 'vue-router';
import { navigateTo } from '#app';
import {
  ExhibitionDetailModal,
  useExhibitionStore,
} from '~/entities/exhibitions';
import { useModal } from '#ui/composables/useModal';

const modal = useModal();
const route = useRoute();
const exhibitionStore = useExhibitionStore();

const files = ref();
const page = ref<number>(Number(route.query.page) || 1);

const fetchData = async () => {
  files.value = await exhibitionStore.getExhibitions({
    searchByField: 'type=EXHIBITION',
    orderBy: '-createdAt',
    pageSize: 15,
    page: page.value,
  });
};

const handleNavigate = async () => {
  navigateTo({ path: '/exhibitions', query: { page: page.value } });
  if (process.client) window.scrollTo(0, 0);
  await fetchData();
};

const handleOpenModal = (path: string) => {
  modal.open(ExhibitionDetailModal, { path: path });
};

useAsyncData(async () => {
  await fetchData();
});
</script>

<template>
  <div class="exhibitions">
    <div class="exhibitions__header">Викторины и выставки</div>
    <div class="exhibitions__grid" v-if="files">
      <img
        v-for="item in files.data"
        :key="item.id"
        class="w-full h-full object-cover"
        :src="item.preview"
        alt=""
        @click="handleOpenModal(item.path)"
      />
    </div>

    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :page-count="files.meta.pageSize"
      :total="files.meta.total"
      @update:model-value="handleNavigate()"
    />
  </div>
</template>

<style scoped lang="scss">
.exhibitions {
  &__header {
    @apply text-2xl my-2 font-bold;
  }

  &__grid {
    @apply grid grid-cols-3 gap-2;
  }
}
</style>

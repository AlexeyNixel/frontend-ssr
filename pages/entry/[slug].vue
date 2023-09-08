<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

const route = useRoute();
const entryStore = useEntryStore();
const entry = ref<EntryType>();

entry.value = await entryStore.getEntry(route.params.slug as string, {
  include: 'department',
});
</script>

<template>
  <div class='entry' v-if='entry'>
    <div class='entry-header'>
      <div class='entry-header__title'>{{ entry.title }}</div>
      <div class='entry__info'>
        <div class='entry-header__department'>{{ entry.department.title }}</div>
        <div class='entry-header__date'>{{ dayjs(entry.publishedAt).format('DD.MM.YYYY') }}</div>
      </div>
    </div>
    <div class='entry__content ck-content' v-html='entry.content'></div>
  </div>
</template>

<style scoped lang='scss'>
.entry {

}

.entry-header {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;

  &__info {
    display: flex;
    float: right;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: bold;
  }
}
</style>
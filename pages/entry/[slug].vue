<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import { useRoute } from 'vue-router';

const route = useRoute()
const entryStore = useEntryStore()
const entry = ref<EntryType>()

entry.value = await entryStore.getEntry(route.params.slug as string)
</script>

<template>
  <div class='entry' v-if='entry'>
    <div class='entry-header'>
      <div class='entry-header__title'>{{ entry.title }}</div>
      <div class='entry-header__department'>Отдел отраслевой литературы</div>
      <div class='entry-header__date'>{{ entry.publishedAt}}</div>
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
  &__title{
    font-size: 1.4rem;
  }
}
</style>
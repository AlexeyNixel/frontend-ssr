<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import TheEntry from '~/components/ui/TheEntry.vue';

const route = useRoute()
const searchText = ref<string>(route.params.search as string)
const entryStore = useEntryStore()
const entries = ref<EntryType[]>()

entries.value = await entryStore.getEntries({
  orderBy:'-publishedAt',
  search: searchText.value,
  include:'preview'
})

</script>

<template>
  <div class='entry-list'>
    <TheEntry v-for='item in entries' :key='item.id' :entry='item'/>
  </div>
</template>

<style scoped lang='scss'>

</style>
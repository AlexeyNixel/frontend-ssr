<script setup lang="ts">
import { EntryPlate, type EntryType } from '~/entities/entry';

const props = defineProps<{
  entries: EntryType[];
}>();
</script>

<template>
  <div v-if="entries" class="entries-search">
    <div class="entry-list">
      <EntryPlate
        v-for="entry in entries"
        :key="entry.id"
        :entry="entry"
        date
        size="full"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.entries-search {
  .entry-input {
    &__filters {
      .filter {
        @apply flex items-center;
      }
    }
  }
}
</style>

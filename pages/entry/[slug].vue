<script setup lang="ts">
import EntryDetails from '~/widgets/entry-details/ui/EntryDetails.vue';
import { useRoute } from 'vue-router';
import { useEntryStore } from '~/entities/entry';

const route = useRoute();
const entryStore = useEntryStore();
const isShowNoEntryMessage = ref(false);

onMounted(() => {
  getEntry();
});

const getEntry = async () => {
  const { slug } = route.params;

  if (typeof slug === 'string') {
    const { error } = await entryStore.getEntryById(slug, {
      include: 'department,rubrics',
    });

    if (error) {
      isShowNoEntryMessage.value = true;
    }
  }
};
</script>

<template>
  <div class="entry-detail">
    <EntryDetails v-if="!isShowNoEntryMessage" :entry="entryStore.entry" />
    <div v-else class="not-found-entry">Новость не найдена</div>
  </div>
</template>

<style scoped lang="scss">
.not-found-entry {
  @apply items-center;
}
</style>

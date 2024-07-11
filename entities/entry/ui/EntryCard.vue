<script lang="ts" setup>
import TheBase from '~/components/TheBase.vue';
import { type EntryType } from '~/entities/entry';

const props = defineProps<{
  entry: EntryType;
}>();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const ui = {
  header: {
    padding: 'p-0 sm:p-0',
  },
  body: {
    padding: 'sm:p-2',
  },
  ring: 'ring-0',
};

const sliceString = (str: string) => {
  return str.length > 75 ? str.slice(0, 75).trim() + '...' : str.trim();
};
</script>

<template>
  <div>
    <nuxt-link :to="`/entry/${entry.slug}`" class="entry-link">
      <UCard :ui="ui" class="entry-card">
        <template class="border-0" #header>
          <img
            v-if="entry?.preview.path"
            class="entry-card__preview"
            :src="staticUrl + entry.preview?.path"
            alt=""
          />
          <the-base v-else class="entry-card__preview" />
        </template>
        <div class="entry-card__title">
          {{ sliceString(entry.title) }}
        </div>
      </UCard>
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss">
.entry-link {
  @apply mx-1 flex;
}

.entry-card {
  @apply shadow-none border-0 dark:bg-neutral-900 bg-white p-0 h-full;

  &__preview {
    @apply w-full object-cover h-[152px] rounded-[10px];
  }
  &__title {
    @apply text-sm text-black dark:text-white;
  }
}
</style>

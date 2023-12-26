<script lang="ts" setup>
import { EntryType } from 'models/baseTypes';
import TheBase from '~/components/TheBase.vue';

defineProps<{ entry: EntryType }>();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <nuxt-link :to="`/entry/${entry.slug}`" class="mx-1 flex">
    <UCard
      :ui="{
        header: {
          padding: 'p-0 sm:p-0',
        },
        body: {
          padding: 'sm:p-2',
        },
        ring: 'ring-0',
      }"
      class="shadow-none border-0 dark:bg-neutral-900 bg-white p-0 h-full"
    >
      <template class="border-0" #header>
        <img
          v-if="entry.preview?.path"
          class="w-full object-cover h-[152px]"
          :src="staticUrl + entry.preview?.path"
          alt=""
        />
        <the-base class="w-full h-[152px] object-cover" v-else></the-base>
      </template>
      <div class="text-sm">
        {{
          entry.title.length > 75
            ? entry.title.slice(0, 75).trim() + '...'
            : entry.title.trim()
        }}
      </div>
    </UCard>
  </nuxt-link>
</template>

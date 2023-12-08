<script lang="ts" setup>
import { EntryType } from 'models/baseTypes';

defineProps<{ entry: EntryType }>();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <nuxt-link :to="`/entry/${entry.slug}`" class="flex h-full mx-1">
    <UCard
      :ui="{
        header: {
          padding: 'p-0 sm:p-0',
        },
      }"
      class="shadow-none border-0 dark:bg-neutral-900 bg-white p-0"
    >
      <template class="border-0" #header>
        <img
          class="w-full object-cover h-[152px]"
          :src="staticUrl + entry.preview?.path"
          alt=""
        />
      </template>
      <div class="text-sm">
        {{
          entry.title.length > 70
            ? entry.title.slice(0, 70).trim() + '...'
            : entry.title.trim()
        }}
      </div>
    </UCard>
  </nuxt-link>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
const props = defineProps(['path']);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-[60vw]',
      height: 'h-[90vh]',
    }"
    class="h-full"
  >
    <nuxt-link
      target="_blank"
      :to="staticUrl + path"
      class="flex items-center justify-center"
    >
      Открыть в новой вкладке
    </nuxt-link>
    <iframe class="h-full w-full" :src="staticUrl + path" />
  </UModal>
</template>

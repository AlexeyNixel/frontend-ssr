<script setup lang="ts">
import { EntryCarousel, useEntryStore } from '~/entities/entry';

const entryStore = useEntryStore();
</script>

<template>
  <div>
    <entry-carousel :entries="entryStore.anonsy" mobile />
    <entry-carousel :entries="entryStore.aktualnoe" mobile />
    <entry-carousel :entries="entryStore.sobytiya" mobile />
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { findCollections } from '~/api/collection';
import type { CollectionModel } from '~/models/collection-model';

const collections = ref<CollectionModel[]>();

collections.value = await findCollections({
  include: 'preview',
});
</script>

<template>
  <div>123</div>
</template>

<style scoped lang="scss"></style>

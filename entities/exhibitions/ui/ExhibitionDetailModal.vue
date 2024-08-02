<script setup lang="ts">
const props = defineProps(['path']);

const ui = {
  width: 'w-[300px] sm:max-w-[60vw]',
  height: 'h-[90vh]',
};
</script>

<template>
  <UModal :ui="ui" class="modal">
    <nuxt-link target="_blank" :to="path" class="modal__header">
      Открыть в новой вкладке
    </nuxt-link>
    <iframe class="modal__content" width="600px" height="500px" :src="path" />
  </UModal>
</template>

<style lang="scss" scoped>
.modal {
  @apply h-full;

  &__header {
    @apply flex items-center justify-center;
  }

  &__content {
    @apply h-[800px] w-[900px];
  }
}
</style>

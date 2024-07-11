<script setup lang="ts">
const props = defineProps(['path']);

const ui = {
  width: 'sm:max-w-[60vw]',
  height: 'h-[90vh]',
};
</script>

<template>
  <UModal :ui="ui" class="modal">
    <nuxt-link target="_blank" :to="path" class="modal__header">
      Открыть в новой вкладке
    </nuxt-link>
    <iframe class="modal__content" :src="path" />
  </UModal>
</template>

<style lang="scss" scoped>
.modal {
  @apply h-full;

  &__header {
    @apply flex items-center justify-center;
  }

  &__content {
    @apply h-full w-full;
  }
}
</style>

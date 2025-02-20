<script setup lang="ts">
import { BookVoteMenu } from '~/widgets/book-vote-menu';

const ui = {
  width: 'w-full sm:max-w-[10vw]',
};
</script>

<template>
  <UModal :ui="ui" class="modal">
    <book-vote-menu />
  </UModal>
</template>

<style scoped lang="scss">
.modal {
  @apply w-full p-4 rounded-lg;
}
</style>

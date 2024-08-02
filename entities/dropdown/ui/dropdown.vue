<script setup lang="ts">
const props = defineProps<{
  title: string;
  content: string;
  date?: string;
}>();

const isOpen = ref(false);
</script>

<template>
  <div class="dropdown" @click="isOpen = !isOpen">
    <div class="header">
      <icon
        v-if="!isOpen"
        class="header__icon"
        name="i-heroicons-chevron-right-16-solid"
      />
      <icon
        v-else
        class="header__icon"
        name="i-heroicons-chevron-down-16-solid"
      />
      <div class="title">{{ title }}</div>
      <!--      <UButton @click="isOpen = !isOpen" label="открыть" />-->
      <!--      <div class="date" v-if="date">{{ date }}</div>-->
    </div>
    <Transition name="nested" :duration="300">
      <div class="body" v-if="isOpen">
        <div class="content" v-html="content" />
        <div class="date" v-if="date">{{ date }}</div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  @apply bg-white dark:bg-neutral-900 p-3 rounded-[10px] hover:bg-neutral-300;
  @apply hover:dark:bg-neutral-800 transition cursor-pointer my-4;
  .header {
    @apply flex items-center;

    &__icon {
      @apply text-2xl mr-2;
    }
  }
  .body {
    @apply flex flex-col;
    .content {
      @apply mt-3;
    }
    .date {
      @apply self-end;
    }
  }
}

.nested-enter-active,
.nested-leave-active {
  max-height: 600px;
  overflow: hidden;
  transition: all 0.3s;
}

.nested-enter-from,
.nested-leave-to {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
</style>

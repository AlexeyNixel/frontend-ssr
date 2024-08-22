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
    <div class="dropdown__header">
      <icon
        class="icon"
        :class="{ icon_rotate: isOpen }"
        name="i-heroicons-chevron-right-16-solid"
      />
      <div class="title">{{ title }}</div>
    </div>
    <Transition name="nested">
      <div v-if="isOpen" class="dropdown__body">
        <div class="content" v-html="content" />
        <div class="date">{{ date }}</div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  @apply bg-white dark:bg-neutral-900 p-3 rounded-[10px] hover:bg-neutral-300;
  @apply hover:dark:bg-neutral-800 transition cursor-pointer my-4;
  &__header {
    @apply flex items-center;

    .icon {
      @apply text-2xl mr-2 transition;

      &_rotate {
        @apply rotate-90;
      }
    }
  }

  &__body {
    @apply flex flex-col indent-12 px-6;

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
  transition: all 1s;
  max-height: 500px;
}

.nested-enter-from,
.nested-leave-to {
  max-height: 0;
  overflow: hidden;
  transition: all 1s;
}
</style>

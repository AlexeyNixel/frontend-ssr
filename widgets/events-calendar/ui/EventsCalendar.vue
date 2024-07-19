<script setup lang="ts">
import { useBillboardStore } from '~/entities/billboard';
import Calendar from '~/widgets/calendar/ui/Calendar.vue';
import EventsList from '~/entities/billboard/ui/EventsList.vue';

const billboardStore = useBillboardStore();
const isLoading = ref(false);

onMounted(() => {
  isLoading.value = true;
});
</script>

<template>
  <div>
    <USkeleton v-if="!isLoading" class="skeleton" />
    <div class="events-calendar" v-else>
      <div class="events-calendar__header">Афиша</div>
      <div class="events-calendar__body">
        <div class="calendar"><Calendar /></div>
        <div class="event">
          <events-list />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  @apply h-[378px] rounded-[10px] my-4;
}
.events-calendar {
  @apply bg-white dark:bg-neutral-900 rounded-[10px] my-4 p-4;
  &__header {
    @apply text-xl font-bold;
  }
  &__body {
    @apply flex;

    .calendar {
      @apply w-[460px];
    }
    .event {
      @apply w-full;
    }
  }
}
</style>

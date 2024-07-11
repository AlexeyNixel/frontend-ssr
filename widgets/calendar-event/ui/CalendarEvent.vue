<script setup lang="ts">
import type { BillboardType } from '~/models/baseTypes';
import Calendar from '~/widgets/calendar/ui/Calendar.vue';
import EventsList from '~/entities/billboard/ui/EventsList.vue';

const events = ref<BillboardType[]>([]);
const isLoading = ref(true);
const ui = {
  base: 'animate-pulse',
  background: 'bg-gray-300 dark:bg-gray-800',
};

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div>
    <USkeleton
      :ui="ui"
      v-if="isLoading"
      class="h-[370px] my-4 rounded-[10px]"
    />
    <div class="billboard" v-else>
      <div class="header">Афиша</div>
      <div class="body">
        <div class="calendar">
          <Calendar v-model="events" />
        </div>
        <div class="content">
          <events-list :events="events" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.billboard {
  @apply bg-white dark:bg-neutral-900 rounded-[10px] my-4;
  .header {
    @apply text-xl font-bold mx-4 py-3;
  }
  .body {
    @apply flex;
    .calendar {
      @apply w-[35%];
    }
    .content {
      @apply w-[65%];
    }
  }
}
</style>

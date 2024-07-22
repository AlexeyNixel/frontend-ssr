<script setup lang="ts">
import { useBillboardStore } from '~/entities/billboard';
import Calendar from '~/widgets/calendar/ui/Calendar.vue';
import EventsList from '~/entities/billboard/ui/EventsList.vue';
import { storeToRefs } from 'pinia';

const billboardStore = useBillboardStore();
const isLoading = ref(false);
const { billboard } = storeToRefs(billboardStore);

onMounted(() => {
  isLoading.value = true;
});

const closeWindow = () => {
  billboard.value = [];
};
</script>

<template>
  <div>
    <USkeleton v-if="!isLoading" class="skeleton" />
    <div class="events-calendar" v-else>
      <div class="events-calendar__header">
        <div class="title">Афиша</div>
        <UButton
          variant="link"
          @click="closeWindow"
          color="black"
          class="header__close"
          v-if="billboard.length > 0"
        >
          <Icon class="text-3xl" name="pajamas:close" />
        </UButton>
      </div>
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
    @apply flex items-center justify-between text-xl font-bold;
  }
  &__body {
    @apply relative sm:static flex;

    .calendar {
      @apply w-full sm:w-[460px];
    }
    .event {
      @apply absolute  z-20 bg-white dark:bg-neutral-900 w-full;
      @apply sm:static sm:z-0;
    }
  }
}
</style>

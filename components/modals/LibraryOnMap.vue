<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();
</script>

<template>
  <UModal>
    <div class="h-[500px]">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A952a94a4b33a6930b5ce54184df44d9a8f630cc4697ed47374222011683b6ded&amp;source=constructor"
        width="100%"
        height="100%"
      />
    </div>
  </UModal>
</template>

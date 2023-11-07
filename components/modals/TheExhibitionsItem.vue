<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';

type PropsType = {
  path: string;
};
defineProps<PropsType>();

const generalStore = useGeneralStore();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <div class="">
    <UModal
      :ui="{
        width: 'sm:max-w-[60vw]',
        height: 'h-[90vh]',
      }"
      class="h-full"
      v-model="generalStore.isExhibition"
    >
      <iframe class="h-full w-full" :src="staticUrl + path" />
    </UModal>
  </div>
</template>

<style scoped lang="scss">
// .content {
//   width: 80vw;
//   height: 80vh;
// }

// .dialog {
//   width: max-content;
//   height: max-content;
//   margin: 0;
// }
</style>

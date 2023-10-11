<script setup lang='ts'>
import { useGeneralStore } from '~/stores/generalStore';

type PropsType = {
  path: string
}
defineProps<PropsType>()

const generalStore = useGeneralStore()
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <el-dialog style='width: max-content; height: max-content; margin: 0' v-model="generalStore.isExhibition">
   <iframe class='content' :src='staticUrl+path'/>
  </el-dialog>
</template>

<style scoped lang='scss'>
.content {
  width: 80vw;
  height: 80vh;
}

.dialog {
  width: max-content;
  height: max-content;
  margin: 0;
}
</style>
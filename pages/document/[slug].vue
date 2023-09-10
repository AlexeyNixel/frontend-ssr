<script setup lang='ts'>
import { useMenuStore } from '~/stores/menuStore';

const route = useRoute()
const slug = ref<string>(route.params.slug as string)

const menuStore = useMenuStore()
const document = ref<any>()

const {data} = await menuStore.getMenu(slug.value, {
  include:'document'
})
document.value = data
</script>

<template>
  <div class='document'>
    <div class='document__title'>{{document?.document.title}}</div>
    <div class='document__content ck-content' v-html='document?.document.content'></div>
  </div>
</template>

<style scoped lang='scss'>
.document {
  word-break: break-all;
  &__title {
    font-size: 1.4rem;
    font-weight: bold;
  }
}
</style>
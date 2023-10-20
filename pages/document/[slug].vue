<script setup lang='ts'>
import { useMenuStore } from '~/stores/menuStore';
import { useGeneralStore } from '~/stores/generalStore';

const route = useRoute()
const slug = ref<string>(route.params.slug as string)

const generalStore = useGeneralStore()
const menuStore = useMenuStore()
const document = ref<any>()

const handleRouteAdmin = (slug: string) => {
  navigateTo('http://admin.infomania.ru/document/update/' + slug, {
    external: true,
  });
};

document.value = await menuStore.getMenu(slug.value, {
  include:'document'
})
</script>

<template>
  <div class='document' v-if='document'>
    <Head>
      <Title>{{document.document.title}}</Title>
    </Head>
    <div class='document__title'>{{document.document.title}}</div>
    <div class='document__content ck-content' v-html='document.document.content'></div>
  </div>
  <div class='document__update-btn' v-if='generalStore.token'>
    <el-button
      type='warning'
      @click='handleRouteAdmin(document.document.id)'>
      Редактировать
    </el-button>
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
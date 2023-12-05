<script setup lang="ts">
import { useMenuStore } from '~/stores/menuStore';
import { useGeneralStore } from '~/stores/generalStore';

const route = useRoute();
const slug = ref<string>(route.params.slug as string);

const generalStore = useGeneralStore();
const menuStore = useMenuStore();
const document = ref<any>();

const handleRouteAdmin = (slug: string) => {
  navigateTo('http://admin.infomania.ru/document/update/' + slug, {
    external: true,
  });
};

document.value = await menuStore.getMenu(slug.value, {
  include: 'document',
});
</script>

<template>
  <div class="document" v-if="document">
    <Head>
      <Title>{{ document.document.title }}</Title>
      <Meta name="description" :content="document.document.title" />
    </Head>
    <div class="document__title">{{ document.document.title }}</div>
    <div
      class="document__content ck-content"
      v-html="document.document.content"
    ></div>
  </div>
  <div class="document__update-btn" v-if="generalStore.token">
    <UButton
      class="font-bold my-4"
      @click="handleRouteAdmin(document.document.id)"
      label="Редактировать"
    />
  </div>
</template>

<style scoped lang="scss">
.document {
  word-break: normal;
  &__title {
    font-size: 1.4rem;
    font-weight: bold;
  }
}
</style>

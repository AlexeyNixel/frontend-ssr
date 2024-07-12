<script setup lang="ts">
import type { DocumentType } from '~/entities/document';

const props = defineProps<{
  document: DocumentType;
}>();
</script>

<template>
  <div class="document" v-if="document">
    <Head>
      <Title>{{ document.title }}</Title>
      <Meta name="description" :content="document.title" />
    </Head>
    <div class="document__title">{{ document.title }}</div>
    <div class="document__content ck-content" v-html="document.content"></div>
  </div>
  <!--    <div class="document__update-btn" v-if="generalStore.token">-->
  <!--      <UButton-->
  <!--        class="font-bold my-4"-->
  <!--        @click="handleRouteAdmin(document.id)"-->
  <!--        label="Редактировать"-->
  <!--      />-->
  <!--    </div>-->
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

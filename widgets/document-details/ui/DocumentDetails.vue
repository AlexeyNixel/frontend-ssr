<script setup lang="ts">
import type { DocumentType } from '~/entities/document';

const props = defineProps<{
  document: DocumentType;
}>();

onMounted(async () => {
  setTimeout(() => includeImageTable(), 1500);
});

const includeImageTable = () => {
  const table = document.querySelector('.table');
  if (table) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'entry-table');
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
};
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

:deep(.entry-table) {
  @apply overflow-x-scroll;
}

:deep(.table) {
  @apply w-[1500px] md:w-full;
}
</style>

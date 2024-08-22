<script setup lang="ts">
import { useDocumentStore } from '~/entities/document';
import DocumentDetails from '~/widgets/document-details/ui/DocumentDetails.vue';

const route = useRoute();
const documentStore = useDocumentStore();
const isShowNoDocumentMessage = ref(false);

onMounted(() => {
  getDocument();
});

const getDocument = async () => {
  const { slug } = route.params;

  if (typeof slug === 'string') {
    const { error } = await documentStore.getDocument(slug, {
      include: 'document',
    });

    if (error) {
      isShowNoDocumentMessage.value = true;
    }
  }
};
</script>

<template>
  <div>
    <DocumentDetails
      v-if="!isShowNoDocumentMessage"
      :document="documentStore.document"
    />
    <div v-else class="">Страница не найдена</div>
  </div>
</template>

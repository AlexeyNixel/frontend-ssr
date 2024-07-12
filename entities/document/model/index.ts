import { defineStore } from 'pinia';
import { findDocument } from '~/entities/document/api';
import type { DocumentType } from '~/entities/document';

export const useDocumentStore = defineStore('menu', () => {
  const document = ref<DocumentType>();

  const getDocument = async (slug: string, params?: any) => {
    const result: any = await findDocument(slug, params);
    if (!result) {
      return { result: null, error: 'not-found' };
    }
    document.value = result.document;
    return { result: result.document, error: null };
  };

  return {
    document,
    getDocument,
  };
});

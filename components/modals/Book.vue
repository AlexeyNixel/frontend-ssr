<script lang="ts" setup>
import { Book } from '~/models/baseTypes';
import { useBookStore } from '~/stores/bookStore';

interface Props {
  modelValue?: boolean;
  currentBook?: string;
}
const props = defineProps<Props>();
const bookStore = useBookStore();
const book = ref<Book>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const emits = defineEmits(['update:modelValue']);

const handleChangeValue = (value: boolean) => {
  emits('update:modelValue', value);
};

watch(props, async () => {
  book.value = await bookStore.getOne(props.currentBook);
});

</script>

<template>
  <div v-if="book">
    <UModal
      :ui="{
        width: 'sm:max-w-[40vw]',
      }"
      class="w-1/3 p-4"
      :model-value="modelValue"
      @update:model-value="handleChangeValue"
    >
      <div class="flex p-4">
        <div>
          <img
            class="rounded-xl"
            :src="staticUrl + book?.preview.path"
            alt=""
          />
        </div>
        <div class="ml-3">
          <div class="text-xl font-bold my-2">{{ book.title }}</div>
          <div class="font-bold my-2">{{ book.desc }}</div>
          <div class="my-2">{{ book.content }}</div>
        </div>
      </div>
    </UModal>
  </div>
</template>

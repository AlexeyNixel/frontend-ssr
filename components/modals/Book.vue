<script lang='ts' setup>
import { Book } from '~/models/baseTypes';
import { useBookStore } from '~/stores/bookStore';

interface Props {
  modelValue: boolean;
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
  if (props.currentBook) {
    book.value = await bookStore.getOne(props.currentBook);
  }

});

</script>

<template>
  <div v-if='book'>
    <UModal
      :ui="{
        width: 'sm:max-w-[50vw]',
      }"
      class='w-[30%] p-4'
      :model-value='modelValue'
      @update:model-value='handleChangeValue'
    >
      <div class='flex self-end items-end'>
        <UButton
          color='gray'
          variant='ghost'
          icon='i-heroicons-x-mark-20-solid'

          @click='modelValue = false'
        />

      </div>
      <div class='flex flex-col md:flex-row p-4 '>
        <div class='w-full md:w-1/3'>
          <img
            class=''
            :src='staticUrl + book?.preview.path'
            alt=''
          />
        </div>
        <div class='md:w-2/3 ml-4'>
          <!--          <div class="text-xl font-bold my-2">{{ book.title }}</div>-->
          <div class='font-bold my-2'>{{ book.desc }}</div>
          <div class='my-2 text-justify'>{{ book.content }}</div>
        </div>
      </div>
    </UModal>
  </div>
</template>

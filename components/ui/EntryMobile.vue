<script setup lang="ts">
import type { EntryResponseType } from '~/models/entry-model';

interface Props {
  entries: EntryResponseType;
}
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
defineProps<Props>();
</script>

<template>
  <div>
    <Swiper
      :spaceBetween="2"
      :pagination="true"
      :modules="[SwiperPagination]"
      class="h-full my-4"
      trigger="click"
      :breakpoints="{
        1280: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 2,
        },
        520: {
          slidesPerView: 2,
        },
      }"
    >
      <SwiperSlide
        class="flex rounded-[10px] w-full px-1"
        v-for="item in entries.data"
        :key="item.id"
      >
        <UCard
          class="h-[310px] mb-2 shadow-none border-0 dark:bg-transparent bg-white p-0"
          @click="
            navigateTo({
              path: `/entry/${item?.slug}`,
            })
          "
          :ui="{
            header: {
              padding: 'p-0 sm:p-0',
            },
          }"
        >
          <template
            class="border-0"
            #header
          >
            <img
              class="h-[156px] w-full object-cover"
              :src="staticUrl + item.preview.path"
              alt=""
            />
          </template>
          <div class="h-full text-sm">
            {{
              item.title.length > 75
                ? item.title.slice(0, 75).trim() + '...'
                : item.title.trim()
            }}
          </div>
        </UCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss"></style>

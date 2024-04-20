<script lang="ts" setup>
import type { EntryType } from '~/models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import type { EntryResponseType } from '~/models/entry-model';
import { storeToRefs } from 'pinia';
import EntryMobile from '~/components/ui/EntryMobile.vue';

const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();
const entryPinned = ref<EntryType>();
const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

entryPinned.value = await entryStore.getEntryPinned();
</script>

<template>
  <div class="hidden lg:flex">
    <div
      class="flex flex-col justify-between w-8/12 bg-white dark:bg-neutral-900 rounded-[10px] p-4"
    >
      <div>
        <div class="ml-1 mb-2">
          <nuxt-link
            class="text-xl font-bold text-black dark:text-white"
            :to="{
              path: '/entry/search',
              query: { rubric: 'anonsy' },
            }"
          >
            Анонсы
          </nuxt-link>
        </div>
        <nuxt-link
          class="flex mb-2 max-h-[300px]"
          v-if="entryPinned"
          :to="`/entry/${entryPinned.slug}`"
        >
          <img
            class="rounded-l-[10px] w-1/2 object-cover"
            :src="entryPinned?.preview.path"
            alt=""
          />
          <div class="ml-4">
            <div
              class="font-bold xl:text-xl text-black dark:text-white"
              v-html="entryPinned.title"
            ></div>
            <div class="text-black dark:text-white">
              {{
                entryPinned.desc.length > 300
                  ? entryPinned.desc.slice(0, 300).trim() + '...'
                  : entryPinned.desc.trim()
              }}
            </div>
          </div>
        </nuxt-link>
      </div>
      <div
        class="rounded-[10px] grid grid-cols-4"
        v-if="anonsy"
      >
        <template
          v-for="(item, index) in anonsy.data"
          :key="item.id"
        >
          <ui-the-entry-card
            v-if="index < 4"
            :entry="item"
          />
        </template>
      </div>
    </div>
    <div class="ml-3 w-4/12 bg-white dark:bg-neutral-900 rounded-[10px] p-2">
      <div class="main">
        <ui-the-entry-carousel
          v-if="sobytiya"
          :entries="sobytiya"
          rubric="sobytiya"
        />
        <ui-the-entry-carousel
          v-if="aktualnoe"
          :entries="aktualnoe"
          rubric="aktualnoe"
        />
      </div>
    </div>
  </div>
  <div class="block lg:hidden">
    <entry-mobile
      v-if="anonsy"
      :entries="anonsy"
    />
    <entry-mobile
      v-if="aktualnoe"
      :entries="aktualnoe"
    />
    <entry-mobile
      v-if="sobytiya"
      :entries="sobytiya"
    />
  </div>
</template>

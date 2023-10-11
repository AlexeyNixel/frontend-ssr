<script setup lang='ts'>
import { EntryType } from '~/models/baseTypes';

type PropsType = {
  entry: EntryType
}
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
defineProps<PropsType>()
</script>

<template>
  <NuxtLink :to='`/entry/${entry.slug}`' class='entry'>
    <div class='entry__preview'>
      <img v-if='entry.preview?.path' :src='staticUrl+entry.preview?.path' alt='' class='entry__img'>
      <TheBase v-else class='entry__img-empty'/>
    </div>
    <div class='entry__content'>
      <div class='entry__title'>{{entry.title}}</div>
      <div class='entry__desc' v-html='entry.desc'></div>
    </div>
  </NuxtLink>
</template>

<style scoped lang='scss'>
.entry {
  display: flex;
  text-decoration: none;
  color: var(--el-text-color);
  margin: 1vh 0;
  padding: 10px;
  border-radius: 10px;
  background: var(--el-bg-color);
  &:hover {
    color: #1d5deb;
    transition: .3s;
  }
  &__preview {
    width: 20%;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      border-radius: 10px 0 0 10px;
    }
  }

  &__img-empty {
    width: 100%;
  }
  &__content {
    width: 80%;
    margin-left:10px ;
  }
  &__title {
    font-weight: bold;
    font-size: 1.3rem;
  }
}
</style>
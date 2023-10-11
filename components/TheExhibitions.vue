<script setup lang='ts'>
import { useFileStore } from '~/stores/fileStore';
import { useGeneralStore } from '~/stores/generalStore';
import TheExhibitionsItem from '~/components/modals/TheExhibitionsItem.vue';

const generalStore = useGeneralStore()
const fileStore = useFileStore();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const files = ref<Array<any>>([]);
const currentPath = ref<string>('');

const { data } = await fileStore.getFiles({
  pageSize: 9,
  searchByField: 'type=EXHIBITION',
  orderBy: '-createdAt',
});
const res = Object.entries(data).map((key) => ({
  [key[0]]: key[1],
}));
for (let value = 0; value < res.length; value += 3) {
  const chunk = res.slice(value, value + 3);
  files.value.push(chunk);
}
const handleChangeExhibition = (path: string) => {
  generalStore.isExhibition = !generalStore.isExhibition
  currentPath.value = path;
};
</script>

<template>
  <el-carousel class='exhibition' trigger='click' height='250px'>
    <el-carousel-item class='exhibition__item' v-for='(slide, index) in files' :key='index'>
      <template v-for='(item, index) in slide' :key='index'>
        <img
          v-for='image in item'
          :key='item.id'
          :src='staticUrl+image.preview'
          class='exhibition__image'
          @click='handleChangeExhibition(image.path)'
          alt=''
        >
      </template>
    </el-carousel-item>
  </el-carousel>
  <the-exhibitions-item :path='currentPath'/>
</template>

<style scoped lang='scss'>
.exhibition {
  margin: 1vh 0;

  &__item {
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
  }

  &__image {
    justify-content: space-between;
    align-items: center;
    width: calc(100% / 3 - 10px);
    height: 100%;
  }
}
</style>
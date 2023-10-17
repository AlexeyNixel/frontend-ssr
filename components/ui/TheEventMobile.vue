<script setup lang='ts'>
import { useBillboardStore } from '~/stores/billboardStore';
import { storeToRefs } from 'pinia';
import { Close } from '@element-plus/icons-vue'
const billboardStore = useBillboardStore();
const {selectedEvents} = storeToRefs(billboardStore)
const {activeComp} = storeToRefs(billboardStore)

</script>

<template>
  <Swiper v-if='selectedEvents' class='slider'>
    <SwiperSlide class='slider__item' v-for='item in selectedEvents' :key='item.id'>
      <div class='slider__content'>
        <div class='slider__header'>
          <div class='slider__title'>{{item.title}}</div>
          <el-button
            class='slider__close'
            circle
            :icon='Close'
            @click='activeComp = "calendar"'
          />
        </div>
        <div v-html='item.desc'></div>
      </div>
    </SwiperSlide><el-icon><Close /></el-icon>
  </Swiper>
  <div>
    {{}}
  </div>
</template>

<style scoped lang='scss'>
.slider {
  height: 445px;

  background: #141414;
  border-radius: 10px;

  &__content {
    margin: 10px;
  }
  &__header {
    display: flex;
    align-items: center;
  }
  &__title {
    font-weight: bold;
    font-size: 1.2rem;
  }
  &__close {
    //align-self: end;
  }
}
</style>
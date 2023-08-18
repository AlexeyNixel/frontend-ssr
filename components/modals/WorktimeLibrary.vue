<script setup lang='ts'>
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore();
const { isWorkTime } = storeToRefs(generalStore);
</script>

<template>
  <div v-if='isWorkTime'>aasd</div>
  <div>
    <el-dialog v-if='isWorkTime'>
      <template #header>
        Режим работы библиотеки
      </template>

      <div class='dialog'>
        <div class='dialog-content'>
          <div class='dialog-content__title'>
            C 1 сентября по 31 мая:
          </div>
          вторник – пятница с 10.00 до 20.00, <br>
          суббота – воскресенье с 10.00 до 19.00,<br>
          понедельник – выходной день.<br>
          <br>
          <div class='dialog-content__title'>
            C 1 июня по 31 августа:
          </div>
          понедельник – суббота с 10.00 до 19.00,<br>
          воскресенье – выходной день.<br>
          <br>
          Последний день месяца - технический день.<br>
          <br>
          Условия посещения: бесплатно. Запись по предъявлению паспорта.<br>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang='scss'>
.dialog-content__title {
  font-size: 1.1rem;
}

:deep(.el-dialog) {
  width: max-content;
  background-color: var(--element-bg-color);
  color: var(--font-color);
}

:deep(.el-dialog__header) {
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-dialog__body) {
  padding: 10px;
  color: var(--font-color);
}
</style>
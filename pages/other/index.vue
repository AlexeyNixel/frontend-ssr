<script setup lang="ts">
import Dropdown from '~/entities/dropdown/ui/dropdown.vue';
import { type EntryType, useEntryStore } from '~/entities/entry';
import dayjs from 'dayjs';

const years = [2021, 2022, 2023, 2024];
const currentYear = ref<number>();
const entryStore = useEntryStore();
const entries = ref<EntryType[]>();

const search = ref('');
const inputUi = {
  icon: {
    trailing: {
      pointer: '',
    },
  },
  rounded: 'rounded-[10px]',
  variant: {
    none: 'bg-white dark:bg-neutral-900 border-0 shadow-0 focus:ring-{color}-500 dark:focus:ring-{color}-400',
  },
};

const sortSeminarsByDate = computed(() => {
  if (!currentYear.value) return entries.value;
  return entries.value?.filter(
    (entry) => +dayjs(entry.publishedAt).format('YYYY') === currentYear.value
  );
});

const searchAndSortSeminars = computed(() => {
  if (sortSeminarsByDate.value) {
    return sortSeminarsByDate.value.filter((entry) =>
      entry.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }
});

const fetchData = async () => {
  const { result } = await entryStore.getEntries({
    rubric: '4f5049b7-3e97-4a39-a0b0-4740112fb28e',
    isDeleted: 'true',
    pageSize: 50,
    orderBy: '-publishedAt',
  });
  entries.value = result.data;
};

onMounted(() => {
  fetchData();
});

const changeYear = (year: number) => {
  currentYear.value = year;
};

const clearYear = () => {
  currentYear.value = undefined;
};
</script>

<template>
  <div class="virtual">
    <header class="header">
      <div class="title">Виртуальный семинар</div>
      <div class="description">
        Новосибирская областная молодежная библиотека ежегодно проводит
        профессиональные мероприятия для специалистов библиотек, которые носят
        практико-ориентированный характер и дают ответы на возникающие вопросы
        специалистов библиотек в процессе реализации профессиональной
        деятельности. В данном разделе представлены вебинары, семинары,
        авторские мастерские по актуальным направлениям деятельности за период с
        2021 года по настоящее время.
      </div>
    </header>
    <div class="body">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        :ui="inputUi"
        variant="none"
        size="lg"
        v-model="search"
        placeholder="Поиск..."
      >
        <template #trailing>
          <UPopover>
            <UButton
              color="white"
              :label="currentYear ? currentYear.toString() : 'Год'"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
            <template #panel>
              <div class="">
                <UButton
                  variant="link"
                  class="year"
                  v-for="year in years"
                  :key="year"
                  @click="changeYear(year)"
                >
                  {{ year }}
                </UButton>
                <UButton variant="link" class="year" @click="clearYear">
                  Очистить год
                </UButton>
              </div>
            </template>
          </UPopover>
        </template>
      </UInput>
      <dropdown
        v-for="item in searchAndSortSeminars"
        :key="item.id"
        :title="item.title"
        :content="item.content"
        :date="item.publishedAt"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.virtual {
  .header {
    @apply bg-white dark:bg-neutral-900 p-4 my-4 rounded-[10px];
    .title {
      @apply text-xl font-bold mb-2;
    }
  }

  .seminar {
    &__title {
      @apply text-lg font-bold;
    }
  }
}
</style>

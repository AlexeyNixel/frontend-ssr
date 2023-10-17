<script setup lang='ts'>
import { setPageLayout } from '#app';
import { useGeneralStore } from '~/stores/generalStore';
import TheTestBillboard from '~/components/TheTestBillboard.vue';

const generalStore = useGeneralStore();

if (process.client) {
  generalStore.device = window.innerWidth < 980 ? 'mobile' : 'desktop';
  const token = localStorage.getItem('token');
  generalStore.token = token as string;
}

setPageLayout('default');
</script>

<template>
  <div>
    <the-slider />
    <the-navigation v-if='generalStore.device === "desktop"'/>
    <the-navigation-mobile v-else/>
    <client-only>
      <TheTestBillboard v-if='generalStore.device === "desktop"' />
      <TheBillboardMobile v-else />
    </client-only>
    <TheNews class='desktop' />
    <TheNewsMobile class='mobile' />
    <TheDepartment />
    <client-only>
      <TheGos />
      <TheExhibitions />
      <TheFooter />
    </client-only>
  </div>
</template>

<style scoped>
.mobile {
  display: none;
}

.desktop {
  display: flex;
}

@media (min-width: 360px) and (max-width: 767px) {
  .mobile {
    display: block;
  }

  .desktop {
    display: none;
  }
}
</style>
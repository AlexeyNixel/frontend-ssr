import VueViewer from 'v-viewer';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('v-viewer', {
    getSSRProps: {
      nuxtApp,
      $fetch,
    },
  });
  nuxtApp.vueApp.use(VueViewer);
});

import VueViewer from 'v-viewer';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('v-viewer');
  nuxtApp.vueApp.use(VueViewer);
});

<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'proculture-verification',
      content: '809fabd30403850765b290f8565b099d',
    },
  ],
  script: [
    {
      src: '//code.jivo.ru/widget/yWouUDfRrz',
      body: true,
    },
    {
      src: 'https://pos.gosuslugi.ru/bin/script.min.js',
      body: true,
    },
    {
      innerHTML: "Widget('https://pos.gosuslugi.ru/form', 348893)",
      body: true,
    },
    {
      async: 'true',
      src: 'https://culturaltracking.ru/static/js/spxl.js?pixelId=25706',
      'data-pixel-id': 25706,
    },
    {
      children:
        ' (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
        '   m[i].l=1*new Date();\n' +
        '   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n' +
        '   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
        '   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
        '\n' +
        '   ym(85679319, "init", {\n' +
        '        clickmap:true,\n' +
        '        trackLinks:true,\n' +
        '        accurateTrackBounce:true,\n' +
        '        webvisor:true\n' +
        '   });',
    },
  ],
  noscript: [
    {
      innerHTML:
        '<div><img src="https://mc.yandex.ru/watch/85679319" style="position:absolute; left:-9999px;" alt="" /></div>',
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

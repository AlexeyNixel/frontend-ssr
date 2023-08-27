<script setup lang='ts'>
import elementRu from 'element-plus/es/locale/lang/ru';
useHead({
script: [{
  src:'https://pos.gosuslugi.ru/bin/script.min.js',
  body: true
},
  {
    innerHTML:'Widget(\'https://pos.gosuslugi.ru/form\', 348893)',
    body: true
  }
]
})


</script>

<template>
  <ElConfigProvider :locale="elementRu">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </ElConfigProvider>
</template>

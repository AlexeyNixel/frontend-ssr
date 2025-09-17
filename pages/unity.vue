<template>
  <div>
    <iframe
      ref="unityIframe"
      :src="unityUrl"
      width="100%"
      height="600"
      allow="fullscreen; gamepad; microphone"
      allowfullscreen
      loading="lazy"
      style="border: none"
    />
  </div>
</template>

<script setup>
const unityUrl = 'http://192.168.0.41:8000/'; // URL вашего Unity WebGL приложения
const unityIframe = ref(null);

// Для обработки сообщений от Unity
onMounted(() => {
  window.addEventListener('message', handleUnityMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', handleUnityMessage);
});

const handleUnityMessage = (event) => {
  // Проверяем origin для безопасности
  if (event.origin !== 'http://ваш-сервер:8000') return;

  const data = event.data;

  if (data.type === 'FULLSCREEN_REQUEST') {
    enterFullscreen();
  }
};

const enterFullscreen = async () => {
  try {
    const iframe = unityIframe.value;
    if (iframe.requestFullscreen) {
      await iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      await iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      await iframe.msRequestFullscreen();
    }
  } catch (error) {
    console.error('Fullscreen error:', error);
  }
};
</script>

<script setup lang="ts">

</script>

<template>
  <div class="h-screen flex items-center justify-center overlay">
    <div class="gradient " />
    <slot />
  </div>
</template>

<style scoped>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgba(14, 165, 233, 0.25) 0%, #fff 100%);
}

/* Стили для градиента в темной теме */
.dark .gradient {
  background: radial-gradient(50% 50% at 50% 50%, rgba(56, 189, 248, 0.1) 0%, rgba(3, 7, 18, 1) 100%);
}

/* Основные стили для оверлея */
.overlay {
  position: relative;
  background-color: rgba(255, 255, 255, 0.02); /* Полупрозрачный фон для сетки */
}

/* Стили для сетки */
.overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 100px 100px; /* Размер ячеек сетки */
  pointer-events: none; /* Чтобы сетка не мешала взаимодействию с другими элементами */
}

/* Стили для оверлея в темной теме */
.dark .overlay::before {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}
</style>

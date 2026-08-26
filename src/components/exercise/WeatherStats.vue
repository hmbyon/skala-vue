<script setup>
defineProps({
  avgTemp: {
    type: [Number, String],
    default: 0,
  },
  favCount: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="stats-bar">
    <span
      >🌡️ 평균 기온: <strong>{{ avgTemp }}°C</strong></span
    >
    <span
      >⭐ 즐겨찾기: <strong>{{ favCount }}개</strong></span
    >
  </div>
</template>

<style scoped>
.stats-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eef2f7;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #334155;
  margin-bottom: 12px;
}
</style>

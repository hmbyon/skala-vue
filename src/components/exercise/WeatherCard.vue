<script setup>
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select-card', 'click-detail', 'toggle-favorite'])
</script>

<template>
  <div class="weather-card" @click="$emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <div class="card-header">
      <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
      <button
        class="fav-btn"
        :class="{ active: isFavorite }"
        @click.stop="$emit('toggle-favorite', cityItem.name)"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>

    <p>현재 기온: {{ cityItem.temp }}°C</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
    <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

    <button class="btn-detail" @click.stop="$emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.weather-card:hover {
  background-color: #f1f3f5;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

h4 {
  margin: 0;
}

.fav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #adb5bd;
  padding: 0;
  line-height: 1;
}

.fav-btn.active {
  color: #f59e0b;
}

p {
  margin: 6px 0 8px 0;
  font-size: 0.9rem;
  color: #495057;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 4px;
  color: #ffffff;
}

.badge.hot {
  background-color: #ff7675;
}

.badge.cool {
  background-color: #74b9ff;
}

.btn-detail {
  position: absolute;
  right: 15px;
  top: 15px;
  padding: 6px 12px;
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
}

.btn-detail:hover {
  background-color: #e9ecef;
}
</style>

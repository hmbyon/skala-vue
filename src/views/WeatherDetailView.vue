<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '638421926882751adead648f88a64a7c'
const cityId = route.params.cityId

const forecastList = ref([])
const cityName = ref('')
const isLoading = ref(true)

// [요구사항 2] OpenWeatherMap 추가 API (5일/3시간 예보)
const fetchForecast = async () => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&lang=kr&appid=${API_KEY}`,
    )
    cityName.value = res.data.city.name
    forecastList.value = res.data.list.slice(0, 8) // 향후 24시간(3시간 간격 8개) 예보
  } catch (err) {
    console.error('예보 데이터 조회 실패:', err)
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchForecast()
})
</script>

<template>
  <div class="detail-container">
    <button class="btn-back" @click="goBack">← 목록으로 돌아가기</button>

    <div v-if="isLoading" class="loading">예보 데이터를 불러오는 중...</div>

    <div v-else class="section-box">
      <h3>📈 {{ cityName }} 단기 예보 (OpenWeatherMap 추가 API)</h3>
      <div class="forecast-grid">
        <div v-for="item in forecastList" :key="item.dt" class="forecast-card">
          <span class="time">{{ item.dt_txt.slice(11, 16) }}</span>
          <span class="temp">{{ Math.round(item.main.temp) }}°C</span>
          <span class="desc">{{ item.weather[0].description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.btn-back {
  align-self: flex-start;
  padding: 8px 14px;
  background: #e2e8f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.section-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  text-align: center;
}
.forecast-card {
  background: white;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.forecast-card .time {
  font-size: 0.8rem;
  color: #64748b;
}
.forecast-card .temp {
  font-weight: bold;
  font-size: 1.1rem;
}
.forecast-card .desc {
  font-size: 0.8rem;
  color: #475569;
}
.loading {
  text-align: center;
  padding: 40px;
  color: #64748b;
}
</style>

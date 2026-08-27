<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const router = useRouter()
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '638421926882751adead648f88a64a7c'

// 초기 표시 5개 도시 목록
const initialCities = ['Seoul', 'Suwon', 'Busan', 'Daejeon', 'Jeju']

const searchQuery = ref('')
const cityList = ref([])
const favoriteCities = ref([])
const randomAdvice = ref('')

// [요구사항 1] OpenWeatherMap 실시간 날씨 데이터 조회
const fetchCityWeather = async (cityName) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=kr&appid=${API_KEY}`,
    )
    return {
      id: res.data.id,
      name: res.data.name,
      status: res.data.weather[0].description,
      temp: Math.round(res.data.main.temp),
    }
  } catch (err) {
    console.error(`날씨 조회 실패 (${cityName}):`, err)
    return null
  }
}

const loadDefaultCities = async () => {
  const results = await Promise.all(initialCities.map((city) => fetchCityWeather(city)))
  cityList.value = results.filter((item) => item !== null)
}

// [요구사항 3] 기타 외부 API (Advice Slip)
const fetchExternalAdvice = async () => {
  try {
    const res = await axios.get('https://api.adviceslip.com/advice')
    randomAdvice.value = res.data.slip.advice
  } catch (err) {
    console.error('외부 API 조회 실패:', err)
  }
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  const searchedCity = await fetchCityWeather(searchQuery.value)
  if (searchedCity) {
    cityList.value = cityList.value.filter(
      (c) => c.name.toLowerCase() !== searchedCity.name.toLowerCase(),
    )
    cityList.value.unshift(searchedCity)
  } else {
    alert('도시를 찾을 수 없습니다.')
  }
}

const handleToggleFavorite = (cityName) => {
  if (favoriteCities.value.includes(cityName)) {
    favoriteCities.value = favoriteCities.value.filter((name) => name !== cityName)
  } else {
    favoriteCities.value.push(cityName)
  }
}

// 상세보기 클릭 시 상세 페이지로 이동
const handleDetail = (cityId) => {
  router.push(`/weather/${cityId}`)
}

onMounted(() => {
  loadDefaultCities()
  fetchExternalAdvice()
})
</script>

<template>
  <div class="dashboard">
    <!-- 🔍 도시 검색 영역 -->
    <div class="section-box">
      <h3>🔍 도시 검색</h3>
      <div class="search-input-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="검색할 도시 이름 입력"
          @keyup.enter="handleSearch"
        />
      </div>
      <p class="search-status">검색 중인 도시: {{ searchQuery }}</p>
    </div>

    <!-- 🏙️ 지역별 날씨 현황 영역 -->
    <div class="section-box">
      <h3>🏙️ 지역별 날씨 현황</h3>
      <div class="card-list">
        <WeatherCard
          v-for="city in cityList"
          :key="city.id"
          :city-item="city"
          :is-favorite="favoriteCities.includes(city.name)"
          @click-detail="handleDetail(city.id)"
          @toggle-favorite="handleToggleFavorite"
        />
      </div>
    </div>

    <!-- [요구사항 3] 기타 외부 API 출력 -->
    <div class="section-box advice-box">
      <h3>💡 오늘의 한마디 (외부 API)</h3>
      <p class="advice-text">"{{ randomAdvice || '로딩 중...' }}"</p>
      <button class="btn-refresh" @click="fetchExternalAdvice">새 문장 불러오기</button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.section-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}
.section-box h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #1e293b;
}
.search-input-wrapper input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 0.95rem;
}
.search-status {
  margin-top: 12px;
  margin-bottom: 0;
  font-size: 0.9rem;
  color: #64748b;
}
.card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.advice-box {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}
.advice-text {
  font-style: italic;
  color: #166534;
  margin-bottom: 12px;
}
.btn-refresh {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>

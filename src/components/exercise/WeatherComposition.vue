<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '대전', temp: 22, status: '흐림' },
  { id: 'city_05', name: '제주', temp: 29, status: '맑음' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const favoriteCities = ref([])

// 1. computed 연산기
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const averageTemp = computed(() => {
  if (filteredWeatherList.value.length === 0) return 0
  const total = filteredWeatherList.value.reduce((sum, item) => sum + item.temp, 0)
  return (total / filteredWeatherList.value.length).toFixed(1)
})

// 2. watch & watchEffect 센서
watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

// 3. 핸들러 함수
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const toggleFavorite = (cityName) => {
  const index = favoriteCities.value.indexOf(cityName)
  if (index > -1) {
    favoriteCities.value.splice(index, 1)
  } else {
    favoriteCities.value.push(cityName)
  }
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="검색할 도시 이름 입력"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <div class="list-header">
        <h3>🏙️ 지역별 날씨 현황</h3>
        <span class="stats-badge">🌡️ 평균 기온: {{ averageTemp }}°C</span>
      </div>

      <div
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <div class="card-header">
          <h4>{{ item.name }} ({{ item.status }})</h4>
          <button
            class="fav-btn"
            :class="{ active: favoriteCities.includes(item.name) }"
            @click.stop="toggleFavorite(item.name)"
          >
            {{ favoriteCities.includes(item.name) ? '★' : '☆' }}
          </button>
        </div>

        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>

      <p
        v-if="filteredWeatherList.length === 0"
        style="text-align: center; color: #e74c3c; padding: 10px 0"
      >
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 500px;
  margin: 20px auto;
  font-family: sans-serif;
}

.search-box,
.list-box {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.list-header h3 {
  margin: 0;
}

.stats-badge {
  font-size: 0.85rem;
  background-color: #eef2f7;
  padding: 4px 8px;
  border-radius: 4px;
  color: #334155;
}

input {
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

p {
  font-size: 0.9rem;
  color: #495057;
  margin-top: 8px;
  margin-bottom: 0;
}

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

.status-bar {
  text-align: center;
  padding: 12px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>

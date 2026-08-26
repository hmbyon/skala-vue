<script setup>
import { ref } from 'vue'

// 5개 도시 확장 데이터
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '대전', temp: 22, status: '흐림' },
  { id: 'city_05', name: '제주', temp: 29, status: '맑음' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
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
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>
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

h3 {
  margin-top: 0;
  margin-bottom: 12px;
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

h4 {
  margin: 0 0 6px 0;
}

p {
  margin: 0 0 8px 0;
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

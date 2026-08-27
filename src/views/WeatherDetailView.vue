<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '638421926882751adead648f88a64a7c'
const cityId = route.params.cityId

const currentData = ref(null)
const forecastList = ref([])
const isLoading = ref(true)

const formatTemp = (celsius) => {
  if (celsius === undefined || celsius === null) return 0
  if (configStore.unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return Math.round(celsius)
}

const formatTime = (timestamp) => {
  if (!timestamp) return '-'
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

const fetchCityDetails = async () => {
  isLoading.value = true
  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&lang=kr&appid=${API_KEY}`,
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&lang=kr&appid=${API_KEY}`,
      ),
    ])

    currentData.value = currentRes.data
    forecastList.value = forecastRes.data.list.slice(0, 6)
  } catch (err) {
    console.error('상세 정보 조회 실패:', err)
    ElMessage.error('날씨 상세 정보를 불러오는 데 실패했습니다.')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchCityDetails()
})
</script>

<template>
  <div class="detail-container">
    <!-- 상단 헤더 영역 -->
    <div class="header-bar">
      <el-button type="info" plain class="btn-back" @click="goBack">
        <el-icon><Back /></el-icon> 대시보드로 돌아가기
      </el-button>
      <el-tag type="primary" size="large" effect="dark" v-if="currentData">
        {{ currentData.name }}, {{ currentData.sys.country }}
      </el-tag>
    </div>

    <!-- 스켈레톤 로딩 -->
    <el-skeleton :rows="8" animated v-if="isLoading" />

    <div v-else-if="currentData" class="detail-content">
      <!-- 1. 메인 대표 날씨 히어로 카드 -->
      <el-card class="hero-card" shadow="hover">
        <div class="hero-body">
          <div class="main-temp-box">
            <h1 class="temp-text">
              {{ formatTemp(currentData.main.temp) }}
              <span class="unit">{{ configStore.unitSymbol }}</span>
            </h1>
            <p class="weather-desc">{{ currentData.weather[0].description }}</p>
          </div>
          <div class="sub-temp-info">
            <p>
              체감 온도:
              <strong
                >{{ formatTemp(currentData.main.feels_like) }}{{ configStore.unitSymbol }}</strong
              >
            </p>
            <p>
              최저 / 최고:
              <strong>
                {{ formatTemp(currentData.main.temp_min) }}° /
                {{ formatTemp(currentData.main.temp_max) }}°
              </strong>
            </p>
          </div>
        </div>
      </el-card>

      <!-- 2. 세부 기상 지표 -->
      <el-row :gutter="16" class="metrics-row">
        <el-col :xs="12" :sm="6">
          <el-card shadow="never" class="metric-card">
            <el-statistic title="💧 습도" :value="currentData.main.humidity" suffix="%" />
            <el-progress
              :percentage="currentData.main.humidity"
              :show-text="false"
              status="success"
              style="margin-top: 10px"
            />
          </el-card>
        </el-col>

        <el-col :xs="12" :sm="6">
          <el-card shadow="never" class="metric-card">
            <el-statistic
              title="💨 풍속"
              :value="currentData.wind.speed"
              :precision="1"
              suffix="m/s"
            />
            <p class="sub-text">풍향 {{ currentData.wind.deg }}°</p>
          </el-card>
        </el-col>

        <el-col :xs="12" :sm="6">
          <el-card shadow="never" class="metric-card">
            <el-statistic title="☁️ 구름량" :value="currentData.clouds.all" suffix="%" />
            <el-progress
              :percentage="currentData.clouds.all"
              :show-text="false"
              status="warning"
              style="margin-top: 10px"
            />
          </el-card>
        </el-col>

        <el-col :xs="12" :sm="6">
          <el-card shadow="never" class="metric-card">
            <el-statistic title="🧭 기압" :value="currentData.main.pressure" suffix="hPa" />
            <p class="sub-text">해수면 기준</p>
          </el-card>
        </el-col>
      </el-row>

      <!-- 3. 상세 명세 -->
      <el-card shadow="hover" class="box-card">
        <template #header>
          <span class="card-title">🌅 일출 / 일몰 및 위치 정보</span>
        </template>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="🌅 일출 시간">
            {{ formatTime(currentData.sys.sunrise) }}
          </el-descriptions-item>
          <el-descriptions-item label="🌇 일몰 시간">
            {{ formatTime(currentData.sys.sunset) }}
          </el-descriptions-item>
          <el-descriptions-item label="📍 위도 / 경도">
            {{ currentData.coord.lat }}° N / {{ currentData.coord.lon }}° E
          </el-descriptions-item>
          <el-descriptions-item label="👁️ 가시거리">
            {{ (currentData.visibility / 1000).toFixed(1) }} km
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!-- 4. 시간대별 단기 예보 -->
      <el-card shadow="hover" class="box-card">
        <template #header>
          <span class="card-title">⏱️ 시간대별 단기 예보</span>
        </template>
        <div class="timeline-wrapper">
          <div v-for="item in forecastList" :key="item.dt" class="timeline-item">
            <span class="time-label">{{ item.dt_txt.slice(11, 16) }}</span>
            <span class="temp-label">
              {{ formatTemp(item.main.temp) }}{{ configStore.unitSymbol }}
            </span>
            <el-tag size="small" type="info" effect="light">
              {{ item.weather[0].description }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hero-card {
  background: linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%);
  color: white;
  border-radius: 12px;
  border: none;
}
.hero-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.temp-text {
  font-size: 3rem;
  margin: 0;
  font-weight: 800;
  line-height: 1;
}
.unit {
  font-size: 1.8rem;
  font-weight: 400;
}
.weather-desc {
  font-size: 1.2rem;
  margin: 8px 0 0 0;
  opacity: 0.9;
}
.sub-temp-info {
  text-align: right;
  font-size: 0.95rem;
  line-height: 1.6;
}
.metrics-row {
  margin-bottom: 0;
}
.metric-card {
  border-radius: 10px;
  text-align: center;
  background-color: #f8fafc;
}
.sub-text {
  font-size: 0.8rem;
  color: #909399;
  margin: 6px 0 0 0;
}
.box-card {
  border-radius: 10px;
}
.card-title {
  font-weight: bold;
  font-size: 1.05rem;
  color: #303133;
}
.timeline-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.timeline-item {
  flex: 1;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}
.time-label {
  font-size: 0.8rem;
  color: #909399;
}
.temp-label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>

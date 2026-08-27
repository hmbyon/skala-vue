<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { useConfigStore } from '@/stores/configStore'

const router = useRouter()
const configStore = useConfigStore()

// .env 환경변수 및 기본 fallback API Key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '638421926882751adead648f88a64a7c'

const initialCities = ['Seoul', 'Suwon', 'Busan', 'Daejeon', 'Jeju']

const searchQuery = ref('')
const cityList = ref([])
const favoriteCities = ref([])
const randomAdvice = ref('')
const loading = ref(false)

// 주요 도시 한글 이름 매핑 사전
const cityNameMap = {
  seoul: '서울',
  suwon: '수원',
  'suwon-si': '수원',
  busan: '부산',
  daejeon: '대전',
  jeju: '제주',
  'jeju city': '제주',
  incheon: '인천',
  daegu: '대구',
  gwangju: '광주',
  ulsan: '울산',
  tokyo: '도쿄',
  'new york': '뉴욕',
}

// 영문 도시명을 한글로 변환 (등록되지 않은 경우 영문 유지)
const getKoreanCityName = (englishName) => {
  if (!englishName) return ''
  const key = englishName.toLowerCase().trim()
  return cityNameMap[key] || englishName
}

// Pinia 전역 단위(celsius/fahrenheit)에 맞춰 기온 숫자 연산
const formatTemp = (celsius) => {
  if (celsius === undefined || celsius === null) return 0
  if (configStore.unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return Math.round(celsius)
}

// OpenWeatherMap 실시간 날씨 데이터 조회
const fetchCityWeather = async (cityName) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=kr&appid=${API_KEY}`,
    )
    return {
      id: res.data.id,
      name: getKoreanCityName(res.data.name),
      status: res.data.weather[0].description,
      temp: Math.round(res.data.main.temp),
    }
  } catch (err) {
    console.error(`날씨 조회 실패 (${cityName}):`, err)
    return null
  }
}

const loadDefaultCities = async () => {
  loading.value = true
  const results = await Promise.all(initialCities.map((city) => fetchCityWeather(city)))
  cityList.value = results.filter((item) => item !== null)
  loading.value = false
}

// 외부 API (Advice Slip) 연동
const fetchExternalAdvice = async () => {
  try {
    const res = await axios.get('https://api.adviceslip.com/advice')
    randomAdvice.value = res.data.slip.advice
  } catch {
    ElMessage.error('외부 Advice API 수신에 실패했습니다.')
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
    ElNotification({
      title: '검색 성공',
      message: `${searchedCity.name}의 날씨 정보가 추가되었습니다.`,
      type: 'success',
    })
  } else {
    ElMessage.error('도시를 찾을 수 없습니다. (영문 지명을 확인하세요)')
  }
}

const handleToggleFavorite = (cityName) => {
  if (favoriteCities.value.includes(cityName)) {
    favoriteCities.value = favoriteCities.value.filter((name) => name !== cityName)
    ElMessage.info(`${cityName}이(가) 즐겨찾기에서 제외되었습니다.`)
  } else {
    favoriteCities.value.push(cityName)
    ElMessage.success(`${cityName}이(가) 즐겨찾기에 등록되었습니다.`)
  }
}

const handleDetail = (cityId) => {
  router.push(`/weather/${cityId}`)
}

onMounted(() => {
  loadDefaultCities()
  fetchExternalAdvice()
})
</script>

<template>
  <div class="dashboard-container">
    <!-- 🔍 실시간 도시 날씨 검색 -->
    <el-card shadow="hover" class="box-card">
      <template #header>
        <div class="card-header">
          <span>🔍 실시간 도시 날씨 검색</span>
        </div>
      </template>
      <el-input
        v-model="searchQuery"
        placeholder="검색할 도시 이름을 영문으로 입력 후 엔터 (예: Seoul, Tokyo)"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
      </el-input>
      <div class="search-tag" v-if="searchQuery">
        <el-tag type="info" size="small">검색어: {{ searchQuery }}</el-tag>
      </div>
    </el-card>

    <!-- 🏙️ 주요 도시 날씨 현황 -->
    <el-card shadow="hover" class="box-card">
      <template #header>
        <div class="card-header">
          <span>🏙️ 주요 도시 날씨 현황</span>
          <el-tag type="success" effect="dark">{{ cityList.length }}개 도시 조회됨</el-tag>
        </div>
      </template>

      <!-- 로딩 상태 스켈레톤 -->
      <el-skeleton :rows="3" animated v-if="loading" />

      <div v-else>
        <el-empty description="표시할 도시 날씨 데이터가 없습니다." v-if="cityList.length === 0" />

        <el-row :gutter="16" v-else>
          <el-col :xs="24" :sm="12" :md="8" v-for="city in cityList" :key="city.id">
            <el-card class="city-item-card" shadow="never">
              <div class="city-header">
                <span class="city-title">{{ city.name }}</span>
                <el-button type="text" @click="handleToggleFavorite(city.name)">
                  <el-icon
                    size="20"
                    :color="favoriteCities.includes(city.name) ? '#E6A23C' : '#909399'"
                  >
                    <StarFilled v-if="favoriteCities.includes(city.name)" />
                    <Star v-else />
                  </el-icon>
                </el-button>
              </div>

              <div class="city-body">
                <!-- Pinia 스토어 단위 반응형 적용 -->
                <span class="temp-display">
                  {{ formatTemp(city.temp) }}{{ configStore.unitSymbol }}
                </span>
                <el-tag type="warning" effect="light">{{ city.status }}</el-tag>
              </div>

              <div class="city-footer">
                <el-button type="primary" size="small" plain @click="handleDetail(city.id)">
                  상세예보 보기 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 💡 외부 API 피드백 -->
    <el-card shadow="hover" class="advice-card">
      <template #header>
        <div class="card-header">
          <span>💡 오늘의 한마디 (Advice Slip API)</span>
        </div>
      </template>
      <p class="advice-text">"{{ randomAdvice || '글귀를 불러오는 중입니다...' }}"</p>
      <el-button type="success" size="small" plain @click="fetchExternalAdvice">
        <el-icon><Refresh /></el-icon> 다른 문장 가져오기
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.box-card {
  border-radius: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.search-tag {
  margin-top: 8px;
}
.city-item-card {
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}
.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.city-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #303133;
}
.city-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
}
.temp-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409eff;
}
.city-footer {
  display: flex;
  justify-content: flex-end;
}
.advice-card {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.advice-text {
  font-style: italic;
  color: #67c23a;
  font-weight: 500;
  margin-bottom: 12px;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h2>🌤️ Hands on - Weather UI Library</h2>

      <div class="nav-wrapper">
        <nav class="nav-bar">
          <RouterLink to="/">🌤️ 날씨 대시보드</RouterLink>
          <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
          <RouterLink to="/stats">📊 통계 보기</RouterLink>
        </nav>

        <!-- C/F 단위 전환 컴포넌트 -->
        <UnitToggler />
      </div>
    </header>

    <main class="content">
      <!-- 라우터에 따라 WeatherHomeView, WeatherDetailView 등이 전환되는 영역 -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    sans-serif;
}

.header {
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0 0 16px 0;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar {
  display: flex;
  gap: 16px;
}

.nav-bar a {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  padding-bottom: 4px;
  transition: color 0.2s;
}

.nav-bar a.router-link-active {
  color: #22c55e;
  border-bottom: 2px solid #22c55e;
}

.content {
  width: 100%;
}
</style>

<style>
/* 웹폰트(Pretendard) 불러오기 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');

/* 전역 폰트 및 Element Plus 메시지 폰트 강제 적용 */
* {
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    sans-serif !important;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import StoreCounter from '@/components/practice/Day4/library/StoreCounter.vue'
// 1. UnitToggler 컴포넌트 import 추가
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h2>🌤️ 종합실습 5: 스토어적용</h2>

    <!-- 2. 내비게이션 바와 단위 변경 토글을 감싸는 header 태그 적용 -->
    <header class="header">
      <nav class="nav-bar">
        <RouterLink to="/">⛅ 날씨 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <RouterLink to="/stats">📊 통계 보기</RouterLink>
      </nav>

      <!-- Navigation Bar 우측에 UnitToggler 배치 -->
      <UnitToggler />
    </header>

    <main class="content">
      <RouterView />

      <hr style="margin: 30px 0; border: none; border-top: 1px dashed #ccc" />

      <StoreCounter />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

/* 3. 헤더 양끝 정렬 (Nav - 좌측, UnitToggler - 우측) */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.nav-bar {
  display: flex;
  gap: 15px;
}

.nav-bar a {
  text-decoration: none;
  color: #666;
  font-weight: bold;
}

.nav-bar a.router-link-active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
}
</style>

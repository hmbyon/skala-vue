<script setup>
import { RouterLink, RouterView } from 'vue-router'
// 1. StoreCounter 컴포넌트 import 추가
import StoreCounter from '@/components/practice/Day4/library/StoreCounter.vue'
</script>

<template>
  <div class="app-container">
    <h2>🌤️ 과제 4: 라우터적용</h2>
    <nav class="nav-bar">
      <RouterLink to="/">⛅ 날씨 대시보드</RouterLink>
      <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
      <RouterLink to="/stats">📊 통계 보기</RouterLink>
    </nav>
    <main class="content">
      <RouterView />

      <hr style="margin: 30px 0; border: none; border-top: 1px dashed #ccc" />

      <!-- 2. 화면 하단에 컴포넌트 배치 -->
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
.nav-bar {
  display: flex;
  gap: 15px;
  justify-content: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 20px;
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

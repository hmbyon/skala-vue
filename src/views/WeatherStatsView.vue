<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div>
    <h3>📈 전국 기온 통계 Summary</h3>
    <p>현재 등록된 주요 도시의 평균 기온은 <strong>26°C</strong>입니다.</p>
    <button @click="router.push('/')">메인으로 돌아가기</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js'

// 스토어 인스턴스 생성
const counterStore = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>Counter Store 활용 실습</h2>

    <!-- State & Getters 접근 -->
    <p>
      원본 카운트 데이터(state): <strong>{{ counterStore.count }}</strong>
    </p>
    <p>
      2배 연산 데이터(getters): <span>{{ counterStore.doubleCount }}</span>
    </p>

    <!-- Actions 실행 -->
    <button @click="counterStore.increment">숫자 1 증가 (actions)</button>
  </div>
</template>

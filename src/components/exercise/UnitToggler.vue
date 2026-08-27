<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">날씨단위: {{ configStore.unitText }}</span>
    <button class="toggle-btn" @click="configStore.toggleUnit">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.toggle-btn {
  padding: 4px 8px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.toggle-btn:hover {
  background-color: #42b883;
}
</style>

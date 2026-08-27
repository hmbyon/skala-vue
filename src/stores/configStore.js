import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // State
  const unit = ref('celsius') // 'celsius' | 'fahrenheit'
  const theme = ref('light') // [추가 State] 테마 설정

  // Getters
  const unitSymbol = computed(() => (unit.value === 'celsius' ? '°C' : '°F'))
  const unitText = computed(() => (unit.value === 'celsius' ? '섭씨(°C)' : '화씨(°F)')) // [추가 Getter]

  // Actions
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  function toggleTheme() {
    // [추가 Action]
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { unit, theme, unitSymbol, unitText, toggleUnit, toggleTheme }
})

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 💡 1. 백엔드 공용 주소
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

// 💡 2. 반응형 상태 데이터
const items = ref([]) // 서버에서 받아온 데이터 배열 박스
const textInput = ref('') // 입력창과 연결된 글자 데이터 박스

// --------------------------------------------------
// [READ] GET : 데이터 가져오기
// --------------------------------------------------
const handleRead = async () => {
  try {
    // 공부용으로 딱 3개만 들고 옵니다.
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    console.log('GET 성공:', response.data)
  } catch (error) {
    console.error('GET 실패:', error)
  }
}

// --------------------------------------------------
// [CREATE] POST : 데이터 추가하기
// --------------------------------------------------
const handleCreate = async () => {
  if (!textInput.value.trim()) return
  try {
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '내용',
      userId: 1,
    })
    items.value.unshift(response.data)
    textInput.value = ''
    console.log('POST 성공:', response.data)
  } catch (error) {
    console.error('POST 실패:', error)
  }
}

// --------------------------------------------------
// [UPDATE] PUT : 데이터 수정하기
// --------------------------------------------------
const handleUpdate = async (id) => {
  const newTitle = prompt('수정할 제목을 입력하세요:')
  if (!newTitle) return
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      title: newTitle,
      body: '수정된 내용',
      userId: 1,
    })
    const target = items.value.find((item) => item.id === id)
    if (target) target.title = response.data.title
    console.log('PUT 성공:', response.data)
  } catch (error) {
    console.error('PUT 실패:', error)
  }
}

// --------------------------------------------------
// [DELETE] DELETE : 데이터 삭제하기
// --------------------------------------------------
const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    items.value = items.value.filter((item) => item.id !== id)
    console.log('DELETE 성공:', id)
  } catch (error) {
    console.error('DELETE 실패:', error)
  }
}

// 컴포넌트 마운트 시 실행
onMounted(() => {
  handleRead()
})
</script>

<template>
  <div class="crud-container">
    <h2>⚡ Axios CRUD 프로토타입 훈련</h2>

    <!-- 입력 영역 (POST) -->
    <div class="input-box">
      <input
        v-model="textInput"
        placeholder="저장할 텍스트를 입력하세요"
        @keyup.enter="handleCreate"
      />
      <button class="btn-post" @click="handleCreate">POST (추가)</button>
    </div>

    <!-- 리스트 출력 영역 (READ / PUT / DELETE) -->
    <div class="item-list">
      <div v-for="item in items" :key="item.id" class="item-card">
        <div class="item-content">
          <span class="item-id">ID : {{ item.id }}</span>
          <p class="item-title">{{ item.title }}</p>
        </div>
        <div class="btn-group">
          <button class="btn-put" @click="handleUpdate(item.id)">PUT (수정)</button>
          <button class="btn-del" @click="handleDelete(item.id)">DEL (삭제)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crud-container {
  max-width: 550px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}

h2 {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 16px;
}

.input-box {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.input-box input {
  flex: 1;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  outline: none;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-post {
  background-color: #20c997;
}
.btn-put {
  background-color: #f59e0b;
}
.btn-del {
  background-color: #ef4444;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 10px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.item-content {
  flex: 1;
  margin-right: 12px;
}

.item-id {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: bold;
}

.item-title {
  margin: 4px 0 0 0;
  font-size: 0.9rem;
  color: #1e293b;
  word-break: break-all;
}

.btn-group {
  display: flex;
  gap: 6px;
}
</style>

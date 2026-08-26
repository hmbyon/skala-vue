# SKALA Vue.js 프론트엔드 학습 및 실습 기록

SKALA 과정 중 진행한 Vue 3 프론트엔드 실습 코드와 과제 수행 내역을 기록한 문서입니다.

---

## Hands-on 과제 현황

|  차수  |                과제명                |              주요 내용 및 학습 키워드              |
| :----: | :----------------------------------: | :------------------------------------------------: |
| **01** | 개발 환경 구축 & Project Scaffolding |     Node.js, WSL2, Vite, Vue 3, HMR, DevTools      |
| **02** |        과제 1: 날씨 앱 Mockup        | Vue Syntax, 다양한 디렉티브 활용, IME, 트러블슈팅  |
| **03** |  과제 2: 날씨 앱 (Composition API)   |   ref, computed, watch, watchEffect, 커스텀 상태   |
| **04** |   과제 3: 날씨 앱 (Component 분리)   |    Props, Emits, Slot, 통계 컴포넌트 추가 분리     |
| **05** |   과제 4: 라우터 적용 (Vue Router)   | RouterLink, RouterView, 동적 파라미터, 라우팅 가드 |
| **06** |    과제 5: 전역 상태 관리 (Pinia)    |    Store, State, Getters, Actions, ConfigStore     |
| **07** |  과제 6: 비동기 데이터 통신 (Axios)  |     OpenWeatherMap API, REST API, async/await      |
| **08** |      과제 7: UI 라이브러리 적용      |  Element Plus 컴포넌트, Form Validation, UI 개편   |
| **09** |  코드 품질 관리 (Lint & Formatter)   |     ESLint, Prettier 설정, 환경변수(.env) 분리     |
| **10** |      과제 8: 최종 빌드 및 배포       |   Vite Build, Static Hosting (Vercel/Netlify/S3)   |

---

## 실습 상세 기록

### Hands-on 01: 개발 환경 구축 & Project Scaffolding

#### 1. 개요 및 목적

- Vue 3 애플리케이션 개발에 필요한 실행 환경(Node.js, WSL2) 및 IDE(VS Code) 확장 프로그램을 설정
- `create-vue` 스캐폴딩 도구를 활용해 Vite 기반의 표준 Vue 3 프로젝트 뼈대를 생성하고, 초기 실행 및 디버깅 환경을 확인

#### 2. 개발 환경 구성

- **Runtime / Package Manager**: Node.js (`v24.16.0`), npm (`11.13.0`)
- **OS Environment**: Windows Subsystem for Linux 2 (WSL2 Ubuntu) / macOS
- **IDE & Extension**:
  - VS Code
  - Vue (Official)
  - ESLint (`Microsoft`)
  - Prettier - Code formatter (`Prettier`)
  - WSL Extension (`Microsoft`)
- **Debugging Tools**: Vite Plugin Vue DevTools (`vite-plugin-vue-devtools`), Postman

#### 3. 프로젝트 생성 (`skala-vue`)

`create-vue@3.22.3`을 사용하여 강의 표준 환경에 맞춰 프로젝트 옵션을 지정 및 생성했습니다.

```bash
# 작업 디렉토리 이동 및 스캐폴딩 실행
cd ~/projects
npm create vue@3.22.3
```

**설정 옵션 선택:**

- `Project name`: `skala-vue`
- `Add TypeScript?`: No
- `Add JSX Support?`: No
- `Add Vue Router?`: Yes
- `Add Pinia?`: Yes
- `Add Vitest / E2E?`: No
- `Add ESLint / Prettier?`: Yes

#### 4. 실행 명령 및 실행 결과

```bash
# 1. 프로젝트 이동 및 의존성 패키지 설치
cd skala-vue
npm install

# 2. 로컬 개발 서버 가동
npm run dev
# -> Local: http://localhost:5173/ 접속 확인

# 3. 코드 포맷팅 및 배포 빌드 테스트
npm run format
npm run build
```

#### 5. 주요 실습 및 결과 확인

- **디렉토리 구조 파악**:
  - `src/`: 실제 작업 공간 (Components, Views, Router, Stores 등)
  - `index.html`: 앱 진입점 단일 HTML (`<div id="app"></div>`)
  - `vite.config.js`: Vite 전역 빌드 및 개발 서버 설정

- **HMR 동작 확인**:
  - `src/views/AboutView.vue` 내 템플릿 문구를 수정하고 저장했을 때, 브라우저 전체 새로고침 없이 변경된 UI만 즉시 반영되는 것을 검증함

- **Vue DevTools 오버레이 확인**:
  - 브라우저 하단 오버레이 버튼 및 단축키(`Alt + Shift + D`)를 통해 Component 트리 상태, Router 매칭 현황, Pinia Store 상태를 정상적으로 탐색/디버깅 가능함을 확인

#### 6. 메모 / 문제 해결

- **WSL2 환경 확장 프로그램 연결**: Windows VS Code 사용 시 왼쪽 하단 원격 연결 아이콘(`><`)을 클릭하여 `Connect to WSL` 진행 후, WSL Ubuntu 구역에 `Vue (Official)`, `ESLint`, `Prettier` 확장을 복사 설치해야 정상 작동함
- **Vite DevTools**: 기존 크롬 확장 프로그램 설치 방식 대신, 프로젝트 플러그인(`vite-plugin-vue-devtools`) 형태로 포함되어 브라우저 내 인앱 오버레이로 더 직관적인 디버깅 가능

---

### Hands-on 02: 과제 1 - 날씨 앱 Mockup

#### 1. 개요 및 목적

- Vue 3의 핵심 템플릿 문법(Directive)과 이벤트 핸들링 메커니즘을 실제 화면으로 구현
- 반응형 데이터(`ref`) 기반으로 리스트 렌더링, 조건부 스타일링, 이벤트 제어 수식어, 한글 입력 양방향 동기화 처리 및 초기 템플릿 스타일 레이아웃 이슈를 직접 해결함

#### 2. 활용한 Vue 디렉티브(Directives) 상세

- **v-for & :key**:
  - `weatherList` 배열 내 도시 객체들을 순회하며 카드 UI를 반복 출력
  - Virtual DOM 재조작 및 성능 최적화를 위해 고유 식별자인 `:key="item.id"`를 필수 지정

- **v-if / v-else**:
  - `item.temp >= 25` 조건식에 따라 기온별 상태 라벨 분기 렌더링

- **:value & @input**:
  - 한글 입력 특성에 의한 상태 업데이트 지연 현상을 방지하기 위해 단방향 데이터 바인딩과 이벤트 수동 수신 방식을 조합하여 사용

- **@click & @click.stop**:
  - 카드 요소 클릭 시 해당 도시 선택 문구(`selectedCityInfo`)를 업데이트
  - 내부 자식 요소인 [상세보기] 버튼 클릭 시 `@click.stop` 수식어를 적용하여 부모 요소로의 이벤트 버블링 차단

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **데이터 구조 확장**: 요구사항의 기본 도시(서울, 수원, 부산) 외에 대전, 제주 데이터를 추가 구성하여 총 5개 도시 목록 구축
- **한글 IME 실시간 입출력 동기화**: 단순 `v-model` 바인딩 시 한글 조합 입력 중간에 상태 반영이 씹히는 현상을 극복하기 위해 인라인 `@input` 핸들러와 `:value` 바인딩 조합으로 실시간 동기화 구현

#### 4. 핵심 구현 스니펫 및 소스 파일

- **작성 소스 파일**: `src/components/WeatherMockup.vue`

```vue
<!-- 한글 조합 지연 방지 바인딩 및 이벤트 버블링 차단 (.stop) -->
<input
  type="text"
  :value="searchQuery"
  @input="(e) => (searchQuery = e.target.value)"
  placeholder="검색할 도시 이름 입력"
/>

<div
  v-for="item in weatherList"
  :key="item.id"
  class="weather-card"
  @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
>
  <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
    상세보기
  </button>
</div>
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] 브라우저 창 확장에 따른 레이아웃 축소 현상

- **문제 상황**: 브라우저 폭을 1024px 이상으로 넓힐 때 컴포넌트 전체가 화면 좌측 절반으로 축소되고 오른쪽에 불필요한 여백이 발생하는 현상 발생
- **원인 분석**: Vite 초기 스캐폴딩 생성 시 포함된 `src/assets/main.css` 파일 하단 미디어 쿼리가 화면을 2컬럼 분할하고 있었음
- **해결 방법**: `src/main.js` 파일에서 기본 스타일 임포트 구문을 주석 처리(`// import './assets/main.css'`)하여 전역 레이아웃 간섭을 제거함

##### [Troubleshooting 2] 한글 입력 시 반응형 상태 업데이트 지연 (IME 이슈)

- **문제 상황**: `v-model="searchQuery"` 사용 시, 한글 조합이 완료(`CompositionEnd`)될 때까지 상태 변수에 즉시 반영되지 않고 한 박자 늦게 반영되는 현상 발생
- **원인 분석**: Vue의 `v-model`은 CJK(한국어, 중국어, 일본어) 입력 중 상태 업데이트를 조합 완료 시점까지 보류함
- **해결 방법**: `:value="searchQuery"`와 `@input="(e) => searchQuery = e.target.value"` 형태로 분리해 실시간 동기화 구현

##### [Troubleshooting 3] 버튼 클릭 시 부모 요소 이벤트 중복 실행 (이벤트 버블링)

- **문제 상황**: 카드 내부의 [상세보기] 버튼 클릭 시 alert 호출과 동시에 부모 요소인 `.weather-card`에 바인딩된 클릭 이벤트까지 중복 실행됨
- **원인 분석**: DOM 이벤트 전파 단계 중 자식 버튼 요소의 클릭 이벤트가 상위 카드 요소로 솟구치는 이벤트 버블링 발생
- **해결 방법**: 버튼 요소의 클릭 디렉티브에 `@click.stop` 수식어를 추가하여 이벤트 전파 차단

---

### Hands-on 03: 과제 2 - 날씨 앱 (Composition API)

#### 1. 개요 및 목적

- Composition API의 핵심 기능인 반응형 상태(`ref`), 계산된 프로퍼티(`computed`), 상태 감시자(`watch`, `watchEffect`)의 동작 메커니즘 습득
- 데이터 가공 처리, 부효과(Side Effect) 제어, 조건부 렌더링을 적용하고 커스텀 반응형 상태와 계산/감시 로직 구현

#### 2. 주요 구현 내용

- **ref 반응형 상태 관리**: `searchQuery`, `selectedCityInfo`, `weatherList`, `favoriteCities`를 `ref`로 선언하여 실시간 반영
  - **computed 필터링 & 연산**:
  - `filteredWeatherList`: `searchQuery`에 입력된 문자열을 포함하는 도시만 실시간 필터링
  - `averageTemp`: **현재 화면에 필터링되어 출력 중인 도시들의 평균 기온**을 실시간 연산

- **watch 및 watchEffect 감시자 설정**:
  - `watch(selectedCityInfo)`: 하단 상태 바 문구 변경 시 로그 출력
  - `watchEffect`: `searchQuery` 수집하여 타이핑 시마다 자동 로그 출력
  - `watch(favoriteCities, ..., { deep: true })`: 즐겨찾기 배열 내부 원소 변경 감시

- **검색 결과 예외 처리**: `v-if` 조건으로 결과가 없을 경우 "검색 결과가 일치하는 도시가 없습니다" 메시지 노출

#### 3. 본인 차별점 (커스텀 구현 기능)

- **커스텀 반응형 상태 (`favoriteCities`)**: 사용자가 카드 내 별표 버튼(★/☆)을 눌러 관심 도시를 저장/삭제할 수 있는 토글 기능 구현
- **커스텀 계산 프로퍼티 (`averageTemp`)**: 검색어로 걸러진 결과 집합에 대한 실시간 평균 기온 계산 및 우측 상단 배지 노출
- **커스텀 정밀 감시자 (`watch` + `{ deep: true }`)**: 즐겨찾기 배열 내부 원소 변경을 감지하도록 깊은 감시 옵션 설정

#### 4. 핵심 구현 스니펫 및 소스 파일

- **작성 소스 파일**: `src/components/WeatherComposition.vue`

```javascript
// computed: 실시간 필터링 및 현재 표시 목록 대상 평균 기온 계산
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const averageTemp = computed(() => {
  if (filteredWeatherList.value.length === 0) return 0
  const total = filteredWeatherList.value.reduce((sum, item) => sum + item.temp, 0)
  return (total / filteredWeatherList.value.length).toFixed(1)
})

// watch: 배열 내부 중첩 변경사항 추적 ({ deep: true })
watch(
  favoriteCities,
  (newFavorites) => {
    console.log(`⭐ [watch 감지] 즐겨찾기 목록: ${newFavorites.join(', ') || '없음'}`)
  },
  { deep: true },
)
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] watchEffect 컴포넌트 초기화 시점 자동 호출 현상

- **문제 상황**: 페이지 진입 시 검색어를 입력하지 않았음에도 콘솔에 `watchEffect` 로그가 즉시 출력됨
- **원인 분석**: `watchEffect`는 반응형 의존성을 자동으로 수집하는 과정에서 컴포넌트 마운트 직후 최초 1회 즉시 실행되는 특성을 가짐
- **해결 방법**: 초기 자율 실행이 필요한 영역에는 `watchEffect`를, 특정 변수 변경 시점에만 동작시킬 작업에는 `watch`를 구별하여 지정함

##### [Troubleshooting 2] 참조 타입 배열(favoriteCities) 내부 변경 미감지 현상

- **문제 상황**: `favoriteCities.value.push()`로 배열 원소를 변경해도 `watch` 콜백 함수가 실행되지 않음
- **원인 분석**: Vue 3의 `watch`에 `ref`로 감싸진 배열 전달 시 기본적으로 객체 주솟값 참조 변경만 감지함
- **해결 방법**: `watch` 세 번째 옵션에 `{ deep: true }`를 명시하여 내부 배열 요소의 추가/삭제를 정밀 추적하도록 수정함

---

### Hands-on 04: 과제 3 - 날씨 앱 (Component 분리)

#### 1. 개요 및 목적

- 단일 파일로 구성되어 있던 과제 2의 코드를 역할별 컴포넌트로 모듈화 분리
- 부모-자식 간 단방향 데이터 전달(`Props`), 이벤트 발신(`Emits`), 슬롯(`Slot`) 구조를 구현하고 컴포넌트 확장성 검증

#### 2. 컴포넌트 분리 구조 및 역할

- **`WeatherParent.vue` (부모)**: 모든 반응형 상태(`weatherList`, `searchQuery`, `favoriteCities`) 및 비즈니스 로직 연산 총괄
- **`BaseDashboardCard.vue` (공통 껍데기)**: `<slot>` 구문을 이용해 임의의 자식 요소를 둘러싸는 공통 디자인 카드
- **`SearchBar.vue` (자식)**: `:current-query` 전달받아 표시하고 `@update-query` 이벤트 발신
- **`WeatherCard.vue` (자식)**: `:city-item`, `:is-favorite` 수신하여 표시하고 `@select-card`, `@click-detail`, `@toggle-favorite` 발신
- **`WeatherStats.vue` (독창적 추가 자식 컴포넌트)**: 실시간 평균 기온 및 즐겨찾기 수량을 시각화 출력하는 전용 통계 컴포넌트

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **컴포넌트 추가 분리 (`WeatherStats.vue`)**: 과제 요구사항 7번("Component 추가 분리")에 맞춰 실시간 평균 기온 및 즐겨찾기 수량을 보여주는 전용 요약 바 컴포넌트 개발
- **표준 Props/Emits 및 독창적 기능 재통합**: 표준 규격 명칭(`:current-query`, `:city-item`)을 준수하면서 과제 2의 5개 도시 확장 데이터 및 즐겨찾기 연동 기능 유지

#### 4. 핵심 구현 스니펫 및 소스 파일

- `src/components/BaseDashboardCard.vue`
- `src/components/SearchBar.vue`
- `src/components/WeatherStats.vue`
- `src/components/WeatherCard.vue`
- `src/components/WeatherParent.vue`

##### [WeatherParent.vue & BaseDashboardCard.vue - 슬롯 구조 조립 스니펫]

```vue
<!-- 부모 스코프에서 Slot 내부 자식 컴포넌트 바인딩 및 조립 -->
<BaseDashboardCard>
  <SearchBar :current-query="searchQuery" @update-query="(val) ="> (searchQuery = val)" />
</BaseDashboardCard>

<BaseDashboardCard>
  <!-- 독창적 추가 컴포넌트 주입 -->
  <WeatherStats :avg-temp="averageTemp" :fav-count="favoriteCities.length"/>

  <WeatherCard :city-item="item" :is-favorite="favoriteCities.includes(item.name)" :key="item.id" @select-card="(msg) =" v-for="item in filteredWeatherList"> (selectedCityInfo = msg)"
    @click-detail="showDetail"
    @toggle-favorite="handleToggleFavorite"
  />
</BaseDashboardCard>
```

##### [WeatherCard.vue - 자식 이벤트 버블링 차단 및 발신 스니펫]

```vue
<!-- 즐겨찾기 클릭 시 부모 클릭 이벤트로 전파되지 않도록 .stop 수식어 적용 -->
<button
  class="fav-btn"
  :class="{ active: isFavorite }"
  @click.stop="$emit('toggle-favorite', cityItem.name)"
>
  {{ isFavorite ? '★' : '☆' }}
</button>
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] Slot 내부 자식 컴포넌트 데이터 바인딩 스코프 동작 원리

- **문제 상황**: `BaseDashboardCard`의 `<slot>` 내부에 주입된 `SearchBar` 및 `WeatherCard`가 자식의 자식 형태임에도 `WeatherParent`의 변수와 직접 데이터 바인딩이 가능한가에 대한 스코프 혼선 발생
- **원인 분석**: Vue의 슬롯 콘텐츠는 무대 역할을 하는 전달 대상 컴포넌트(`BaseDashboardCard`) 내부가 아니라, 작성된 위치인 부모 컴포넌트(`WeatherParent`) 스코프에서 평가 및 컴파일됨
- **해결 방법**: `WeatherParent`에서 슬롯 내부 자식 요소들에 직접 `:current-query` 및 `@update-query` 등의 Props/Emits를 연결하여 직관적인 데이터 통신 구현

##### [Troubleshooting 2] 자식 컴포넌트 간 이벤트 발신 시 Emits 인자 매핑 이슈

- **문제 상황**: 자식 컴포넌트인 `WeatherCard`에서 `click-detail` 이벤트를 쏠 때 `cityItem.name`과 `cityItem.status`를 전달하는데 부모에서 인자가 올바르게 매핑되지 않는 이슈 발생
- **원인 분석**: `$emit('click-detail', cityItem.name, cityItem.status)` 형태 사용 시 부모에서 `@click-detail="showDetail"`로 함수명만 바인딩해야 순서대로 인자가 자동 매핑되는데, 부모 템플릿 인라인 표현식 사용 시 인자 전달 방식에 혼선이 있었음
- **해결 방법**: 부모의 `@click-detail="showDetail"` 표현 방식을 명확히 정돈하여 인자가 순서대로 정상 전달되도록 정립함

---

### Hands-on 05: 과제 4 - 라우터 적용 (Vue Router)

#### 1. 개요 및 목적

- Vue Router 4를 도입하여 싱글 페이지 애플리케이션(SPA) 환경에서 새로고침 없는 클라이언트 사이드 라우팅 구현
- 지연 로딩(Lazy Loading), 동적 경로 매핑(Dynamic Route Matching), URL 쿼리 스트링 상태 연동 및 Catch-all 404 예외 처리 적용

#### 2. 주요 구현 내용

- **페이지 구성 및 라우터 설정 (`src/router/index.js`)**:
  - `WeatherHomeView.vue` (`/`): 메인 대시보드 및 실시간 검색, 도시 카드 목록
  - `WeatherAboutView.vue` (`/about`): 서비스 소개 정적 페이지
  - `WeatherDetailView.vue` (`/weather/:cityId`): `:cityId` 동적 파라미터를 수신하여 기상 관측 상세 정보 출력
  - `NotFoundView.vue` (`/:pathMatch(.*)*`): 정의되지 않은 경로 접근 시 Catch-all Route 처리

- **App.vue 레이아웃 구축**: `RouterLink` 기반 상단 내비게이션 바 및 메인 콘텐츠 영역(`RouterView`) 배치
  - **프로그래밍 방식 이동**: 카드 상세보기 클릭 시 기존 `window.alert()`을 제거하고 `router.push('/weather/' + id)` 실행
  - **URL 쿼리 스트링 동기화**: `WeatherHomeView.vue` 마운트 시 `route.query.search` 복원 및 타이핑 시 실시간 URL 쿼리 동기화

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **추가 View 작성 및 라우팅 (`WeatherStatsView.vue`)**: 요구사항 6번("추가 view 작성 및 Routing")에 맞춰 전국 기온 요약 통계를 보여주는 전용 페이지(`/stats`) 개발 및 라우터 등록
- **커스텀 404 예외 처리 UI (`NotFoundView.vue`)**: 독창적인 아이콘(`☀️❓`)과 중앙 정렬 카드 레이아웃을 적용하여 직관적이고 친근한 에러 안내 화면 구성

#### 4. 핵심 구현 스니펫 및 주요 소스 파일

- `src/router/index.js`
- `src/views/WeatherHomeView.vue`
- `src/views/WeatherDetailView.vue`
- `src/views/WeatherAboutView.vue`
- `src/views/NotFoundView.vue`

##### [src/router/index.js - 지연 로딩 및 Catch-all 설정 스니펫]

```javascript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/WeatherHomeView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/WeatherAboutView.vue') },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    {
      path: '/stats',
      name: 'weather-stats',
      component: () => import('../views/WeatherStatsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})
```

##### [WeatherHomeView.vue - 쿼리 스트링 동기화 및 router.replace 스니펫]

```javascript
// 초기 마운트 시 URL 쿼리(?search=) 값으로 검색 상태 복원
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})

// 입력값 변경 시 URL 쿼리 실시간 덮어쓰기 (replace 적용으로 히스토리 누적 방지)
watch(searchQuery, (newQuery) => {
  router.replace({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] 검색어 실시간 타이핑 시 브라우저 방문 기록(History) 누적 현상

- **문제 상황**: 검색 입력창에 한 글자씩 입력할 때마다 `watch` 내에서 `router.push()`가 실행되어 뒤로가기 버튼을 수차례 눌러야 이전 페이지로 이동하는 문제 발생
- **원인 분석**: `router.push()`는 호출될 때마다 브라우저 세션 히스토리 스택에 새 이력을 지속적으로 쌓음
- **해결 방법**: `router.push()` 대신 `router.replace()`를 사용하여 방문 기록을 추가하지 않고 현재 URL 상태만 덮어쓰도록 개선함

##### [Troubleshooting 2] 라우터 이름(Name) 매핑 불일치로 인한 홈 이동 오류

- **문제 상황**: `NotFoundView.vue`에서 `router.push({ name: 'WeatherHome' })` 호출 시 해당 이름을 찾지 못해 버튼 클릭 이벤트가 동작하지 않음
- **원인 분석**: `router/index.js`에 설정된 메인 라우트의 name 속성(`'home'`)과 View에서 호출하려 한 name 속성(`'WeatherHome'`)이 불일치함
- **해결 방법**: 경로 기반 직관적 이동 방식인 `router.push('/')`로 변경하여 라우터 명칭 의존성 없이 안정적으로 동작하도록 수정함

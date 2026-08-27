# SKALA Vue.js 프론트엔드 학습 및 실습 기록

**배포 및 저장소 링크**

- **Vercel 라이브 배포**: [hhttps://skala-vue-eight-rho.vercel.app](https://skala-vue-eight-rho.vercel.app)
- **GitHub 저장소**: [https://github.com/hmbyon/skala-vue](https://github.com/hmbyon/skala-vue)

---

> SKALA 과정 중 진행한 Vue 3 프론트엔드 실습 코드와 과제 수행 내역을 기록한 문서입니다.

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

---

### Hands-on 06: 과제 5 - 전역 상태 관리 (Pinia)

#### 1. 개요 및 목적

- Vue 3의 공식 전역 상태 관리 라이브러리인 Pinia를 도입하여 애플리케이션 전역에서 공유되는 상태를 중앙 집중식으로 관리
- 섭씨/화씨 온도 단위(`unit`) 상태를 스토어(`configStore.js`)에 구축하고, 여러 컴포넌트(`UnitToggler.vue`, `WeatherCard.vue`)에서 Props Drilling 없이 반응형으로 동기화 및 제어

#### 2. 주요 구현 내용

- **Pinia Store 구축 (`src/stores/configStore.js`)**:
  - Setup Store 방식(`defineStore`)으로 작성
  - **State**: `unit` (`'celsius'` | `'fahrenheit'`)
  - **Getters**: `unitSymbol` (`'°C'` | `'°F'`)
  - **Actions**: `toggleUnit()`을 통해 섭씨/화씨 단위 즉시 전환

- **단위 토글 컴포넌트 개발 (`UnitToggler.vue`)**:
  - 스토어의 `configStore.unit` 상태를 읽어 현재 단위(`섭씨(℃)` / `화씨(℉)`)를 표시하고 버튼 클릭 시 `configStore.toggleUnit` 실행

- **App.vue 레이아웃 통합**:
  - `<header class="header">` 구역을 작성하여 상단 내비게이션 바 우측 끝에 `UnitToggler.vue` 배치 (`justify-content: space-between`)

- **날씨 카드 기온 동적 변환 (`WeatherCard.vue`)**:
  - `configStore.unit`이 `'fahrenheit'`일 때 `(rawTemp * 9) / 5 + 32` 공식을 적용해 화씨 숫자를 동적 연산하는 `computed` 프로퍼티(`displayTemp`) 구현
  - 템플릿의 하드코딩된 `°C` 대신 `{{ displayTemp }}{{ configStore.unitSymbol }}`로 연결하여 클릭 시 전체 화면의 기온 숫자와 단위 기호가 실시간 업데이트되도록 바인딩

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **전역 상태 기반 유기적 UI 동기화**: 컴포넌트 간 복잡한 Props/Emits 전달 과정 없이, Header 토글 버튼 클릭 단 한 번으로 메인 대시보드 내 모든 날씨 카드의 온도값과 단위 배지가 실시간 동기화되도록 설계
- **화씨 연산 및 반올림 처리**: `Math.round()`를 적용해 화씨 변환 시 발생하는 소수점 자릿수를 정수로 깔끔하게 가공 출력

#### 4. 핵심 구현 스니펫 및 주요 소스 파일

- `src/stores/configStore.js`
- `src/components/exercise/UnitToggler.vue`
- `src/components/exercise/WeatherCard.vue`
- `src/App.vue`

##### [src/stores/configStore.js - Pinia Store 스니펫]

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const unitSymbol = computed(() => (unit.value === 'celsius' ? '°C' : '°F'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { unit, unitSymbol, toggleUnit }
})
```

##### [WeatherCard.vue - 스토어 연동 및 화씨 연산 computed 스니펫]

```vue
<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'

const props = defineProps({
  cityItem: { type: Object, required: true },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()

// 스토어의 상태값이 'fahrenheit'일 때만 화씨 공식 적용 연산
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] 스토어 정의 후 Vue DevTools 내 Pinia 미노출 현상

- **문제 상황**: `configStore.js` 작성 후 Vue DevTools 탭에 스토어가 즉시 노출되지 않는 현상 발생
- **원인 분석**: Pinia 스토어는 Lazy Initialization 방식으로 동작하여, 해당 스토어 훅을 가동하는 컴포넌트가 실제 DOM에 렌더링되기 전까지는 인스턴스가 등록되지 않음
- **해결 방법**: `UnitToggler.vue` 및 `WeatherCard.vue`를 화면에 마운트시킨 후 새로고침하여 DevTools에 `config` 스토어가 정상 등록됨을 검증

##### [Troubleshooting 2] 컴포넌트 세부 폴더 구조에 따른 Vite Import 경로 에러

- **문제 상황**: `App.vue`에서 `UnitToggler.vue`를 불러올 때 모듈 로딩 에러(`Failed to resolve import`) 발생
- **원인 분석**: 프로젝트 폴더 구조상 파일이 `src/components/` 직하위가 아닌 `src/components/exercise/` 세부 디렉터리에 위치함
- **해결 방법**: `App.vue` 내 import 구문을 `import UnitToggler from '@/components/exercise/UnitToggler.vue'`로 프로젝트 파일 구조에 맞게 수정하여 해결

---

### Hands-on 07: 과제 6 - 비동기 데이터 통신 (Axios)

#### 1. 개요 및 목적

- Axios 라이브러리를 활용해 REST API 기반 비동기 데이터 통신(`async/await`) 메커니즘을 습득
- OpenWeatherMap 실제 기상 API 및 기타 외부 API(Advice Slip)를 연동하여 기존 Mockup 데이터 구조를 실시간 데이터 생태계로 확장하고, Vue Router 기반 상세 예보 화면과의 연동 구조 구축

#### 2. 주요 구현 내용

- **OpenWeatherMap 실시간 날씨 데이터 조회 (요구사항 1)**: `axios.get()`을 통해 지정된 5개 도시('Seoul', 'Suwon', 'Busan', 'Daejeon', 'Jeju')의 실시간 날씨 상태 및 기온 데이터를 수신하고 `Promise.all`을 활용해 병렬 로딩 처리
- **OpenWeatherMap 단기 예보 API 확장 (요구사항 2)**: 도시 카드 상세보기 클릭 시 상세 페이지(`WeatherDetailView.vue`)로 이동하여, 동적 라우트 파라미터(`:cityId`) 기반의 5일/3시간 단기 예보 API(`forecast`)를 조회하고 Grid 형태로 출력
- **기타 외부 API 추가 연동 (요구사항 3)**: Advice Slip API(`[https://api.adviceslip.com/advice]`)를 연동하여 대시보드 하단에 "오늘의 한마디" 출력 및 [새 문장 불러오기] 비동기 갱신 기능 구현
- **동적 도시 검색 및 추가**: 사용자가 입력한 도시명으로 실시간 API 조회를 수행하고, 검색 성공 시 목록 최상단에 신규 도시 데이터를 동적으로 삽입

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **`Promise.all` 기반 비동기 요청 병렬화**: 초기 5개 도시의 데이터 요청을 병렬 처리하여 초기 렌더링 속도를 최적화하고, `filter(item => item !== null)` 처리로 API 에러 바운더리 구축
- **뷰 레벨 역할 분리를 통한 라우팅 설계**: 메인 대시보드(`WeatherHomeView.vue`)와 상세 예보 페이지(`WeatherDetailView.vue`)의 역할 및 API 호출을 완전히 분리하여 확장성 확보
- **환경변수(`import.meta.env`) 및 Pinia 스토어 연동**: OpenWeatherMap API Key를 환경변수로 안전하게 분리 관리하며, API로 불러온 실시간 기온 데이터 역시 Pinia `configStore`에 의해 섭씨/화씨로 실시간 상호 변환되도록 구축

#### 4. 핵심 구현 스니펫 및 주요 소스 파일

- `src/views/WeatherHomeView.vue`
- `src/views/WeatherDetailView.vue`
- `src/App.vue`

##### [WeatherHomeView.vue - Axios 병렬 처리 및 Advice API 연동 스니펫]

```javascript
// 초기 5개 도시 실시간 날씨 데이터 병렬 요청
const loadDefaultCities = async () => {
  const results = await Promise.all(initialCities.map((city) => fetchCityWeather(city)))
  cityList.value = results.filter((item) => item !== null)
}

// OpenWeatherMap Current Weather API 호출
const fetchCityWeather = async (cityName) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=kr&appid=${API_KEY}`,
    )
    return {
      id: res.data.id,
      name: res.data.name,
      status: res.data.weather[0].description,
      temp: Math.round(res.data.main.temp),
    }
  } catch (err) {
    console.error(`날씨 조회 실패 (${cityName}):`, err)
    return null
  }
}

// 외부 API (Advice Slip) 연동
const fetchExternalAdvice = async () => {
  try {
    const res = await axios.get('https://api.adviceslip.com/advice')
    randomAdvice.value = res.data.slip.advice
  } catch (err) {
    console.error('외부 API 조회 실패:', err)
  }
}
```

##### [WeatherDetailView.vue - 동적 파라미터 기반 단기 예보 API 연동 스니펫]

```javascript
// 동적 라우트 파라미터(:cityId)를 수신하여 해당 도시 5일/3시간 예보 API 조회
const fetchForecast = async () => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&lang=kr&appid=${API_KEY}`,
    )
    cityName.value = res.data.city.name
    forecastList.value = res.data.list.slice(0, 8) // 향후 24시간 예보
  } catch (err) {
    console.error('예보 데이터 조회 실패:', err)
  } finally {
    isLoading.value = false
  }
}
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] OpenWeatherMap 도시 영문명 불일치로 인한 데이터 누락 현상 (404 Error)

- **문제 상황**: 초기 도시 목록에 `'Jeju-do'`를 지정했으나 API 호출 시 `404 Not Found` 에러가 발생하며 화면에 3개 도시만 출력되는 현상 발생
- **원인 분석**: OpenWeatherMap API 식별 DB 표준 영문명과 입력 명칭 간 불일치로 인해 `fetchCityWeather`에서 `null`을 반환하고 `filter` 단계에서 제외됨
- **해결 방법**: OpenWeatherMap의 표준 도시 지명인 `'Jeju'`로 명칭을 수정하여 5개 도시 데이터가 모두 정상 응답받도록 개선

##### [Troubleshooting 2] 상세 페이지 라우팅 파라미터 연동 구조 개편

- **문제 상황**: [상세보기] 클릭 시 단순 메인 화면 하단에 예보가 출력되거나 페이지 이동 시 도시 정보가 제대로 전달되지 않는 현상 발생
- **원인 분석**: `WeatherCard`에서 발신되는 이벤트를 처리할 때 도시의 고유 식별자(`city.id`) 대신 도시 이름 문자열만 넘겨받아 라우터 패스와 매핑이 어긋남
- **해결 방법**: `@click-detail="handleDetail(city.id)"`로 이벤트를 바인딩하고 `router.push('/weather/' + cityId)`를 실행하여 `WeatherDetailView.vue`에서 `route.params.cityId`로 예보 API를 정상 호출하도록 구조 수정

---

### Hands-on 08: 과제 7 - UI 라이브러리 적용 (Element Plus)

#### 1. 개요 및 목적

- Vue 3 오픈소스 UI 라이브러리인 **Element Plus**를 도입하여 애플리케이션 컴포넌트 표준화 및 UX 고도화 진행
- 직접 CSS 마크업을 작성하던 기존 방식을 대폭 개선하고, 24분할 반응형 그리드, 스케일톤 유령 레이아웃, 인포그래픽 통계 위젯 등 완성형 컴포넌트를 결합하여 완성도 높은 UI 구축

#### 2. 주요 구현 내용

- **글로벌 UI 환경 구성 (`src/main.js`)**: Element Plus 모듈, 전역 CSS 패키지(`index.css`), `@element-plus/icons-vue` 전체 아이콘 컴포넌트 전역 주입
- **대시보드 UI 개편 (`WeatherHomeView.vue`)**:
  - `<el-card>` 및 `<el-input>` 기반의 조건 검색 바 구축
  - `<el-row>` 및 `<el-col>` 24분할 반응형 그리드를 통한 카드 자동 레이아웃 배치
  - 비동기 로딩 시 `<el-skeleton>` 수신 버퍼 처리 및 데이터 누락 시 `<el-empty>` 자동 노출

- **상세 예보 화면 인포그래픽화 (`WeatherDetailView.vue`)**:
  - `<el-statistic>` 및 `<el-progress>` 기반의 습도, 풍속, 구름량 시각화
  - `<el-descriptions>`를 활용한 일출/일몰 타임, 위경도 좌표, 가시거리 명세표 구성
  - 시간대별 단기 예보 타임라인 칩 배치

- **시스템 피드백 통합**: 도시 검색 시 `ElNotification` 슬라이드 알림, 즐겨찾기 변경 시 `ElMessage` 토스트 메시지 출력

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **인포그래픽 스타일 상세 페이지 연동**: 단순 텍스트 목록 출력이던 상세 예보 화면을 히어로 카드, 프로그레스 바, 통계 위젯 형태의 다채로운 인포그래픽으로 재구성
- **전역 웹폰트(Pretendard) 및 Teleport 스타일 통일**: `ElMessage`, `ElNotification` 등 DOM 최상단에 포털(Teleport) 형태로 떠오르는 팝업까지 폰트 파손(굴림/바탕체) 없이 깔끔하게 반영되도록 `App.vue` 내 전역 `<style>`에 `!important` 폰트 바인딩 구조 설계

#### 4. 핵심 구현 스니펫 및 주요 소스 파일

- `src/main.js`
- `src/App.vue`
- `src/views/WeatherHomeView.vue`
- `src/views/WeatherDetailView.vue`

##### [src/main.js - Element Plus 및 아이콘 전역 설정 스니펫]

```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 전역 CSS 패키지
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 전체 아이콘 컴포넌트 전역 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus) // Vue 앱에 Element Plus 사용 등록
```

##### [src/App.vue - Teleport 알림 대응 전역 Pretendard 폰트 바인딩 스니펫]

```vue
<style>
/* 웹폰트(Pretendard) 불러오기 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');

/* 전역 폰트 및 Element Plus 메시지 팝업 폰트 강제 적용 */
* {
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    sans-serif !important;
}
</style>
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] Element Plus 컴포넌트 스타일 미적용 현상 (민낯 텍스트 노출)

- **문제 상황**: `<el-card>`, `<el-button>` 사용 시 테두리와 배경색이 적용되지 않고 단순 기본 텍스트 형태로 노출됨
- **원인 분석**: `main.js`에 Element Plus 전역 CSS 패키지(`import 'element-plus/dist/index.css'`)가 누락되어 컴포넌트 스타일시트가 주입되지 않음
- **해결 방법**: `main.js` 상단에 `index.css` 패키지 구문을 명시적으로 추가하고 개발 서버 재가동을 통해 세련된 UI 스타일 복원

##### [Troubleshooting 2] ElMessage / ElNotification 토스트 알림 시 폰트 깨짐 현상

- **문제 상황**: 토스트 메시지 팝업 출력 시 구식 명조/굴림 계열 폰트로 화면에 어색하게 노출됨
- **원인 분석**: Element Plus의 피드백 컴포넌트(`ElMessage`, `ElNotification`)는 `<div id="app">` 내부가 아닌 DOM 최상단 바디에 Teleport 되므로 컴포넌트 내부 스코프 스타일(`<style scoped>`)이 미치지 않음
- **해결 방법**: `App.vue` 하단에 unscoped `<style>` 블록을 작성하고 `* { font-family: ... !important; }` 수식어로 전역 강제 바인딩하여 팝업 폰트 통합

##### [Troubleshooting 3] Vite 템플릿 컴파일 에러 (`[plugin:vite-plugin-vue-inspector] Invalid end tag`)

- **문제 상황**: `WeatherDetailView.vue` 빌드 시 `Invalid end tag` 오류 오버레이가 발생하며 화면 전체 중단
- **원인 분석**: `<el-card>` 컴포넌트를 닫을 때 `</el-card>` 대신 `</card>`로 잘못 오타 작성하여 템플릿 파서 태그 불일치 발생
- **해결 방법**: 오타 태그를 `</el-card>`로 정정하여 Vite HMR 정상 작동 확인

---

### Hands-on 09: 코드 품질 관리 (ESLint & Prettier) 및 환경변수 분리

#### 1. 개요 및 목적

- ESLint 정적 분석 도구를 활용하여 구문 오류 및 코드 컨벤션 위반 사항을 사전 검출
- Prettier 포맷터를 연동하여 팀 공통의 시각적 코드 스타일 규격 자동화
- 개발(Development), 테스트(Staging), 운영(Production) 환경별 `.env` 환경변수를 격리하여 API Key 및 보안 설정 관리

#### 2. 주요 구현 내용

- **ESLint 커스텀 규칙 설정 (`eslint.config.js`)**:
  - `'eqeqeq': ['error', 'always']` 규칙을 적용하여 느슨한 비교(`==`) 금지 및 엄격한 비교(`===`) 강제
  - 개발 편의를 위한 `'no-console': 'off'` 및 미사용 변수 경고(`'no-unused-vars': 'warn'`) 설정

- **Prettier 일괄 포맷팅 (`.prettierrc.json`)**:
  - 세미콜론 제거(`semi: false`), 홑따옴표 사용(`singleQuote: true`), 2칸 들여쓰기 규격 준수
  - `npm run format` 스크립트를 통한 프로젝트 전체 소스코드 스타일 일괄 교체

- **환경변수 파일 분리 및 주입**:
  - `.env`, `.env.staging`, `.env.production` 파일 생성 및 `VITE_` 접두사 변수 정의
  - `package.json` 내 `build:staging` 및 `build:production` 빌드 명령어 스크립트 작성
  - `.gitignore` 파일에 `.env` 관련 파일들을 등록하여 GitHub API Key 유출 방지

#### 3. 핵심 설정 코드 스니펫

##### [eslint.config.js - Custom Rules 설정]

```javascript
export default defineConfig([
  // ... 기존 기본 설정
  {
    name: 'app/custom-rules',
    rules: {
      eqeqeq: ['error', 'always'], // 엄격한 비교 연산자(===) 강제
      'no-console': 'off', // console.log 허용
      'no-unused-vars': 'warn', // 미사용 변수 경고
      'vue/multi-word-component-names': 'off',
    },
  },
  skipFormatting,
])
```

##### [package.json - 환경별 빌드 스크립트 및 포맷팅 명령]

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:staging": "vite build --mode staging",
  "build:production": "vite build --mode production",
  "lint": "run-s lint:*",
  "format": "prettier --write src/"
}
```

#### 4. 트러블슈팅 및 검증 과정

##### [Troubleshooting 1] 느슨한 비교 연산자(`==`) 작성 시 ESLint 에러 검출

- **문제 상황**: 코드 내 `if (userAge == 20)` 작성 시 에디터 상에서 빨간 밑줄 오류 표시 및 `npm run lint` 실행 시 빌드 중단
- **원인 분석**: `eslint.config.js`에 설정한 `'eqeqeq': ['error', 'always']` 규칙 위반
- **해결 방법**: 엄격한 비교 연산자인 `if (userAge === 20)`으로 정정하여 정적 분석 검사 통과

##### [Troubleshooting 2] API Key 유출 위험 및 환경변수 격리

- **문제 상황**: GitHub 퍼블릭 저장소에 API Key가 하드코딩된 소스코드가 노출될 위험 존재
- **원인 분석**: `.env` 파일이 Git 추적 대상에 포함되어 저장소로 Push될 가능성
- **해결 방법**: `.gitignore` 하단에 `.env`, `.env.*` 구문을 추가하고 Vercel 대시보드 Environment Variables에 API Key를 별도 등록하여 보안 처리

---

### Hands-on 10: 과제 8 - Vite 프로덕션 빌드 및 최종 배포 (Weather Deployment)

#### 1. 개요 및 목적

- Vite 번들러(Rollup 엔진)를 기반으로 배포 전용 정적 자산(`dist/`)을 컴파일하고, 배포 전 소스코드 정적 검사 및 코드 스타일 자동 교체를 완료함
- OpenWeatherMap API의 도시명 영문 표기를 한글 매핑으로 개선하고, API Key 환경변수 보안 및 배포 파이프라인 구조를 검증함

#### 2. 주요 구현 내용

- **도시명 한글화 매핑**: OpenWeatherMap API에서 영문으로 반환되는 한국 도시명(`Seoul`, `Suwon-si`, `Jeju City` 등)을 사용자 친화적인 한글 이름(`서울`, `수원`, `제주` 등)으로 변환하는 매핑 함수(`cityNameMap`, `getKoreanCityName`) 구현
- **소스코드 품질 최적화**: `npm run lint` 수행을 통해 코드 내 미사용 변수 및 문법 경고를 완벽히 정제(`0 errors, 0 warnings` 통과)하고, `npm run format`으로 전역 코드 스타일을 자동 교체
- **보안 및 환경변수 격리**: API Key가 포함된 `.env`, `.env.staging`, `.env.production` 파일들을 `.gitignore`에 등록하여 GitHub 퍼블릭 저장소 유출을 차단하고 Vercel 대시보드 환경변수로 이관
- **Vite 프로덕션 빌드 및 번들링**: `npm run build` 스크립트를 실행하여 최적화된 정적 자산(`dist/` 폴더)을 컴파일하고, 브라우저 캐싱 방지를 위한 고유 해시(Hash) 파일명 생성 및 검증 완료

#### 3. 본인 차별점 (커스텀 구현 포인트)

- **사용자 친화적 한글 도시명 변환 사전 구축**: API 파라미터(`lang=kr`)로 해결되지 않는 도시명 영문 표기 한계를 해결하기 위해, `cityNameMap` 객체 및 예외 처리 함수를 추가하여 한글 대시보드 UI 완결성 확보
- **표준 CLI 옵션 보완 및 정밀 린트 통과**: `package.json` 내 Prettier CLI 옵션을 표준 규격(`--write src/`)으로 교체하고, `catch` 블록 미사용 변수(`err`) 정리를 통해 Lint 검사 100% 통과(0 errors, 0 warnings) 달성

#### 4. 핵심 검수 명령어 및 주요 소스 파일

- `package.json`
- `src/views/WeatherHomeView.vue`

##### [package.json - 린트/포맷터 및 환경별 빌드 스크립트 스니펫]

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:staging": "vite build --mode staging",
  "build:production": "vite build --mode production",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write src/"
}
```

##### [WeatherHomeView.vue - 한글 도시명 매핑 유틸 함수 스니펫]

```javascript
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
```

##### [품질 검수 및 배포 빌드 명령어]

```bash
# 1. ESLint 정적 분석 검사 (0 errors / 0 warnings 검증)
npm run lint

# 2. Prettier 전역 코드 스타일 정렬
npm run format

# 3. 최종 프로덕션 정적 배포 자산 생성
npm run build
```

#### 5. 트러블슈팅 및 해결 과정

##### [Troubleshooting 1] Prettier CLI 구형 옵션 사용으로 인한 오류 경고

- **문제 상황**: `npm run format` 실행 시 `[warn] Ignored unknown option --write-experimental-cli` 문구와 함께 CLI 도움말 메시지 출력됨
- **원인 분석**: `package.json` 스크립트에 최신 Prettier에서 지원 중단된 구형 실험적 CLI 옵션(`--write-experimental-cli`)이 지정되어 있었음
- **해결 방법**: `package.json` 내 `format` 스크립트 명령어 옵션을 표준인 `prettier --write src/`로 정정하여 전역 포맷팅 완벽 수행

##### [Troubleshooting 2] API 파라미터(lang=kr) 지정 시에도 도시명이 영문으로 반환되는 현상

- **문제 상황**: OpenWeatherMap API 호출 시 `lang=kr` 파라미터를 넘겨도 날씨 상태만 한글로 표기되고 도시 이름(`res.data.name`)은 `Suwon-si`, `Jeju City` 등 영문으로 표시되어 UI 일관성이 깨짐
- **원인 분석**: OpenWeatherMap API는 날씨 설명(`description`)만 국문 번역을 지원하며, 도시명(`name`) 식별자는 DB의 기본 영문 텍스트로 고정 반환함
- **해결 방법**: `cityNameMap` 사전을 정의하고 `getKoreanCityName()` 유틸 함수를 작성하여 API 수신 객체의 `name` 필드를 한글로 변환 출력

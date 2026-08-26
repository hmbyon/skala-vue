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

#### 4. 핵심 구현 스니펫

- **작성 소스 파일**: [`src/components/WeatherMockup.vue`](https://www.google.com/search?q=./src/components/WeatherMockup.vue)

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

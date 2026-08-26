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

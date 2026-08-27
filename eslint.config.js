import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // ⬇️ 과제 요구사항: ESLint 커스텀 규칙 추가
  {
    name: 'app/custom-rules',
    rules: {
      eqeqeq: ['error', 'always'], // 느슨한 비교(==) 금지, 엄격한 비교(===) 강제
      'no-console': 'off', // console.log 허용
      'no-unused-vars': 'warn', // 안 쓰는 변수는 경고
      'vue/multi-word-component-names': 'off', // 단일 단어 컴포넌트명 허용
    },
  },

  skipFormatting,
])

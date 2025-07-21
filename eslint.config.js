import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default [
  // 忽略的文件和目录
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'public/**',
      '.vercel/**',
      '.vscode/**',
      '*.d.ts'
    ]
  },
  
  // JavaScript 基础配置
  js.configs.recommended,
  
  // Vue 文件配置
  ...vue.configs['flat/recommended'],
  
  // TypeScript 和 Vue 文件的通用配置
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es2021: true
      }
    },
    plugins: {
      prettier
    },
    rules: {
      // Prettier 规则
      'prettier/prettier': 'error',
      
      // 通用规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      
      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off'
    }
  },
  
  // TypeScript 特定配置
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-undef': 'off' // TypeScript 已经处理了这个问题
    }
  },
  
  // Vue 文件特定配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    }
  },
  
  // Prettier 配置（必须放在最后）
  prettierConfig
];
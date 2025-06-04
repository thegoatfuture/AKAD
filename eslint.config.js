import vue from 'eslint-plugin-vue';
import parser from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    plugins: { vue },
    rules: {},
    processor: vue.processors['.vue']
  }
];

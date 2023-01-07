module.exports = {
  extends: ['../.eslintrc.js', 'plugin:vue/vue3-essential'],
  // 这里parser设置为vue，parserOption里放@typescript-eslint/parser
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    'no-bitwise': 'off',
    'no-multi-assign': 'off',
    'no-plusplus': 'off'
  }
}

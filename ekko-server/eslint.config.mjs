import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
      ignores: ['**/node_modules', '**/dist', '**/output']
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginPrettierRecommended],
    files: ['**/*.{js,ts,tsx}', 'main.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser
    },
    rules: {
    }
  }
)

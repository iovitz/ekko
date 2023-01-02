module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'no-dupe-class-members': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-shadow': 'off',
    'func-names': 'off',
    'no-param-reassign': 'off'
  }
}

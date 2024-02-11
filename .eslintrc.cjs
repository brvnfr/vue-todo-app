/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  rules: {
    //~~ Impede o uso de console.log e debugger em produção.
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //~~ Adverte sobre componentes e variáveis não utilizados em arquivos Vue.
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',
    //~~ Garante que as diretrizes v-slot sejam usadas corretamente.
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    //~~ Evita o uso simultâneo de v-if e v-for no mesmo elemento.
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: false,
      },
      //~  componentes importados com elemento HTML em kebab-case
    ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    //~~ Remove ';', usa aspas simples nas strings e adiciona ',' em arrays e objetos.
    'prettier/prettier': ['error', { semi: false, singleQuote: true, trailingComma: 'all' }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}

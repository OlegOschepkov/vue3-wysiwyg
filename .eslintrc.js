module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}

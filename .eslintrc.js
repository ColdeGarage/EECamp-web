module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: [
          'default',
          'error',
          'index',
          'info',
          'signup',
          'faq',
          'contact',
          'login'
        ]
      }
    ]
  }
};

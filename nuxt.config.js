import { vuetifyConfig } from './vuetify.config';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '清大電機營',
    htmlAttrs: {
      lang: 'zh-tw'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    baseUrl:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:7002'
        : // TODO: change to real api url
          'https://eecampapi.nthuee.org'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/utils.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vuex-persistedstate', ssr: true },
    '@/plugins/vue-youtube.js',
    '@/api/index.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    // https://www.npmjs.com/package/cookie-universal-nuxt
    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    ...vuetifyConfig
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};

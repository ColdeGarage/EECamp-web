// https://www.npmjs.com/package/vue-youtube

import Vue from 'vue';
import VueYoutube, { getIdFromUrl } from 'vue-youtube';

Vue.use(VueYoutube);

export default function (ctx, inject) {
  inject('getIdFromUrl', getIdFromUrl);
}

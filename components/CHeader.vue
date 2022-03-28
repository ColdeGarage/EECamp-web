<template>
  <v-app-bar app color="secondary900" flat hide-on-scroll height="64">
    <v-btn to="/" color="secondary900" text :ripple="false">
      <v-img :src="require(`../assets/image/LogoBlack.png`)" width="200" />
    </v-btn>
    <v-spacer />
    <v-btn
      v-for="link in links"
      :key="link.name"
      :to="link.url"
      text
      class="d-none d-md-flex align-center text-Global16 ml-1"
    >
      {{ link.name }}
    </v-btn>
    <div class="d-flex d-md-none">
      <v-btn text color="transparent" @click.stop="setOpen(true)">
        <v-icon x-large color="secondary">mdi-menu</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      links: [
        {
          name: '關於營隊',
          url: '/info'
        },
        {
          name: '報名 & 錄取名單',
          url: '/signup'
        },
        {
          name: '常見問題',
          url: '/faq'
        },
        {
          name: '聯絡我們',
          url: '/contact'
        },
        {
          name: '支持我們',
          url: '/supportUs'
        },
        {
          name: '登入系統',
          url: '/login'
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setOpen: 'Layout/SetIsDrawerOpen'
    })
  }
};
</script>

<style></style>

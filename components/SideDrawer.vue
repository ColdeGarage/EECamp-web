<template>
  <v-navigation-drawer
    :permanent="isDrawerOpen"
    :value="isDrawerOpen"
    temporary
    app
    right
    clipped
    width="100%"
  >
    <v-card tile height="100%" color="secondary600">
      <div class="d-flex align-center justify-end pt-3 px-3">
        <v-btn
          to="/"
          text
          color="transparent"
          height="auto"
          class="pl-4 pt-md-0 pt-2"
          @click.stop="setOpen(false)"
        >
          <v-img :src="require(`@/assets/image/LogoWhite.png`)" width="200" />
          <SizeBox :width="5" class="hidden-md-and-up" />
          <SizeBox :width="10" class="hidden-sm-and-down" />
        </v-btn>
        <v-spacer />
        <v-btn text color="transparent" @click.stop="setOpen(false)">
          <v-icon x-large color="secondary900">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider inset class="my-4 secondary900 mx-auto" />
      <v-list color="transparent" width="75%" class="mx-auto">
        <div v-for="(link, index) in links" :key="link.url">
          <v-list-item
            :to="link.url"
            color="transparent"
            class="text-Global16 pa-0"
            @click.stop="setOpen(false)"
          >
            <span class="secondary900--text">{{ link.name }}</span>
          </v-list-item>
          <v-divider
            v-show="index !== links.length - 1"
            class="my-2 secondary900 mx-auto"
          />
        </div>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
          name: '登入系統',
          url: '/login'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      isDrawerOpen: 'Layout/GetIsDrawerOpen'
    })
  },
  watch: {
    '$vuetify.breakpoint.mdAndUp': {
      handler(v) {
        v && this.$store.commit('Layout/SetIsDrawerOpen', false);
      }
    }
  },
  methods: {
    ...mapMutations({
      setOpen: 'Layout/SetIsDrawerOpen'
    })
  }
};
</script>

<style lang="scss" scoped>
//
</style>

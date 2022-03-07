<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-alert
      text
      width="100%"
      max-width="1400"
      :color="alertData.color"
      class="pa-4 my-4 d-flex justify-center text-Heading20"
    >
      {{ alertData.text }}
    </v-alert>
    <PanelEditForm :form="user" :editable="true"/>
    <div
      v-if="user.status === 'Paid' || user.status === 'Unpaid'"
      class="fill-width"
    >
      <SizeBox height="20" />
      <PanelPaidInfo :form="user" />
    </div>
    <div
      v-if="user.status === 'Paid' || user.status === 'Unpaid'"
      class="fill-width"
    >
      <SizeBox height="20" />
      <PanelTransMethod :form="user" />
    </div>
    <SizeBox height="20" />
    <PanelDangerZone :status="user.status" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  async middleware({ redirect, app }) {
    try {
      const result = await app.$api.user.getCurrentUser();
      if (result.isAdmin !== false) redirect('/login');
    } catch (error) {
      redirect('/login');
    }
  },
  data: () => ({
    user: {}
  }),
  computed: {
    ...mapGetters({ signupInfo: 'Web/GetSignupInfo' }),
    alertData() {
      const { status, alternateNum } = this.user;
      if (this.signupInfo.RegisterStatus === 'register')
        return {
          color: 'info',
          text: '報名尚未截止！'
        };
      else if (status === 'NotChosen') {
        return {
          color: 'gray',
          text: '未錄取'
        };
      } else if (status === 'Alternate') {
        return {
          color: 'info',
          text: `備取 #${alternateNum}`
        };
      } else if (status === 'Paid') {
        return {
          color: 'success',
          text: '已錄取，已繳費'
        };
      } else if (status === 'Unpaid') {
        return {
          color: 'success',
          text: '已錄取，未繳費'
        };
      } else if (status === 'GaveUp') {
        return {
          color: 'gray',
          text: '已放棄'
        };
      } else {
        return {};
      }
    }
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const res = await this.$api.user.getCurrentUser();

      const localISOTime = new Date(new Date(res.birthday) - tzoffset)
        .toISOString()
        .slice(0, 10);
      res.birthday = localISOTime;

      this.user = res;
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>

<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-card width="50%" outlined>
      <v-card-title class="text-Heading30 d-flex justify-center">
        無法報名！
      </v-card-title>
      <v-divider class="mx-4" />
      <v-card-text class="text-Heading20 text-center">
        目前非報名時間
        <br />
        已報名者請直接
        <nuxt-link to="/login" class="text-decoration-none">登入系統</nuxt-link>
        !
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  async middleware({ redirect, store }) {
    const { RegisterStatus } = store.getters['Web/GetSignupInfo'];
    if (RegisterStatus === 'register') redirect('/register');
  }
  //
};
</script>

<style lang="scss" scoped>
//
</style>

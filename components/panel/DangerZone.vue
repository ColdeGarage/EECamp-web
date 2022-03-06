<template>
  <v-card
    class="pa-5 d-flex justify-space-around"
    color="error"
    width="100%"
    max-width="1400"
  >
    <v-btn
      large
      @click="dialogGiveUp = true"
      v-if="status === 'Unpaid' || status === 'Paid'"
    >
      放棄資格
    </v-btn>
    <v-btn large @click="logout">登出</v-btn>
    <v-dialog v-model="dialogGiveUp" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">確定放棄資格嗎？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogGiveUp = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="giveUp">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    status: String
  },
  data: () => ({
    dialogGiveUp: false
  }),
  methods: {
    ...mapActions({ Logout: 'User/logout' }),
    async giveUp() {
      try {
        await this.$api.user.modifyCurrentUser({
          status: 'GaveUp'
        });
        this.dialogGiveUp = false;
        this.$router.go();
      } catch (error) {
        console.error(error);
        this.alert = true;
        this.alertMessage =
          '更新失敗，請再次確認資料。如你認為結果有誤，請洽主辦單位。';
        return;
      }
    },
    async logout() {
      this.Logout();
      this.$router.push('/login');
    }
  }
  //
};
</script>

<style lang="scss" scoped>
//
</style>

<template>
  <v-card class="pa-5 d-flex justify-space-around" color="error">
    <v-btn large @click="dialogDelete = true">刪除學員資料</v-btn>
    <v-btn large @click="logout">登出</v-btn>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">確定要刪除全部學員資料嗎？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteAllMember">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    dialogDelete: false
  }),
  methods: {
    ...mapActions({ Logout: 'User/logout' }),
    async deleteAllMember() {
      try {
        await this.$api.user.removeUsers();
        this.dialogDelete = false;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      this.Logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>

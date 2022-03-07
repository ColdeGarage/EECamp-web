<template>
  <div class="fill-height d-flex align-center justify-center">
    <v-card width="750" class="pa-8 mx-5">
      <v-card-title class="d-flex justify-center text-Heading30">
        登入系統
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="form.email"
          label="Email"
          :rules="noEmpty"
        ></v-text-field>
        <v-text-field
          v-model="form.personalID"
          type="password"
          label="身分證字號"
          :rules="noEmpty"
        ></v-text-field>
      </v-form>
      <v-btn
        class="mr-4"
        color="primary"
        :disabled="!valid"
        @click="handleLogin"
      >
        submit
      </v-btn>
      <v-snackbar v-model="snackbar">
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  async middleware({ redirect, app }) {
    try {
      const result = await app.$api.user.getCurrentUser();
      if (result.isAdmin === true) redirect('/admin');
      else if (result.isAdmin === false) redirect('/panel');
    } catch (error) {}
  },
  data: () => ({
    valid: false,
    form: {
      email: '',
      personalID: ''
    },
    errorMessage: '',
    snackbar: false,
    noEmpty: [(v) => !!v || '請勿空白！']
  }),
  methods: {
    ...mapActions({ Login: 'User/login' }),
    async handleLogin() {
      try {
        this.snackbar = false;
        await this.$refs.form.validate();
        const result = await this.Login({
          email: this.form.email,
          personalID: this.form.personalID
        });
        if (result.isAdmin === false) this.$router.push('/panel');
        else this.$router.push('/admin');
      } catch (error) {
        this.errorMessage = '資料錯誤';
        this.snackbar = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>

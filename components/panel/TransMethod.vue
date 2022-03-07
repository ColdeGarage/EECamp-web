<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card width="100%" max-width="1400" class="pa-10 ma-0" elevation="7">
    <div class="text-Heading30">登記交通方式</div>
    <div>
      請參考
      <nuxt-link to="/info" class="text-decoration-none">關於營隊</nuxt-link>
      來選擇較適合的交通方式。
    </div>
    <SizeBox height="10" />
    <v-form :model="form" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.comeMethod"
            :rules="rules.noEmpty"
            label="來程方式"
            placeholder="火車 / 高鐵 / 客運 / 家長接送"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.comeTime"
            :rules="rules.noEmpty"
            label="來程到站時間"
            placeholder="10:00 - 12:00 為報到時間"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.leaveMethod"
            :rules="rules.noEmpty"
            label="回程方式"
            placeholder="火車 / 高鐵 / 客運 / 家長接送"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.leaveTime"
            :rules="rules.noEmpty"
            label="回程上車時間"
            placeholder="火車 ＆ 高鐵建議16:30以後，客運建議16:00之後！"
            required
          />
        </v-col>
      </v-row>
    </v-form>
    <v-alert dense outlined type="warning" v-if="alert">
      {{ alertMessage }}
    </v-alert>
    <v-alert dense outlined type="success" v-if="success">
      {{ new Date().toLocaleString('en-US') }} 更新成功
    </v-alert>
    <div class="d-flex justify-center">
      <v-btn @click="handleSubmit" color="primary" large>更新資料</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  data: () => ({
    file: null,
    rules: {
      noEmpty: [(v) => !!v || '請勿留白']
    },
    alert: false,
    alertMessage: '',
    success: false
  }),
  methods: {
    async handleSubmit() {
      this.alert = false;
      this.success = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.form.validate();
      if (validateResult) {
        try {
          const { comeMethod, comeTime, leaveMethod, leaveTime } = this.form;
          await this.$api.user.modifyCurrentUser({
            comeMethod,
            comeTime,
            leaveMethod,
            leaveTime
          });
        } catch (error) {
          console.error(error);
          this.alert = true;
          this.alertMessage =
            '更新失敗，請再次確認資料。如你認為結果有誤，請洽主辦單位。';
          return;
        }
        this.success = true;
      } else {
        this.alert = true;
        this.alertMessage = '表格資料有誤';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>

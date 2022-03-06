<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card width="100%" max-width="1400" class="pa-10 ma-0" elevation="7">
    <div class="text-Heading30">交通方式</div>
    <SizeBox height="10" />
    <v-form :model="form" ref="form" readonly>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.comeMethod" label="來程方式" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.comeTime" label="來程到站時間" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.leaveMethod" label="回程方式" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.leaveTime" label="回程上車時間" />
        </v-col>
      </v-row>
    </v-form>
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

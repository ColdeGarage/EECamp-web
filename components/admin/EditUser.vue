<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card width="100%" max-width="1400" class="pa-10 ma-0" elevation="7">
    <v-form class="d-flex" ref="form">
      <v-select v-model="form.status" :items="status" label="狀態" required />
      <v-text-field
        :disabled="form.status !== 'Alternate'"
        class="ml-4"
        v-model="form.alternateNum"
        label="備取順位"
        placeholder="1"
        required
      />
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
    },
    userId: String
  },
  data: () => ({
    rules: {
      noEmpty: [(v) => !!v || '請勿留白']
    },
    alert: false,
    alertMessage: '',
    success: false,
    status: [
      { text: '未入選', value: 'NotChosen' },
      { text: '備取', value: 'Alternate' },
      { text: '已繳費（正取）', value: 'Paid' },
      { text: '未繳費（正取）', value: 'Unpaid' },
      { text: '棄權', value: 'GaveUp' }
    ]
  }),
  methods: {
    async handleSubmit() {
      this.alert = false;
      this.success = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.form.validate();
      if (validateResult) {
        try {
          const { status, alternateNum } = this.form;
          console.log(alternateNum);
          await this.$api.user.modifyUser({
            _id: this.userId,
            status,
            alternateNum
          });
        } catch (error) {
          console.error(error);
          this.alert = true;
          this.alertMessage = '更新失敗，QQ';
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

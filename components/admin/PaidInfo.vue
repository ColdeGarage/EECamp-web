<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card width="100%" max-width="1400" class="pa-10 ma-0" elevation="7">
    <div class="text-Heading30">繳費資料 ＆ 家長同意書</div>
    <SizeBox height="10" />
    <v-form :model="form" ref="form" readonly>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidTime"
            label="繳費時間"
            placeholder="2022-3-6"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="form.paidAmount" label="金額" required />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidMethod"
            label="匯款方式"
            placeholder="臨櫃轉帳 / ATM 轉帳"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidAccount"
            label="帳號末五碼"
            placeholder="04361"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidName"
            label="匯款人姓名"
            placeholder="XXX"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidNote"
            label="備註"
            placeholder="備註"
            required
          />
        </v-col>
        <v-col cols="12" class="d-flex align-center justify-center">
          <v-btn width="100%" @click="filePath">家長同意書</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <SizeBox height="20" />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    form: {
      type: Object
    }
  },
  data: () => ({
    file: null,
    alert: false,
    alertMessage: '',
    success: false
  }),
  computed: {
    ...mapGetters({ signupInfo: 'Web/GetSignupInfo' }),
    baseUrl: () => process.env.baseUrl
  },
  filters: {},
  methods: {
    filePath() {
      if (this.form.consentPath === '')
        window.open(`${this.baseUrl}${this.signupInfo.consent}`, '_blank');
      else window.open(`${this.baseUrl}${this.form.consentPath}`, '_blank');
    },
    async handleSubmit() {
      this.alert = false;
      this.success = false;
      this.alertMessage = '';
      const validateResult = await this.$refs.form.validate();
      if (validateResult) {
        if (!!this.file) {
          try {
            const fileUrl = await this.$api.file.save(this.file, {
              'Content-Type': this.file.type,
              fileName: encodeURIComponent(this.file.name)
            });
            // eslint-disable-next-line vue/no-mutating-props
            this.form.consentPath = fileUrl.filePath;
          } catch (err) {
            this.alert = true;
            this.alertMessage = '檔案上傳失敗';
            return;
          }
        }
        try {
          const {
            paidTime,
            paidAmount,
            paidMethod,
            paidAccount,
            paidName,
            paidNote,
            consentPath
          } = this.form;
          await this.$api.user.modifyCurrentUser({
            paidTime,
            paidAmount,
            paidMethod,
            paidAccount,
            paidName,
            paidNote,
            consentPath
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

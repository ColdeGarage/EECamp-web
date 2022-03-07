<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-card width="100%" max-width="1400" class="pa-10 ma-0" elevation="7">
    <div class="text-Heading30">繳費資料 ＆ 家長同意書</div>
    <SizeBox height="10" />
    <v-form :model="form" ref="form">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidTime"
            :rules="rules.noEmpty"
            label="繳費時間"
            placeholder="2022-3-6"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidAmount"
            :rules="rules.noEmpty"
            label="金額"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidMethod"
            :rules="rules.noEmpty"
            label="匯款方式"
            placeholder="臨櫃轉帳 / ATM 轉帳"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidAccount"
            :rules="rules.noEmpty"
            label="帳號末五碼"
            placeholder="04361"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidName"
            :rules="rules.noEmpty"
            label="匯款人姓名"
            placeholder="XXX"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.paidNote"
            :rules="rules.noEmpty"
            label="備註"
            placeholder="備註"
            required
          />
        </v-col>
        <v-col cols="12" class="d-flex align-center justify-center">
          <v-btn class="mr-4" @click="filePath">檔案</v-btn>
          <v-file-input
            v-model="file"
            :rules="rules.file"
            label="家長同意書（請勿超過 5 MB）"
            show-size
          ></v-file-input>
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
import { mapGetters } from 'vuex';
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
